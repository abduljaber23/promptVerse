import {
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { promptsApi } from "@/common/api/prompts.api";
import { queryKeys } from "@/common/constants/query-keys";
import type { CreatePromptPayload } from "@/common/types";

export function usePromptList(pageNumber: number, promptsPerPage = 12) {
	return useQuery({
		queryKey: queryKeys.prompts.list(pageNumber, promptsPerPage),
		queryFn: () => promptsApi.list(pageNumber, promptsPerPage),
		placeholderData: (prev) => prev,
	});
}

export function usePromptBySlug(slug: string | undefined) {
	return useQuery({
		queryKey: queryKeys.prompts.bySlug(slug ?? ""),
		queryFn: () => promptsApi.getBySlug(slug as string),
		enabled: !!slug,
	});
}

export function usePromptsByCategory(slug: string | undefined) {
	return useQuery({
		queryKey: queryKeys.prompts.byCategory(slug ?? ""),
		queryFn: () => promptsApi.listByCategory(slug as string),
		enabled: !!slug,
	});
}

export function usePromptsByAiTool(slug: string | undefined) {
	return useQuery({
		queryKey: queryKeys.prompts.byAiTool(slug ?? ""),
		queryFn: () => promptsApi.listByAiTool(slug as string),
		enabled: !!slug,
	});
}

export function useMyPrompts(enabled = true) {
	return useQuery({
		queryKey: queryKeys.prompts.mine,
		queryFn: promptsApi.listMine,
		enabled,
	});
}

export function useCreatePrompt() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreatePromptPayload) => promptsApi.create(payload),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: queryKeys.prompts.all,
			});
		},
	});
}
