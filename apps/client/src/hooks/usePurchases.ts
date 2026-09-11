import { useMutation, useQuery } from "@tanstack/react-query";
import { purchasesApi } from "@/common/api/purchases.api";
import { queryKeys } from "@/common/constants/query-keys";
import type { Purchase } from "@/common/types";

export function useMyPurchases() {
	return useQuery({
		queryKey: queryKeys.purchases.mine,
		queryFn: purchasesApi.listMine,
	});
}

export function useCreateCheckoutSession() {
	return useMutation({
		mutationFn: (promptId: string) =>
			purchasesApi.createCheckoutSession(promptId),
	});
}

/** Poll la session tant que le webhook Stripe n'a pas encore confirmé le paiement. */
export function usePurchaseBySessionId(sessionId: string | undefined) {
	return useQuery({
		queryKey: queryKeys.purchases.bySession(sessionId ?? ""),
		queryFn: () => purchasesApi.getBySessionId(sessionId as string),
		enabled: !!sessionId,
		refetchInterval: (query) => {
			const purchase = query.state.data as Purchase | undefined;
			return purchase?.status === "PENDING" ? 2000 : false;
		},
	});
}
