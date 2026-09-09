import { Link } from "react-router-dom";
import { Container } from "./Container";

const COLUMNS = [
	{
		title: "Produit",
		links: [
			{ to: "/prompts", label: "Catalogue" },
			{ to: "/dashboard/prompts/new", label: "Vendre un prompt" },
			{ to: "/dashboard", label: "Tableau de bord" },
		],
	},
	{
		title: "Compte",
		links: [
			{ to: "/login", label: "Connexion" },
			{ to: "/register", label: "Inscription" },
			{ to: "/forgot-password", label: "Mot de passe oublié" },
		],
	},
];

export function Footer() {
	return (
		<footer className="mt-auto border-t border-base-content/10 bg-base-200/40">
			<Container size="wide" className="grid gap-8 py-12 sm:grid-cols-3">
				<div>
					<span className="text-lg font-bold tracking-tight">
						<span className="text-primary">Prompt</span>Verse
					</span>
					<p className="mt-3 max-w-xs text-sm text-base-content/55">
						La marketplace des prompts IA testés et prêts à
						l'emploi. Achetez, vendez, gagnez du temps.
					</p>
				</div>
				{COLUMNS.map((col) => (
					<div key={col.title}>
						<h4 className="text-xs font-semibold uppercase tracking-wide text-base-content/70">
							{col.title}
						</h4>
						<ul className="mt-3 space-y-2 text-sm">
							{col.links.map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										className="text-base-content/55 transition-colors hover:text-base-content"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</Container>
			<div className="border-t border-base-content/10">
				<Container
					size="wide"
					className="flex flex-col gap-1 py-5 text-xs text-base-content/45 sm:flex-row sm:justify-between"
				>
					<span>
						© {new Date().getFullYear()} PromptVerse. Tous droits
						réservés.
					</span>
					<span>Projet CDA — démonstration.</span>
				</Container>
			</div>
		</footer>
	);
}
