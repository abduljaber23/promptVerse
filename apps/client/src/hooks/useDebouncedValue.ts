import { useEffect, useState } from "react";

/** Renvoie `value` avec un retard de `delay` ms (utile pour les champs de recherche). */
export function useDebouncedValue<T>(value: T, delay = 300): T {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const id = window.setTimeout(() => setDebounced(value), delay);
		return () => window.clearTimeout(id);
	}, [value, delay]);

	return debounced;
}
