import axios from "axios";
import { useAuthStore } from "@/common/store/auth.store";

const baseURL =
	import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

/**
 * Instance axios partagée.
 * `withCredentials` est indispensable : l'API pose un cookie httpOnly
 * `access_token` que le navigateur renvoie automatiquement.
 */
export const api = axios.create({
	baseURL,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

/**
 * Une 401 signifie que le cookie de session n'est plus valable : on réinitialise
 * le store d'auth pour que les routes protégées redirigent vers /login.
 * (Le rejet est propagé : chaque appelant garde la main sur son message d'erreur.)
 */
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			useAuthStore.getState().reset();
		}
		return Promise.reject(error);
	},
);

/** Base URL brute de l'API (sans `/` final) — utile pour construire des URLs d'assets. */
export const API_BASE_URL = baseURL.replace(/\/$/, "");
