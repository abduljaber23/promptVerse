import { useEffect } from "react";

/** Met à jour le <title> de la page pendant que le composant est monté. */
export function useDocumentTitle(title: string) {
	useEffect(() => {
		const previous = document.title;
		document.title = title;
		return () => {
			document.title = previous;
		};
	}, [title]);
}
