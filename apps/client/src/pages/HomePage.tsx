import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePromptList } from "@/hooks/usePrompts";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/home/Hero";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { AiToolStrip } from "@/components/home/AiToolStrip";
import { PromptGrid } from "@/components/prompt/PromptGrid";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function HomePage() {
	useDocumentTitle("PromptVerse — Marketplace de prompts IA");
	const { data, isLoading } = usePromptList(1, 8);

	return (
		<>
			<Hero />

			<Container className="space-y-16 py-16">
				<section className="space-y-5">
					<div className="flex items-baseline justify-between">
						<h2 className="text-xl font-bold">
							Explorer par catégorie
						</h2>
						<Link
							to="/prompts"
							className="text-sm font-medium text-primary hover:underline"
						>
							Tout le catalogue
						</Link>
					</div>
					<CategoryStrip />
				</section>

				<section className="space-y-5">
					<h2 className="text-xl font-bold">Filtrer par outil IA</h2>
					<AiToolStrip />
				</section>

				<section className="space-y-6">
					<div className="flex items-baseline justify-between">
						<h2 className="text-xl font-bold">Prompts récents</h2>
						<Link
							to="/prompts"
							className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
						>
							Voir tout <ArrowRight className="size-4" />
						</Link>
					</div>
					<PromptGrid prompts={data} isLoading={isLoading} skeletonCount={8} />
				</section>
			</Container>
		</>
	);
}
