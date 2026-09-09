import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/ui/Spinner";

/** Route réservée aux utilisateurs connectés. Redirige vers /login sinon. */
export function ProtectedRoute() {
	const { status } = useAuth();
	const location = useLocation();

	if (status === "pending") {
		return <PageLoader label="Vérification de la session…" />;
	}

	if (status === "unauthenticated") {
		return (
			<Navigate
				to="/login"
				replace
				state={{ from: location.pathname + location.search }}
			/>
		);
	}

	return <Outlet />;
}
