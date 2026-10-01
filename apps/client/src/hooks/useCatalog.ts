import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "@/common/api/catalog.api";
import { queryKeys } from "@/common/constants/query-keys";
import type { AiTool, Category } from "@/common/types";

const LONG_STALE = 10 * 60 * 1000;

export function useCategories() {
	return useQuery({
		queryKey: queryKeys.categories.all,
		queryFn: catalogApi.listCategories,
		staleTime: LONG_STALE,
	});
}

export function useAiTools() {
	return useQuery({
		queryKey: queryKeys.aiTools.all,
		queryFn: catalogApi.listAiTools,
		staleTime: LONG_STALE,
	});
}

export function useCategory(slug: string | undefined) {
	return useQuery({
		queryKey: queryKeys.categories.bySlug(slug ?? ""),
		queryFn: () => catalogApi.getCategory(slug as string),
		enabled: !!slug,
		staleTime: LONG_STALE,
	});
}

export function useAiTool(slug: string | undefined) {
	return useQuery({
		queryKey: queryKeys.aiTools.bySlug(slug ?? ""),
		queryFn: () => catalogApi.getAiTool(slug as string),
		enabled: !!slug,
		staleTime: LONG_STALE,
	});
}


// permet de retrouver une categorie ou un outil avec son id
export function useCatalogMaps() {

   
    const categories = useCategories();


    const aiTools = useAiTools();

    /
    const categoryById = useMemo(() => {

        const map = new Map<string, Category>();

        // ajoute chaque categorie avec son id
        for (const c of categories.data ?? []) map.set(c.id, c);

        return map;

    }, [categories.data]);

    // fait une map avec les outils ia
    const aiToolById = useMemo(() => {

        const map = new Map<string, AiTool>();

        // ajoute chaque outil avec son id
        for (const t of aiTools.data ?? []) map.set(t.id, t);

        return map;

    }, [aiTools.data]);

    return {

        categoryById,
        aiToolById,

        // verifie si les données sont encore en chargement
        isLoading: categories.isLoading || aiTools.isLoading,
    };
}

