import { api } from "./client";
import type { AiTool, Category } from "@/common/types";

export const catalogApi = {
	listCategories() {
		return api.get<Category[]>("/categories").then((r) => r.data);
	},

	getCategory(slug: string) {
		return api.get<Category>(`/categories/${slug}`).then((r) => r.data);
	},

	listAiTools() {
		return api.get<AiTool[]>("/ai-tools").then((r) => r.data);
	},

	getAiTool(slug: string) {
		return api.get<AiTool>(`/ai-tools/${slug}`).then((r) => r.data);
	},
};
