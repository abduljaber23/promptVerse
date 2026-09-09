import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	type ReactNode,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/common/api/admin.api";
import { authApi } from "@/common/api/auth.api";
import { usersApi } from "@/common/api/users.api";
import { queryKeys } from "@/common/constants/query-keys";
import type {
	CurrentUser,
	LoginPayload,
	RegisterPayload,
} from "@/common/types";

type AuthStatus = "pending" | "authenticated" | "unauthenticated";

interface AuthContextValue {
	user: CurrentUser | null;
	status: AuthStatus;
	isAuthenticated: boolean;
	/** `true` si l'API accepte les endpoints /admin (rôle ADMIN ou SUPER_ADMIN). */
	isAdmin: boolean;
	/** `true` une fois la vérification du rôle admin terminée. */
	adminChecked: boolean;
	login: (payload: LoginPayload) => Promise<void>;
	register: (payload: RegisterPayload) => Promise<{ message: string }>;
	logout: () => Promise<void>;
	refetchUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();

	const meQuery = useQuery({
		queryKey: queryKeys.auth.me,
		queryFn: usersApi.me,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const isAuthenticated = meQuery.isSuccess && !!meQuery.data;

	// Le endpoint /users/me ne renvoie pas le rôle : on sonde /admin/users/count.
	// 200 => admin, 403 => simple utilisateur.
	const adminQuery = useQuery({
		queryKey: queryKeys.auth.isAdmin,
		queryFn: adminApi.countUsers,
		enabled: isAuthenticated,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const loginMutation = useMutation({
		mutationFn: authApi.login,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
			await queryClient.invalidateQueries({
				queryKey: queryKeys.auth.isAdmin,
			});
		},
	});

	const logoutMutation = useMutation({
		mutationFn: authApi.logout,
		onSettled: () => {
			queryClient.clear();
		},
	});

	const login = useCallback(
		async (payload: LoginPayload) => {
			await loginMutation.mutateAsync(payload);
		},
		[loginMutation],
	);

	const register = useCallback(
		(payload: RegisterPayload) => authApi.register(payload),
		[],
	);

	const logout = useCallback(async () => {
		await logoutMutation.mutateAsync();
	}, [logoutMutation]);

	const refetchUser = useCallback(() => {
		void meQuery.refetch();
	}, [meQuery]);

	const status: AuthStatus = meQuery.isPending
		? "pending"
		: isAuthenticated
			? "authenticated"
			: "unauthenticated";

	const value = useMemo<AuthContextValue>(
		() => ({
			user: meQuery.data ?? null,
			status,
			isAuthenticated,
			isAdmin: adminQuery.isSuccess,
			adminChecked: !isAuthenticated || !adminQuery.isPending,
			login,
			register,
			logout,
			refetchUser,
		}),
		[
			meQuery.data,
			status,
			isAuthenticated,
			adminQuery.isSuccess,
			adminQuery.isPending,
			login,
			register,
			logout,
			refetchUser,
		],
	);

	return <AuthContext value={value}>{children}</AuthContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth doit être utilisé dans <AuthProvider>.");
	}
	return ctx;
}
