import { create } from "zustand";

/**
 * Notifications transitoires (client-only).
 * Le state serveur reste sur TanStack Query ; ce store ne gère que
 * l'affichage éphémère de messages de succès / erreur.
 */
export type ToastVariant = "info" | "success" | "warning" | "error";

export interface Toast {
	id: string;
	variant: ToastVariant;
	message: string;
}

interface ToastState {
	toasts: Toast[];
	/** Ajoute un toast et programme son retrait automatique. Renvoie son id. */
	push: (variant: ToastVariant, message: string, durationMs?: number) => string;
	dismiss: (id: string) => void;
	clear: () => void;
}

const DEFAULT_DURATION: Record<ToastVariant, number> = {
	info: 4000,
	success: 4000,
	warning: 5000,
	error: 6000,
};

export const useToastStore = create<ToastState>((set, get) => ({
	toasts: [],
	push: (variant, message, durationMs) => {
		const id =
			typeof crypto !== "undefined" && "randomUUID" in crypto
				? crypto.randomUUID()
				: `${Date.now()}-${Math.random().toString(16).slice(2)}`;

		set((state) => ({ toasts: [...state.toasts, { id, variant, message }] }));

		const ttl = durationMs ?? DEFAULT_DURATION[variant];
		if (ttl > 0 && typeof window !== "undefined") {
			window.setTimeout(() => get().dismiss(id), ttl);
		}
		return id;
	},
	dismiss: (id) =>
		set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
	clear: () => set({ toasts: [] }),
}));

/**
 * Helper impératif : utilisable hors composant (hooks, `catch`, intercepteurs…).
 *   toast.error(getApiErrorMessage(err));
 */
export const toast = {
	info: (message: string, durationMs?: number) =>
		useToastStore.getState().push("info", message, durationMs),
	success: (message: string, durationMs?: number) =>
		useToastStore.getState().push("success", message, durationMs),
	warning: (message: string, durationMs?: number) =>
		useToastStore.getState().push("warning", message, durationMs),
	error: (message: string, durationMs?: number) =>
		useToastStore.getState().push("error", message, durationMs),
};
