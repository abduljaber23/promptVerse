import { api } from "./client";
import type { CurrentUser, UpdateProfilePayload } from "@/common/types";

interface UpdateProfileResponse {
	user: CurrentUser;
	message: string;
}

export const usersApi = {
	me() {
		return api.get<CurrentUser>("/users/me").then((r) => r.data);
	},

	updateProfile(payload: UpdateProfilePayload) {
		return api
			.patch<UpdateProfileResponse>("/users/me", payload)
			.then((r) => r.data);
	},

	deleteAccount() {
		return api.delete<void>("/users/me").then((r) => r.data);
	},

	uploadAvatar(file: File) {
		const form = new FormData();
		form.append("avatar", file);
		return api
			.post<CurrentUser>("/users/avatar", form, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((r) => r.data);
	},

	deleteAvatar() {
		return api.delete<CurrentUser>("/users/avatar").then((r) => r.data);
	},
};
