import { Link } from "react-router-dom";
import { cn } from "@/common/lib/cn";

export function Logo({ className }: { className?: string }) {
	return (
		<Link
			to="/"
			className={cn(
				"text-lg font-bold tracking-tight text-base-content",
				className,
			)}
		>
			<span className="text-primary">Prompt</span>Verse
		</Link>
	);
}
