import { api } from "./client";
import type { CreatePromptPayload, Prompt } from "@/common/types";

export const promptsApi = {
	list(pageNumber = 1, promptsPerPage = 12) {
		return api
			.get<Prompt[]>("/prompts", {
				params: { pageNumber, promptsPerPage },
			})
			.then((r) => r.data);
	},

	getBySlug(slug: string) {
		return api.get<Prompt>(`/prompts/${slug}`).then((r) => r.data);
	},

	listByCategory(categorySlug: string) {
		return api
			.get<Prompt[]>(`/prompts/category/${categorySlug}`)
			.then((r) => r.data);
	},

	listByAiTool(aiToolSlug: string) {
		return api
			.get<Prompt[]>(`/prompts/ai-tool/${aiToolSlug}`)
			.then((r) => r.data);
	},

	listMine() {
		return api.get<Prompt[]>("/prompts/me").then((r) => r.data);
	},

	create(payload: CreatePromptPayload) {
		const form = new FormData();
		form.append("title", payload.title);
		form.append("promptContent", payload.promptContent);
		if (payload.previewResult) {
			form.append("previewResult", payload.previewResult);
		}
		form.append("price", String(payload.price));
		form.append("categoryId", payload.categoryId);
		form.append("aiToolId", payload.aiToolId);
		if (payload.coverImage) {
			form.append("coverImage", payload.coverImage);
		}
		for (const image of payload.previewImages ?? []) {
			form.append("previewImages", image);
		}
		return api
			.post<Prompt>("/prompts", form, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((r) => r.data);
	},
};
