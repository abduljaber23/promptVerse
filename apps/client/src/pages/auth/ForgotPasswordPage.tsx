import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForgotPassword } from "@/hooks/useAuthFlows";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";

const schema = z.object({
	email: z.string().min(1, "L'e-mail est requis.").email("E-mail invalide."),
});
type FormValues = z.infer<typeof schema>;

export function ForgotPasswordPage() {
	const forgotPassword = useForgotPassword();
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({ resolver: zodResolver(schema) });

	const onSubmit = handleSubmit(async (values) => {
		setError(null);
		try {
			const res = await forgotPassword.mutateAsync(values.email);
			setMessage(res.message);
		} catch (err) {
			setError(getApiErrorMessage(err));
		}
	});

	return (
		<AuthLayout
			title="Mot de passe oublié"
			subtitle="Saisissez votre e-mail : nous vous enverrons un lien de réinitialisation."
			footer={
				<Link to="/login" className="font-semibold text-primary">
					Retour à la connexion
				</Link>
			}
		>
			{message ? (
				<Alert variant="success">{message}</Alert>
			) : (
				<form onSubmit={onSubmit} className="space-y-4" noValidate>
					{error ? <Alert variant="error">{error}</Alert> : null}
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
					<button
						type="submit"
						className="btn btn-primary w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<span className="loading loading-spinner loading-sm" />
						) : null}
						Envoyer le lien
					</button>
				</form>
			)}
		</AuthLayout>
	);
}
