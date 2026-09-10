import { create } from "zustand";
import type { CurrentUser } from "@/common/types";

/**
 * Session courante (client-readable, écriture unique par <AuthBootstrap>).
 *
 * Le *fetch* de `/users/me` et la sonde `/admin/users/count` restent gérés
 * par TanStack Query ; ce store ne fait qu'exposer le résultat de façon
 * globale et synchrone (routes, navbar, intercepteur axios 401…).
 */
export type AuthStatus = "pending" | "authenticated" | "unauthenticated";

interface AuthState {
	user: CurrentUser | null;
	status: AuthStatus;
	/** Rôle ADMIN / SUPER_ADMIN confirmé par l'API. */
	isAdmin: boolean;
	/** `true` une fois la sonde de rôle terminée (ou si non connecté). */
	adminChecked: boolean;
	setSession: (user: CurrentUser | null, status: AuthStatus) => void;
	setAdmin: (isAdmin: boolean, checked: boolean) => void;
	reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	status: "pending",
	isAdmin: false,
	adminChecked: false,
	setSession: (user, status) =>
		set({
			user,
			status,
			...(status === "unauthenticated"
				? { isAdmin: false, adminChecked: true }
				: {}),
		}),
	setAdmin: (isAdmin, adminChecked) => set({ isAdmin, adminChecked }),
	reset: () =>
		set({
			user: null,
			status: "unauthenticated",
			isAdmin: false,
			adminChecked: true,
		}),
}));
