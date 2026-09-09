import axios from "axios";

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

/** Base URL brute de l'API (sans `/` final) — utile pour construire des URLs d'assets. */
export const API_BASE_URL = baseURL.replace(/\/$/, "");
