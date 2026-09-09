import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
	open: boolean;
	title: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	danger?: boolean;
	loading?: boolean;
	onConfirm: () => void;
	onClose: () => void;
}

export function ConfirmDialog({
	open,
	title,
	description,
	confirmLabel = "Confirmer",
	cancelLabel = "Annuler",
	danger,
	loading,
	onConfirm,
	onClose,
}: ConfirmDialogProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	return (
		<dialog ref={ref} className="modal" onClose={onClose}>
			<div className="modal-box">
				<h3 className="text-lg font-semibold">{title}</h3>
				{description ? (
					<p className="mt-2 text-sm text-base-content/70">
						{description}
					</p>
				) : null}
				<div className="modal-action">
					<button
						type="button"
						className="btn btn-ghost"
						onClick={onClose}
						disabled={loading}
					>
						{cancelLabel}
					</button>
					<button
						type="button"
						className={danger ? "btn btn-error" : "btn btn-primary"}
						onClick={onConfirm}
						disabled={loading}
					>
						{loading ? (
							<span className="loading loading-spinner loading-sm" />
						) : null}
						{confirmLabel}
					</button>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button type="submit" aria-label="Fermer">
					close
				</button>
			</form>
		</dialog>
	);
}
