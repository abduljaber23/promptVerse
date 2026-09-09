import { api } from "./client";
import type {
	LoginPayload,
	MessageResponse,
	RegisterPayload,
	ResetPasswordPayload,
} from "@/common/types";

export const authApi = {
	register(payload: RegisterPayload) {
		return api
			.post<MessageResponse>("/auth/register", payload)
			.then((r) => r.data);
	},

	login(payload: LoginPayload) {
		return api
			.post<MessageResponse>("/auth/login", payload)
			.then((r) => r.data);
	},

	logout() {
		return api.post<MessageResponse>("/auth/logout").then((r) => r.data);
	},

	forgotPassword(email: string) {
		return api
			.post<MessageResponse>("/auth/forgot-password", { email })
			.then((r) => r.data);
	},

	validateResetLink(userId: string, token: string) {
		return api
			.get<MessageResponse>(`/auth/reset-password/${userId}/${token}`)
			.then((r) => r.data);
	},

	resetPassword(payload: ResetPasswordPayload) {
		return api
			.post<MessageResponse>("/auth/reset-password", payload)
			.then((r) => r.data);
	},

	verifyEmail(userId: string, token: string) {
		return api
			.get<MessageResponse>(`/auth/verify-email/${userId}/${token}`)
			.then((r) => r.data);
	},
};
