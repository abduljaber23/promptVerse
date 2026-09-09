import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import type { Prompt } from "@/common/types";
import { formatPrice } from "@/common/lib/format";
import { resolveAssetUrl } from "@/common/lib/assets";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { RatingStars } from "@/components/ui/RatingStars";

interface PromptCardProps {
	prompt: Prompt;
	aiToolName?: string;
	categoryName?: string;
}

export function PromptCard({
	prompt,
	aiToolName,
	categoryName,
}: PromptCardProps) {
	return (
		<Link
			to={`/prompts/${prompt.slug}`}
			className="group flex flex-col overflow-hidden rounded-box border border-base-content/10 bg-base-200/50 transition-colors hover:border-primary/40"
		>
			<div className="relative">
				<Thumbnail
					src={resolveAssetUrl(prompt.coverImage)}
					alt={prompt.title}
					rounded="rounded-none"
					className="aspect-[16/10] w-full"
				/>
				{aiToolName ? (
					<span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-base-100/80 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
						<span className="size-1.5 rounded-full bg-primary" />
						{aiToolName}
					</span>
				) : null}
				{prompt.isFeatured ? (
					<span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-[11px] font-semibold text-primary-content">
						<Sparkles className="size-3" />
						À la une
					</span>
				) : null}
			</div>

			<div className="flex flex-1 flex-col gap-2 p-4">
				<h3 className="line-clamp-2 min-h-[2.6rem] text-sm font-semibold leading-snug text-base-content">
					{prompt.title}
				</h3>
				{categoryName ? (
					<span className="text-xs text-base-content/50">
						{categoryName}
					</span>
				) : null}
				<RatingStars
					value={prompt.averageRating}
					count={prompt.salesCount}
				/>
				<div className="mt-auto flex items-center justify-between pt-2">
					<span className="text-base font-bold text-success">
						{formatPrice(prompt.price)}
					</span>
					<span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
						Voir le prompt →
					</span>
				</div>
			</div>
		</Link>
	);
}
