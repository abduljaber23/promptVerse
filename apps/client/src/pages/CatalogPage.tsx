import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
	usePromptList,
	usePromptsByAiTool,
	usePromptsByCategory,
} from "@/hooks/usePrompts";
import { useAiTools, useCatalogMaps, useCategories } from "@/hooks/useCatalog";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Container } from "@/components/layout/Container";
import { PromptGrid } from "@/components/prompt/PromptGrid";
import { Pagination } from "@/components/ui/Pagination";
import { Alert } from "@/components/ui/Alert";
import { getApiErrorMessage } from "@/common/lib/api-error";

const PER_PAGE = 12;

export function CatalogPage() {
	useDocumentTitle("Catalogue — PromptVerse");
	const [params, setParams] = useSearchParams();

	const category = params.get("category") ?? "";
	const aiTool = params.get("aiTool") ?? "";
	const queryParam = params.get("q") ?? "";
	const page = Math.max(1, Number(params.get("page") ?? "1") || 1);

	const [searchInput, setSearchInput] = useState(queryParam);
	const debouncedSearch = useDebouncedValue(searchInput, 350);

	useEffect(() => {
		setSearchInput(queryParam);
	}, [queryParam]);

	useEffect(() => {
		if (debouncedSearch === queryParam) return;
		const next = new URLSearchParams(params);
		if (debouncedSearch) next.set("q", debouncedSearch);
		else next.delete("q");
		next.delete("page");
		setParams(next, { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch]);

	const categories = useCategories();
	const aiTools = useAiTools();
	const { aiToolById, categoryById } = useCatalogMaps();

	const mode: "category" | "aiTool" | "all" = category
		? "category"
		: aiTool
			? "aiTool"
			: "all";

	const listAll = usePromptList(page, PER_PAGE);
	const byCategory = usePromptsByCategory(mode === "category" ? category : undefined);
	const byAiTool = usePromptsByAiTool(mode === "aiTool" ? aiTool : undefined);

	const active =
		mode === "category" ? byCategory : mode === "aiTool" ? byAiTool : listAll;

	const filtered = useMemo(() => {
		let rows = active.data ?? [];
		if (queryParam) {
			const q = queryParam.toLowerCase();
			rows = rows.filter((p) => p.title.toLowerCase().includes(q));
		}
		// Le back ne permet qu'un seul filtre serveur : on affine côté client.
		if (mode === "category" && aiTool) {
			rows = rows.filter(
				(p) => aiToolById.get(p.aiToolId)?.slug === aiTool,
			);
		}
		if (mode === "aiTool" && category) {
			rows = rows.filter(
				(p) => categoryById.get(p.categoryId)?.slug === category,
			);
		}
		return rows;
	}, [active.data, queryParam, mode, aiTool, category, aiToolById, categoryById]);

	const updateFilter = (key: string, value: string) => {
		const next = new URLSearchParams(params);
		if (value) next.set(key, value);
		else next.delete(key);
		next.delete("page");
		setParams(next);
	};

	const clearAll = () => setParams(new URLSearchParams());

	const hasFilters = Boolean(category || aiTool || queryParam);
	const hasNext = mode === "all" && (listAll.data?.length ?? 0) === PER_PAGE;

	return (
		<Container size="wide" className="py-10">
			<header className="mb-8">
				<h1 className="text-2xl font-bold">Catalogue</h1>
				<p className="text-sm text-base-content/55">
					{active.isLoading
						? "Chargement…"
						: `${filtered.length} prompt${filtered.length > 1 ? "s" : ""} affiché${filtered.length > 1 ? "s" : ""}`}
				</p>
			</header>

			<div className="grid gap-8 lg:grid-cols-[240px_1fr]">
				<aside className="space-y-5">
					<div className="flex items-center gap-2 text-sm font-semibold text-base-content/70">
						<SlidersHorizontal className="size-4" />
						Filtres
					</div>

					<label className="input input-sm items-center gap-2 bg-base-200">
						<Search className="size-4 text-base-content/50" />
						<input
							type="search"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Rechercher…"
							className="grow"
						/>
					</label>

					<div className="form-control">
						<span className="mb-1 text-xs font-medium uppercase tracking-wide text-base-content/50">
							Catégorie
						</span>
						<select
							className="select select-sm select-bordered bg-base-200"
							value={category}
							onChange={(e) =>
								updateFilter("category", e.target.value)
							}
						>
							<option value="">Toutes</option>
							{(categories.data ?? []).map((c) => (
								<option key={c.id} value={c.slug}>
									{c.name}
								</option>
							))}
						</select>
					</div>

					<div className="form-control">
						<span className="mb-1 text-xs font-medium uppercase tracking-wide text-base-content/50">
							Outil IA
						</span>
						<select
							className="select select-sm select-bordered bg-base-200"
							value={aiTool}
							onChange={(e) =>
								updateFilter("aiTool", e.target.value)
							}
						>
							<option value="">Tous</option>
							{(aiTools.data ?? []).map((t) => (
								<option key={t.id} value={t.slug}>
									{t.name}
								</option>
							))}
						</select>
					</div>

					{hasFilters ? (
						<button
							type="button"
							onClick={clearAll}
							className="btn btn-ghost btn-xs gap-1"
						>
							<X className="size-3" />
							Réinitialiser
						</button>
					) : null}
				</aside>

				<div>
					{active.isError ? (
						<Alert variant="error">
							{getApiErrorMessage(active.error)}
						</Alert>
					) : (
						<>
							<PromptGrid
								prompts={filtered}
								isLoading={active.isLoading}
								skeletonCount={9}
								emptyTitle="Aucun résultat"
								emptyDescription="Essayez d'élargir vos filtres ou de modifier votre recherche."
							/>
							<Pagination
								page={page}
								hasNext={hasNext}
								isFetching={listAll.isFetching}
								onPageChange={(p) =>
									updateFilter("page", String(p))
								}
							/>
						</>
					)}
				</div>
			</div>
		</Container>
	);
}
