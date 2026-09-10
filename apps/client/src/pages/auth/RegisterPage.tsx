import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { toast } from "@/common/store/toast.store";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";

const schema = z
	.object({
		username: z
			.string()
			.min(3, "3 caractères minimum.")
			.max(50, "50 caractères maximum."),
		email: z.string().min(1, "L'e-mail est requis.").email("E-mail invalide."),
		password: z.string().min(6, "6 caractères minimum."),
		confirmPassword: z.string().min(1, "Confirmez le mot de passe."),
		terms: z
			.boolean()
			.refine((v) => v === true, "Vous devez accepter les conditions."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Les mots de passe ne correspondent pas.",
	});
type FormValues = z.infer<typeof schema>;

export function RegisterPage() {
	const { register: registerUser } = useAuth();
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({ resolver: zodResolver(schema) });

	const onSubmit = handleSubmit(async (values) => {
		try {
			const res = await registerUser({
				username: values.username,
				email: values.email,
				password: values.password,
			});
			setSuccessMessage(res.message);
		} catch (error) {
			toast.error(getApiErrorMessage(error));
		}
	});

	return (
		<AuthLayout
			title="Rejoindre la communauté"
			subtitle="Créez votre compte pour acheter et vendre des prompts IA."
			footer={
				<>
					Déjà un compte ?{" "}
					<Link to="/login" className="font-semibold text-primary">
						Se connecter
					</Link>
				</>
			}
		>
			{successMessage ? (
				<Alert variant="success">{successMessage}</Alert>
			) : (
				<form onSubmit={onSubmit} className="space-y-4" noValidate>
					<FormField
						label="Nom d'utilisateur"
						htmlFor="username"
						required
						error={errors.username?.message}
					>
						<input
							id="username"
							className="input w-full bg-base-100"
							placeholder="ex : alex_creator"
							autoComplete="username"
							{...register("username")}
						/>
					</FormField>

					<FormField
						label="Adresse e-mail"
						htmlFor="email"
						required
						error={errors.email?.message}
					>
						<input
							id="email"
							type="email"
							className="input w-full bg-base-100"
							placeholder="vous@exemple.com"
							autoComplete="email"
							{...register("email")}
						/>
					</FormField>

					<FormField
						label="Mot de passe"
						htmlFor="password"
						required
						error={errors.password?.message}
					>
						<input
							id="password"
							type="password"
							className="input w-full bg-base-100"
							placeholder="6 caractères minimum"
							autoComplete="new-password"
							{...register("password")}
						/>
					</FormField>

					<FormField
						label="Confirmer le mot de passe"
						htmlFor="confirmPassword"
						required
						error={errors.confirmPassword?.message}
					>
						<input
							id="confirmPassword"
							type="password"
							className="input w-full bg-base-100"
							placeholder="••••••••"
							autoComplete="new-password"
							{...register("confirmPassword")}
						/>
					</FormField>

					<label className="flex items-start gap-3 text-xs text-base-content/60">
						<input
							type="checkbox"
							className="checkbox checkbox-sm mt-0.5"
							{...register("terms")}
						/>
						<span>
							J'accepte les{" "}
							<span className="text-primary">
								conditions d'utilisation
							</span>{" "}
							et la{" "}
							<span className="text-primary">
								politique de confidentialité
							</span>
							.
							{errors.terms ? (
								<span className="block text-error">
									{errors.terms.message}
								</span>
							) : null}
						</span>
					</label>

					<button
						type="submit"
						className="btn btn-primary w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<span className="loading loading-spinner loading-sm" />
						) : null}
						Créer mon compte
					</button>
				</form>
			)}
		</AuthLayout>
	);
}
