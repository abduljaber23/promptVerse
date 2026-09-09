import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
	useDocumentTitle("Page introuvable — PromptVerse");
	return (
		<Container size="narrow" className="flex flex-col items-center py-24 text-center">
			<p className="text-6xl font-extrabold text-primary">404</p>
			<h1 className="mt-4 text-2xl font-bold">Page introuvable</h1>
			<p className="mt-2 text-base-content/60">
				La page que vous cherchez n'existe pas ou a été déplacée.
			</p>
			<Link to="/" className="btn btn-primary mt-6">
				Retour à l'accueil
			</Link>
		</Container>
	);
}
