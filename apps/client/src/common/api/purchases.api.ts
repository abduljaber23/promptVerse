import { api } from "./client";
import type { CreateCheckoutSessionResponse, Purchase } from "@/common/types";

export const purchasesApi = {
	createCheckoutSession(promptId: string) {
		return api
			.post<CreateCheckoutSessionResponse>("/purchases/checkout-session", {
				promptId,
			})
			.then((r) => r.data);
	},

	listMine() {
		return api.get<Purchase[]>("/purchases/mine").then((r) => r.data);
	},

	getBySessionId(sessionId: string) {
		return api
			.get<Purchase>(`/purchases/by-session/${sessionId}`)
			.then((r) => r.data);
	},
};
