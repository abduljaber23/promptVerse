// Clés React Query centralisées — une seule source de vérité pour
// l'invalidation du cache.

export const queryKeys = {
	auth: {
		me: ["auth", "me"] as const,
		isAdmin: ["auth", "is-admin"] as const,
	},
	prompts: {
		all: ["prompts"] as const,
		list: (page: number, perPage: number) =>
			["prompts", "list", { page, perPage }] as const,
		mine: ["prompts", "mine"] as const,
		bySlug: (slug: string) => ["prompts", "slug", slug] as const,
		byCategory: (slug: string) => ["prompts", "category", slug] as const,
		byAiTool: (slug: string) => ["prompts", "ai-tool", slug] as const,
	},
	categories: {
		all: ["categories"] as const,
		archived: ["categories", "archived"] as const,
		bySlug: (slug: string) => ["categories", "slug", slug] as const,
	},
	aiTools: {
		all: ["ai-tools"] as const,
		archived: ["ai-tools", "archived"] as const,
		bySlug: (slug: string) => ["ai-tools", "slug", slug] as const,
	},
	admin: {
		users: ["admin", "users"] as const,
		usersCount: ["admin", "users", "count"] as const,
	},
	purchases: {
		mine: ["purchases", "mine"] as const,
		bySession: (sessionId: string) =>
			["purchases", "session", sessionId] as const,
	},
} as const;
