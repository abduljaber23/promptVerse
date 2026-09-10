import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Préférences d'interface (client-only, persistées dans localStorage).
 * N'a rien à voir avec le state serveur (TanStack Query).
 */
export type Theme = "dark" | "light";

interface UiState {
	theme: Theme;
	/** Menu latéral mobile (dashboard / admin) ouvert ? */
	mobileNavOpen: boolean;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
	setMobileNavOpen: (open: boolean) => void;
}

/** Applique le thème sur <html data-theme="…"> (lu par daisyUI). */
export function applyTheme(theme: Theme) {
	if (typeof document !== "undefined") {
		document.documentElement.dataset.theme = theme;
	}
}

export const useUiStore = create<UiState>()(
	persist(
		(set, get) => ({
			theme: "dark",
			mobileNavOpen: false,
			setTheme: (theme) => {
				applyTheme(theme);
				set({ theme });
			},
			toggleTheme: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
			setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
		}),
		{
			name: "promptverse-ui",
			partialize: (s) => ({ theme: s.theme }),
			onRehydrateStorage: () => (state) => {
				if (state) applyTheme(state.theme);
			},
		},
	),
);

// Applique le thème dès le chargement du module (avant le premier render React).
applyTheme(useUiStore.getState().theme);
