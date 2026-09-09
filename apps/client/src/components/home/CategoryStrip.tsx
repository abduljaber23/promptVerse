import { Link } from "react-router-dom";
import { FolderTree } from "lucide-react";
import { useCategories } from "@/hooks/useCatalog";

export function CategoryStrip() {
	const { data, isLoading } = useCategories();

	if (isLoading) {
		return (
			<div className="flex flex-wrap gap-2">
				{Array.from({ length: 6 }, (_, i) => (
					<div key={i} className="skeleton h-9 w-28 rounded-full" />
				))}
			</div>
		);
	}

	if (!data || data.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-2">
			{data.map((category) => (
				<Link
					key={category.id}
					to={`/prompts?category=${category.slug}`}
					className="inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-200/60 px-4 py-2 text-sm font-medium text-base-content/80 transition-colors hover:border-primary/40 hover:text-base-content"
				>
					<FolderTree className="size-4 text-primary" />
					{category.name}
				</Link>
			))}
		</div>
	);
}
