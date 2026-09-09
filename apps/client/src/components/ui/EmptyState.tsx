import type { ComponentType, ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
	icon?: ComponentType<{ className?: string }>;
	title: string;
	description?: string;
	action?: ReactNode;
}

export function EmptyState({
	icon: Icon = Inbox,
	title,
	description,
	action,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-3 rounded-box border border-dashed border-base-content/15 bg-base-200/40 px-6 py-14 text-center">
			<span className="grid size-12 place-items-center rounded-full bg-base-content/5 text-base-content/50">
				<Icon className="size-6" />
			</span>
			<h3 className="text-base font-semibold text-base-content">{title}</h3>
			{description ? (
				<p className="max-w-sm text-sm text-base-content/60">
					{description}
				</p>
			) : null}
			{action ? <div className="mt-2">{action}</div> : null}
		</div>
	);
}
