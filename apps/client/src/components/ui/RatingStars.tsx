import { Star } from "lucide-react";
import { cn } from "@/common/lib/cn";
import { formatRating } from "@/common/lib/format";

interface RatingStarsProps {
	value: string | number;
	count?: number;
	className?: string;
	showLabel?: boolean;
}

export function RatingStars({
	value,
	count,
	className,
	showLabel = true,
}: RatingStarsProps) {
	const numeric =
		typeof value === "string" ? Number.parseFloat(value) : value;
	const hasRating = Number.isFinite(numeric) && numeric > 0;

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 text-xs text-base-content/70",
				className,
			)}
		>
			<Star
				className={cn(
					"size-3.5",
					hasRating
						? "fill-warning text-warning"
						: "text-base-content/30",
				)}
			/>
			{showLabel ? (
				<span className="font-medium text-base-content">
					{formatRating(value)}
				</span>
			) : null}
			{typeof count === "number" ? (
				<span className="text-base-content/50">({count})</span>
			) : null}
		</span>
	);
}
