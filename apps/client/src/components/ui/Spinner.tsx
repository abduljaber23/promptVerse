import { cn } from "@/common/lib/cn";

interface SpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
	label?: string;
}

const SIZES = {
	sm: "loading-sm",
	md: "loading-md",
	lg: "loading-lg",
} as const;

export function Spinner({ size = "md", className, label }: SpinnerProps) {
	return (
		<span
			role="status"
			aria-label={label ?? "Chargement"}
			className={cn(
				"loading loading-spinner text-primary",
				SIZES[size],
				className,
			)}
		/>
	);
}

/** Bloc centré plein hauteur pour l'état de chargement d'une page. */
export function PageLoader({ label }: { label?: string }) {
	return (
		<div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
			<Spinner size="lg" />
			{label ? (
				<p className="text-sm text-base-content/60">{label}</p>
			) : null}
		</div>
	);
}
