import {
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { adminApi } from "@/common/api/admin.api";
import { catalogApi } from "@/common/api/catalog.api";
import { queryKeys } from "@/common/constants/query-keys";
import type { UserRole } from "@/common/constants/roles";

/* ------------------------------- Users -------------------------------- */

export function useAdminUsers() {
	return useQuery({
		queryKey: queryKeys.admin.users,
		queryFn: adminApi.listUsers,
	});
}

export function useMakeRole() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
			adminApi.makeRole(userId, role),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: queryKeys.admin.users,
			});
		},
	});
}

/* ---------------------------- Categories ------------------------------ */

export function useAdminCategories() {
	const active = useQuery({
		queryKey: queryKeys.categories.all,
		queryFn: catalogApi.listCategories,
	});
	const archived = useQuery({
		queryKey: queryKeys.categories.archived,
		queryFn: adminApi.listArchivedCategories,
	});
	return { active, archived };
}

export function useCategoryMutations() {
	const queryClient = useQueryClient();
	const invalidate = () => {
		void queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
		void queryClient.invalidateQueries({
			queryKey: queryKeys.categories.archived,
		});
	};

	return {
		create: useMutation({
			mutationFn: (name: string) => adminApi.createCategory(name),
			onSuccess: invalidate,
		}),
		update: useMutation({
			mutationFn: ({ id, name }: { id: string; name: string }) =>
				adminApi.updateCategory(id, name),
			onSuccess: invalidate,
		}),
		remove: useMutation({
			mutationFn: (id: string) => adminApi.deleteCategory(id),
			onSuccess: invalidate,
		}),
		restore: useMutation({
			mutationFn: (id: string) => adminApi.restoreCategory(id),
			onSuccess: invalidate,
		}),
	};
}

/* ----------------------------- AI Tools ------------------------------- */

export function useAdminAiTools() {
	const active = useQuery({
		queryKey: queryKeys.aiTools.all,
		queryFn: catalogApi.listAiTools,
	});
	const archived = useQuery({
		queryKey: queryKeys.aiTools.archived,
		queryFn: adminApi.listArchivedAiTools,
	});
	return { active, archived };
}

export function useAiToolMutations() {
	const queryClient = useQueryClient();
	const invalidate = () => {
		void queryClient.invalidateQueries({ queryKey: queryKeys.aiTools.all });
		void queryClient.invalidateQueries({
			queryKey: queryKeys.aiTools.archived,
		});
	};

	return {
		create: useMutation({
			mutationFn: (name: string) => adminApi.createAiTool(name),
			onSuccess: invalidate,
		}),
		update: useMutation({
			mutationFn: ({ id, name }: { id: string; name: string }) =>
				adminApi.updateAiTool(id, name),
			onSuccess: invalidate,
		}),
		remove: useMutation({
			mutationFn: (id: string) => adminApi.deleteAiTool(id),
			onSuccess: invalidate,
		}),
		restore: useMutation({
			mutationFn: (id: string) => adminApi.restoreAiTool(id),
			onSuccess: invalidate,
		}),
	};
}
