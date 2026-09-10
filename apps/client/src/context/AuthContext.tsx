import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/common/api/admin.api";
import { authApi } from "@/common/api/auth.api";
import { usersApi } from "@/common/api/users.api";
import { queryKeys } from "@/common/constants/query-keys";
import { useAuthStore } from "@/common/store/auth.store";
import type { LoginPayload, RegisterPayload } from "@/common/types";

const SESSION_STALE_TIME = 5 * 60 * 1000;

/**
 * Synchronise la session (TanStack Query) vers le store Zustand `useAuthStore`.
 * Monté une seule fois, à la racine — ne rend rien.
 *
 * - `/users/me` : source de vérité de l'utilisateur connecté.
 * - `/admin/users/count` : sonde de rôle (200 => admin, 403 => simple user),
 *   car `/users/me` ne renvoie pas le rôle.
 */
export function AuthBootstrap() {
	const meQuery = useQuery({
		queryKey: queryKeys.auth.me,
		queryFn: usersApi.me,
		retry: false,
		staleTime: SESSION_STALE_TIME,
	});

	const isAuthenticated = meQuery.isSuccess && !!meQuery.data;

	const adminQuery = useQuery({
		queryKey: queryKeys.auth.isAdmin,
		queryFn: adminApi.countUsers,
		enabled: isAuthenticated,
		retry: false,
		staleTime: SESSION_STALE_TIME,
	});

	useEffect(() => {
		const { setSession } = useAuthStore.getState();
		if (meQuery.isPending) {
			setSession(null, "pending");
		} else if (isAuthenticated) {
			setSession(meQuery.data, "authenticated");
		} else {
			setSession(null, "unauthenticated");
		}
	}, [meQuery.isPending, meQuery.data, isAuthenticated]);

	useEffect(() => {
		if (!isAuthenticated) return;
		useAuthStore
			.getState()
			.setAdmin(adminQuery.isSuccess, !adminQuery.isPending);
	}, [isAuthenticated, adminQuery.isSuccess, adminQuery.isPending]);

	return null;
}

interface UseAuthValue {
	user: ReturnType<typeof useAuthStore.getState>["user"];
	status: ReturnType<typeof useAuthStore.getState>["status"];
	isAuthenticated: boolean;
	isAdmin: boolean;
	adminChecked: boolean;
	login: (payload: LoginPayload) => Promise<void>;
	register: (payload: RegisterPayload) => Promise<{ message: string }>;
	logout: () => Promise<void>;
	refetchUser: () => void;
}

/**
 * Accès à la session courante + actions d'auth.
 * L'état vient du store Zustand ; le rafraîchissement passe par TanStack Query.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): UseAuthValue {
	const queryClient = useQueryClient();
	const user = useAuthStore((s) => s.user);
	const status = useAuthStore((s) => s.status);
	const isAdmin = useAuthStore((s) => s.isAdmin);
	const adminChecked = useAuthStore((s) => s.adminChecked);

	const login = useCallback(
		async (payload: LoginPayload) => {
			await authApi.login(payload);
			await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
			await queryClient.invalidateQueries({
				queryKey: queryKeys.auth.isAdmin,
			});
		},
		[queryClient],
	);

	const register = useCallback(
		(payload: RegisterPayload) => authApi.register(payload),
		[],
	);

	const logout = useCallback(async () => {
		try {
			await authApi.logout();
		} finally {
			useAuthStore.getState().reset();
			queryClient.clear();
		}
	}, [queryClient]);

	const refetchUser = useCallback(() => {
		void queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
	}, [queryClient]);

	return {
		user,
		status,
		isAuthenticated: status === "authenticated",
		isAdmin,
		adminChecked,
		login,
		register,
		logout,
		refetchUser,
	};
}
