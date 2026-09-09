import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/common/api/users.api";
import { queryKeys } from "@/common/constants/query-keys";
import type { CurrentUser, UpdateProfilePayload } from "@/common/types";

export function useUpdateProfile() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: UpdateProfilePayload) =>
			usersApi.updateProfile(payload),
		onSuccess: (data) => {
			queryClient.setQueryData<CurrentUser>(queryKeys.auth.me, data.user);
		},
	});
}

export function useUploadAvatar() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (file: File) => usersApi.uploadAvatar(file),
		onSuccess: (user) => {
			queryClient.setQueryData<CurrentUser>(queryKeys.auth.me, user);
		},
	});
}

export function useDeleteAvatar() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => usersApi.deleteAvatar(),
		onSuccess: (user) => {
			queryClient.setQueryData<CurrentUser>(queryKeys.auth.me, user);
		},
	});
}

export function useDeleteAccount() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => usersApi.deleteAccount(),
		onSuccess: () => {
			queryClient.clear();
		},
	});
}
