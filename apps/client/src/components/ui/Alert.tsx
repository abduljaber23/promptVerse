import type { ReactNode } from "react";
import {
	AlertTriangle,
	CheckCircle2,
	Info,
	XCircle,
} from "lucide-react";
import { cn } from "@/common/lib/cn";

type Variant = "info" | "success" | "warning" | "error";

const CONFIG: Record<
	Variant,
	{ cls: string; Icon: typeof Info }
> = {
	info: { cls: "alert-info", Icon: Info },
	success: { cls: "alert-success", Icon: CheckCircle2 },
	warning: { cls: "alert-warning", Icon: AlertTriangle },
	error: { cls: "alert-error", Icon: XCircle },
};

interface AlertProps {
	variant?: Variant;
	children: ReactNode;
	className?: string;
}

export function Alert({ variant = "info", children, className }: AlertProps) {
	const { cls, Icon } = CONFIG[variant];
	return (
		<div
			role="alert"
			className={cn("alert", cls, "items-start text-sm", className)}
		>
			<Icon className="size-5 shrink-0" aria-hidden />
			<span>{children}</span>
		</div>
	);
}
