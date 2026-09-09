import axios from "axios";

/**
 * Dictionnaire des codes d'erreur métier renvoyés par l'API
 * (`throw new XxxException({ code: ErrorCodes.* })`).
 */
const ERROR_MESSAGES: Record<string, string> = {
	// Auth
	EMAIL_ALREADY_EXISTS: "Cette adresse e-mail est déjà utilisée.",
	USERNAME_ALREADY_EXISTS: "Ce nom d'utilisateur est déjà pris.",
	USERNAME_ALREADY_IN_USE: "Ce nom d'utilisateur est déjà pris.",
	INVALID_CREDENTIALS: "E-mail ou mot de passe incorrect.",
	EMAIL_VERIFICATION_SENT:
		"Votre e-mail n'est pas encore vérifié. Un nouveau lien vient de vous être envoyé.",
	EMAIL_NOT_VERIFIED:
		"Votre adresse e-mail n'est pas vérifiée. Consultez votre boîte de réception.",
	VERIFICATION_TOKEN_NOT_FOUND: "Lien de vérification introuvable.",
	INVALID_LINK: "Ce lien n'est plus valide.",
	TOKEN_EXPIRED: "Ce lien a expiré. Demandez-en un nouveau.",
	NO_TOKEN_PROVIDED: "Vous devez être connecté pour effectuer cette action.",
	INVALID_TOKEN: "Votre session a expiré. Reconnectez-vous.",
	ACCESS_DENIED: "Vous n'avez pas les droits nécessaires.",
	// Users
	USER_NOT_FOUND: "Utilisateur introuvable.",
	NO_PROFILE_AVATAR: "Aucun avatar à supprimer.",
	NO_FILE_PROVIDED: "Aucun fichier fourni.",
	// Storage
	FILE_UPLOAD_FAILED: "L'envoi du fichier a échoué.",
	FILE_DELETE_FAILED: "La suppression du fichier a échoué.",
	FILE_NOT_FOUND: "Fichier introuvable.",
	UNSUPPORTED_FILE_TYPE: "Type de fichier non pris en charge.",
	// Mail
	EMAIL_SEND_FAILED: "L'envoi de l'e-mail a échoué.",
	// AI Tools
	AI_TOOL_ALREADY_EXISTS: "Cet outil IA existe déjà.",
	AI_TOOL_NOT_FOUND: "Outil IA introuvable.",
	AI_TOOL_ARCHIVED: "Cet outil IA est archivé.",
	AI_TOOL_NOT_ARCHIVED: "Cet outil IA n'est pas archivé.",
	// Categories
	CATEGORY_ALREADY_EXISTS: "Cette catégorie existe déjà.",
	CATEGORY_NOT_FOUND: "Catégorie introuvable.",
	CATEGORY_ARCHIVED: "Cette catégorie est archivée.",
	CATEGORY_NOT_ARCHIVED: "Cette catégorie n'est pas archivée.",
	// Prompts
	PROMPT_NOT_FOUND: "Ce prompt est introuvable.",
	// Throttler
	ThrottlerException: "Trop de tentatives. Patientez quelques instants.",
};

interface ApiErrorBody {
	code?: string;
	message?: string | string[];
	error?: string;
	statusCode?: number;
}

/**
 * Transforme une erreur (axios ou autre) en message lisible en français.
 */
export function getApiErrorMessage(
	error: unknown,
	fallback = "Une erreur est survenue. Veuillez réessayer.",
): string {
	if (axios.isAxiosError(error)) {
		if (error.code === "ERR_NETWORK") {
			return "Impossible de joindre le serveur. Vérifiez que l'API est démarrée.";
		}

		const data = error.response?.data as ApiErrorBody | undefined;

		if (data?.code) {
			return ERROR_MESSAGES[data.code] ?? data.code;
		}
		if (Array.isArray(data?.message) && data.message.length > 0) {
			return data.message[0];
		}
		if (typeof data?.message === "string" && data.message.length > 0) {
			return ERROR_MESSAGES[data.message] ?? data.message;
		}
		if (error.response?.status === 429) {
			return ERROR_MESSAGES.ThrottlerException;
		}
	}

	if (error instanceof Error && error.message) {
		return error.message;
	}

	return fallback;
}

/** Retourne le statut HTTP d'une erreur axios, ou `undefined`. */
export function getStatus(error: unknown): number | undefined {
	return axios.isAxiosError(error) ? error.response?.status : undefined;
}
