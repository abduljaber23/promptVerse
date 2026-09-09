import { useAdminAiTools, useAiToolMutations } from "@/hooks/useAdmin";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { CatalogManager } from "@/components/admin/CatalogManager";

export function AdminAiToolsPage() {
	useDocumentTitle("Outils IA — Admin PromptVerse");
	const { active, archived } = useAdminAiTools();
	const { create, update, remove, restore } = useAiToolMutations();

	return (
		<CatalogManager
			singular="outil IA"
			active={active}
			archived={archived}
			create={create}
			update={update}
			remove={remove}
			restore={restore}
		/>
	);
}
