import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/common/lib/cn";
import { useToastStore, type ToastVariant } from "@/common/store/toast.store";

const CONFIG: Record<ToastVariant, { cls: string; Icon: typeof Info }> = {
	info: { cls: "alert-info", Icon: Info },
	success: { cls: "alert-success", Icon: CheckCircle2 },
	warning: { cls: "alert-warning", Icon: AlertTriangle },
	error: { cls: "alert-error", Icon: XCircle },
};

/** Pile de notifications globale. Monté une seule fois à la racine de l'app. */
export function Toaster() {
	const toasts = useToastStore((s) => s.toasts);
	const dismiss = useToastStore((s) => s.dismiss);

	if (toasts.length === 0) return null;

	return (
		<div className="toast toast-top toast-end z-[100] max-w-[calc(100vw-2rem)]">
			{toasts.map((t) => {
				const { cls, Icon } = CONFIG[t.variant];
				return (
					<div
						key={t.id}
						role="alert"
						className={cn(
							"alert",
							cls,
							"items-start text-sm shadow-lg",
						)}
					>
						<Icon className="size-5 shrink-0" aria-hidden />
						<span className="flex-1">{t.message}</span>
						<button
							type="button"
							onClick={() => dismiss(t.id)}
							className="btn btn-ghost btn-xs btn-circle"
							aria-label="Fermer la notification"
						>
							<X className="size-4" />
						</button>
					</div>
				);
			})}
		</div>
	);
}
