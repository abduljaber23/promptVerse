import { API_BASE_URL } from "@/common/api/client";

const ASSETS_URL = (
	import.meta.env.VITE_ASSETS_URL ?? "http://localhost:8333/prompt-verse"
).replace(/\/$/, "");

/**
 * Résout une clé de stockage (`prompt-covers/xxx.png`, `prompt-previews/xxx.jpg`)
 * en URL affichable. Les objets sont servis directement par le bucket S3 / SeaweedFS.
 * Renvoie `null` si aucune clé — le composant affichera alors un placeholder.
 */
export function resolveAssetUrl(key: string | null | undefined): string | null {
	if (!key) return null;
	if (/^https?:\/\//i.test(key)) return key;
	return `${ASSETS_URL}/${key.replace(/^\//, "")}`;
}

/**
 * Les avatars, eux, sont streamés par l'API : `GET /users/avatar/:filename`.
 * La colonne stocke `avatars/uuid.png` → on ne garde que le nom de fichier.
 */
export function resolveAvatarUrl(
	key: string | null | undefined,
): string | null {
	if (!key) return null;
	if (/^https?:\/\//i.test(key)) return key;
	const filename = key.split("/").pop();
	return filename ? `${API_BASE_URL}/users/avatar/${filename}` : null;
}
