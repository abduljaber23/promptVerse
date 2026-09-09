import { useAdminCategories, useCategoryMutations } from "@/hooks/useAdmin";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { CatalogManager } from "@/components/admin/CatalogManager";

export function AdminCategoriesPage() {
	useDocumentTitle("Catégories — Admin PromptVerse");
	const { active, archived } = useAdminCategories();
	const { create, update, remove, restore } = useCategoryMutations();

	return (
		<CatalogManager
			singular="catégorie"
			active={active}
			archived={archived}
			create={create}
			update={update}
			remove={remove}
			restore={restore}
		/>
	);
}
