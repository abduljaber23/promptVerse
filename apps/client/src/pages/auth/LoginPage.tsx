import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { toast } from "@/common/store/toast.store";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/ui/FormField";

const schema = z.object({
	email: z.string().min(1, "L'e-mail est requis.").email("E-mail invalide."),
	password: z.string().min(1, "Le mot de passe est requis."),
});
type FormValues = z.infer<typeof schema>;

interface LocationState {
	from?: string;
}

export function LoginPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({ resolver: zodResolver(schema) });

	const onSubmit = handleSubmit(async (values) => {
		try {
			await login(values);
			const to = (location.state as LocationState | null)?.from ?? "/dashboard";
			navigate(to, { replace: true });
		} catch (error) {
			toast.error(getApiErrorMessage(error));
		}
	});

	return (
		<AuthLayout
			title="Connexion"
			subtitle="Connectez-vous pour retrouver vos achats et vos prompts en vente."
			footer={
				<>
					Pas encore de compte ?{" "}
					<Link to="/register" className="font-semibold text-primary">
						Créer un compte
					</Link>
				</>
			}
		>
			<form onSubmit={onSubmit} className="space-y-4" noValidate>
				<FormField
					label="Adresse e-mail"
					htmlFor="email"
					required
					error={errors.email?.message}
				>
					<input
						id="email"
						type="email"
						autoComplete="email"
						className="input w-full bg-base-100"
						placeholder="vous@exemple.com"
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
						autoComplete="current-password"
						className="input w-full bg-base-100"
						placeholder="••••••••"
						{...register("password")}
					/>
				</FormField>

				<div className="text-right">
					<Link
						to="/forgot-password"
						className="text-sm text-primary hover:underline"
					>
						Mot de passe oublié ?
					</Link>
				</div>

				<button
					type="submit"
					className="btn btn-primary w-full"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<span className="loading loading-spinner loading-sm" />
					) : null}
					Se connecter
				</button>
			</form>
		</AuthLayout>
	);
}
