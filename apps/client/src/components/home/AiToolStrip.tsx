import { Link } from "react-router-dom";
import { useAiTools } from "@/hooks/useCatalog";

export function AiToolStrip() {
	const { data, isLoading } = useAiTools();

	if (isLoading) {
		return (
			<div className="flex flex-wrap gap-2">
				{Array.from({ length: 5 }, (_, i) => (
					<div key={i} className="skeleton h-9 w-24 rounded-full" />
				))}
			</div>
		);
	}

	if (!data || data.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-2">
			{data.map((tool) => (
				<Link
					key={tool.id}
					to={`/prompts?aiTool=${tool.slug}`}
					className="inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-200/60 px-4 py-2 text-sm font-medium text-base-content/80 transition-colors hover:border-primary/40 hover:text-base-content"
				>
					<span className="size-1.5 rounded-full bg-primary" />
					{tool.name}
				</Link>
			))}
		</div>
	);
}
