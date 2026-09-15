import { API_BASE_URL } from "@/common/api/client";

/**
 * Résout une clé de stockage (`avatars/xxx.png`, `prompt-covers/xxx.png`,
 * `prompt-previews/xxx.jpg`) en URL affichable. Les fichiers sont servis par
 * l'API elle-même (`GET /uploads/:folder/:filename`, voir StorageController).
 * Renvoie `null` si aucune clé — le composant affichera alors un placeholder.
 */
export function resolveAssetUrl(key: string | null | undefined): string | null {
	if (!key) return null;
	if (/^https?:\/\//i.test(key)) return key;
	return `${API_BASE_URL}/uploads/${key.replace(/^\//, "")}`;
}
