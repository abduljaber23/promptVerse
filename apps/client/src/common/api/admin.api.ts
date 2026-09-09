import { api } from "./client";
import type { UserRole } from "@/common/constants/roles";
import type { AdminUser, AiTool, Category } from "@/common/types";

export const adminApi = {
	/* -- Users -- */
	listUsers() {
		return api.get<AdminUser[]>("/admin/users").then((r) => r.data);
	},
	countUsers() {
		return api.get<number>("/admin/users/count").then((r) => r.data);
	},
	makeRole(userId: string, role: UserRole) {
		return api
			.patch<AdminUser>(`/admin/users/${userId}/make-role`, { role })
			.then((r) => r.data);
	},

	/* -- Categories -- */
	listArchivedCategories() {
		return api
			.get<Category[]>("/admin/categories/archived")
			.then((r) => r.data);
	},
	createCategory(name: string) {
		return api
			.post<Category>("/admin/categories", { name })
			.then((r) => r.data);
	},
	updateCategory(id: string, name: string) {
		return api
			.patch<Category>(`/admin/categories/${id}`, { name })
			.then((r) => r.data);
	},
	deleteCategory(id: string) {
		return api.delete(`/admin/categories/${id}`).then((r) => r.data);
	},
	restoreCategory(id: string) {
		return api
			.patch<Category>(`/admin/categories/${id}/restore`)
			.then((r) => r.data);
	},

	/* -- AI Tools -- */
	listArchivedAiTools() {
		return api.get<AiTool[]>("/admin/ai-tools/archived").then((r) => r.data);
	},
	createAiTool(name: string) {
		return api.post<AiTool>("/admin/ai-tools", { name }).then((r) => r.data);
	},
	updateAiTool(id: string, name: string) {
		return api
			.patch<AiTool>(`/admin/ai-tools/${id}`, { name })
			.then((r) => r.data);
	},
	deleteAiTool(id: string) {
		return api.delete(`/admin/ai-tools/${id}`).then((r) => r.data);
	},
	restoreAiTool(id: string) {
		return api
			.patch<AiTool>(`/admin/ai-tools/${id}/restore`)
			.then((r) => r.data);
	},
};
