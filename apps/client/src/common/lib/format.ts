const priceFormatter = new Intl.NumberFormat("fr-FR", {
	style: "currency",
	currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
	day: "2-digit",
	month: "long",
	year: "numeric",
});

/** "4.99" (string venant de l'API) → "4,99 €" */
export function formatPrice(value: string | number): string {
	const n = typeof value === "string" ? Number.parseFloat(value) : value;
	return priceFormatter.format(Number.isFinite(n) ? n : 0);
}

/**
 * Comme `formatPrice`, mais pour le prix d'un prompt : "0" → "Gratuit".
 * Ne pas utiliser pour un solde ou un montant déjà payé (0 y est un montant
 * réel, pas "gratuit") — uniquement pour `Prompt.price`.
 */
export function formatPromptPrice(value: string | number): string {
	const n = typeof value === "string" ? Number.parseFloat(value) : value;
	if (Number.isFinite(n) && n === 0) return "Gratuit";
	return formatPrice(value);
}

/** ISO string → "4 août 2026" */
export function formatDate(value: string | null | undefined): string {
	if (!value) return "—";
	const d = new Date(value);
	return Number.isNaN(d.getTime()) ? "—" : dateFormatter.format(d);
}

/** "4.90" → "4.9" (une décimale, sans zéro superflu) */
export function formatRating(value: string | number): string {
	const n = typeof value === "string" ? Number.parseFloat(value) : value;
	if (!Number.isFinite(n) || n <= 0) return "Nouveau";
	return n.toFixed(1);
}

/** Compacte les grands nombres : 1200 → "1,2 k" */
export function formatCount(value: number): string {
	if (value < 1000) return String(value);
	return new Intl.NumberFormat("fr-FR", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(value);
}

export function initials(name: string): string {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? "")
		.join("");
}
