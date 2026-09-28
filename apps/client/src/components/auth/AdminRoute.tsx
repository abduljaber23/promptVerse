import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/ui/Spinner";
import { Container } from "@/components/layout/Container";
import { Alert } from "@/components/ui/Alert";

/** Route réservée aux rôles ADMIN / SUPER_ADMIN. */
export function AdminRoute() {
	const { status, isAdmin, adminChecked } = useAuth();

	if (status === "pending" || (status === "authenticated" && !adminChecked)) {
		return <PageLoader label="Vérification des droits…" />;
	}

	if (status === "unauthenticated") {
		return <Navigate to="/login" replace />;
	}

	if (!isAdmin) {
		return (
			<Container size="narrow" className="py-16">
				<Alert variant="error">
					Accès refusé : cette section est réservée à
					l'administration.
				</Alert>
			</Container>
		);
	}

	return <Outlet />;
}
