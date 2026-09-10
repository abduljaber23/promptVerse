import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResetPassword, useValidateResetLink } from "@/hooks/useAuthFlows";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { toast } from "@/common/store/toast.store";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";

const schema = z
	.object({
		newPassword: z.string().min(6, "6 caractères minimum."),
		confirmPassword: z.string().min(1, "Confirmez le mot de passe."),
	})
	.refine((d) => d.newPassword === d.confirmPassword, {
		path: ["confirmPassword"],
		message: "Les mots de passe ne correspondent pas.",
	});
type FormValues = z.infer<typeof schema>;

export function ResetPasswordPage() {
	const { id, token } = useParams<{ id: string; token: string }>();
	const linkCheck = useValidateResetLink(id, token);
	const resetPassword = useResetPassword();
	const [done, setDone] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({ resolver: zodResolver(schema) });

	const onSubmit = handleSubmit(async (values) => {
		try {
			await resetPassword.mutateAsync({
				userId: id as string,
				resetPasswordToken: token as string,
				newPassword: values.newPassword,
			});
			setDone(true);
		} catch (err) {
			toast.error(getApiErrorMessage(err));
		}
	});

	return (
		<AuthLayout
			title="Nouveau mot de passe"
			footer={
				<Link to="/login" className="font-semibold text-primary">
					Retour à la connexion
				</Link>
			}
		>
			{linkCheck.isLoading ? (
				<div className="flex justify-center py-6">
					<Spinner />
				</div>
			) : linkCheck.isError ? (
				<Alert variant="error">
					{getApiErrorMessage(
						linkCheck.error,
						"Ce lien de réinitialisation n'est plus valide.",
					)}
				</Alert>
			) : done ? (
				<Alert variant="success">
					Mot de passe réinitialisé. Vous pouvez maintenant vous
					connecter.
				</Alert>
			) : (
				<form onSubmit={onSubmit} className="space-y-4" noValidate>
					<FormField
						label="Nouveau mot de passe"
						htmlFor="newPassword"
						required
						error={errors.newPassword?.message}
					>
						<input
							id="newPassword"
							type="password"
							className="input w-full bg-base-100"
							autoComplete="new-password"
							{...register("newPassword")}
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
							autoComplete="new-password"
							{...register("confirmPassword")}
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
						Réinitialiser
					</button>
				</form>
			)}
		</AuthLayout>
	);
}
