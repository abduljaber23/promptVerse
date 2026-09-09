import { Link, useParams } from "react-router-dom";
import { useVerifyEmail } from "@/hooks/useAuthFlows";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";

export function VerifyEmailPage() {
	const { id, token } = useParams<{ id: string; token: string }>();
	const { isLoading, isError, error, data } = useVerifyEmail(id, token);

	return (
		<AuthLayout
			title="Vérification de l'e-mail"
			footer={
				<Link to="/login" className="font-semibold text-primary">
					Aller à la connexion
				</Link>
			}
		>
			{isLoading ? (
				<div className="flex justify-center py-6">
					<Spinner />
				</div>
			) : isError ? (
				<Alert variant="error">
					{getApiErrorMessage(
						error,
						"La vérification a échoué. Le lien est peut-être expiré.",
					)}
				</Alert>
			) : (
				<Alert variant="success">
					{data?.message ?? "Votre adresse e-mail a été vérifiée."}
				</Alert>
			)}
		</AuthLayout>
	);
}
