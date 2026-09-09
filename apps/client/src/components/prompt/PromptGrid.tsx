import { FileSearch } from "lucide-react";
import type { Prompt } from "@/common/types";
import { useCatalogMaps } from "@/hooks/useCatalog";
import { PromptCard } from "./PromptCard";
import { PromptGridSkeleton } from "./PromptCardSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";

interface PromptGridProps {
	prompts: Prompt[] | undefined;
	isLoading?: boolean;
	skeletonCount?: number;
	emptyTitle?: string;
	emptyDescription?: string;
}

export function PromptGrid({
	prompts,
	isLoading,
	skeletonCount = 8,
	emptyTitle = "Aucun prompt pour l'instant",
	emptyDescription = "Revenez bientôt : de nouveaux prompts sont publiés régulièrement.",
}: PromptGridProps) {
	const { categoryById, aiToolById } = useCatalogMaps();

	if (isLoading) {
		return <PromptGridSkeleton count={skeletonCount} />;
	}

	if (!prompts || prompts.length === 0) {
		return (
			<EmptyState
				icon={FileSearch}
				title={emptyTitle}
				description={emptyDescription}
			/>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{prompts.map((prompt) => (
				<PromptCard
					key={prompt.id}
					prompt={prompt}
					aiToolName={aiToolById.get(prompt.aiToolId)?.name}
					categoryName={categoryById.get(prompt.categoryId)?.name}
				/>
			))}
		</div>
	);
}
