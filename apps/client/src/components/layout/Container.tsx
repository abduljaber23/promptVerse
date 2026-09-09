import type { ElementType, ReactNode } from "react";
import { cn } from "@/common/lib/cn";

interface ContainerProps {
	children: ReactNode;
	className?: string;
	as?: ElementType;
	size?: "default" | "narrow" | "wide";
}

const SIZES = {
	narrow: "max-w-3xl",
	default: "max-w-6xl",
	wide: "max-w-7xl",
} as const;

export function Container({
	children,
	className,
	as: Tag = "div",
	size = "default",
}: ContainerProps) {
	return (
		<Tag className={cn("mx-auto w-full px-4 sm:px-6", SIZES[size], className)}>
			{children}
		</Tag>
	);
}
