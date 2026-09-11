import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/ui/Spinner";

/** Route réservée aux visiteurs non connectés (login, register…). Redirige vers /dashboard sinon. */
export function GuestRoute() {
	const { status } = useAuth();

	if (status === "pending") {
		return <PageLoader label="Vérification de la session…" />;
	}

	if (status === "authenticated") {
		return <Navigate to="/dashboard" replace />;
	}

	return <Outlet />;
}
