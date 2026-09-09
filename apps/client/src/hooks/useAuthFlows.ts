import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/common/api/auth.api";
import type { ResetPasswordPayload } from "@/common/types";

export function useForgotPassword() {
	return useMutation({
		mutationFn: (email: string) => authApi.forgotPassword(email),
	});
}

export function useResetPassword() {
	return useMutation({
		mutationFn: (payload: ResetPasswordPayload) =>
			authApi.resetPassword(payload),
	});
}

export function useValidateResetLink(userId?: string, token?: string) {
	return useQuery({
		queryKey: ["auth", "reset-link", userId, token],
		queryFn: () =>
			authApi.validateResetLink(userId as string, token as string),
		enabled: !!userId && !!token,
		retry: false,
	});
}

export function useVerifyEmail(userId?: string, token?: string) {
	return useQuery({
		queryKey: ["auth", "verify-email", userId, token],
		queryFn: () => authApi.verifyEmail(userId as string, token as string),
		enabled: !!userId && !!token,
		retry: false,
	});
}
