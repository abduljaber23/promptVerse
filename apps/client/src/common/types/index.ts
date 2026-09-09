import type {
	PromptStatus,
	UserRole,
	UserStatus,
} from "@/common/constants/roles";

/* ------------------------------------------------------------------ */
/* Utilisateur                                                          */
/* ------------------------------------------------------------------ */

export interface UserProfile {
	avatar: string | null;
	bio: string | null;
}

/** Forme renvoyée par `GET /users/me` et `PATCH /users/me` (safeUserResponse). */
export interface CurrentUser {
	id: string;
	username: string;
	email: string;
	isEmailVerified: boolean;
	lastLoginAt: string | null;
	profile: UserProfile | null;
	createdAt: string;
	updatedAt: string;
}

/** Forme complète renvoyée par les endpoints admin (`GET /admin/users`). */
export interface AdminUser {
	id: string;
	email: string;
	username: string;
	balance: string;
	role: UserRole;
	status: UserStatus;
	isEmailVerified: boolean;
	emailVerifiedAt: string | null;
	lastLoginAt: string | null;
	stripeOnboardingComplete: boolean;
	createdAt: string;
	updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

export interface Category {
	id: string;
	name: string;
	slug: string;
	iconUrl: string | null;
	deletedAt: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface AiTool {
	id: string;
	name: string;
	slug: string;
	iconUrl: string | null;
	deletedAt: string | null;
	createdAt: string;
	updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Prompts                                                             */
/* ------------------------------------------------------------------ */

export interface PreviewImage {
	id: string;
	url: string;
	sortOrder: number;
	promptId: string;
}

/**
 * Prompt tel que renvoyé par l'API. Les endpoints liste ne chargent PAS
 * les relations (seller/category/aiTool) : seuls les `*Id` sont présents.
 * `GET /prompts/:slug` ajoute `previewImages`.
 */
export interface Prompt {
	id: string;
	title: string;
	slug: string;
	promptContent: string;
	previewResult: string | null;
	coverImage: string | null;
	price: string;
	salesCount: number;
	viewsCount: number;
	favoritesCount: number;
	averageRating: string;
	isFeatured: boolean;
	status: PromptStatus;
	deletedAt: string | null;
	createdAt: string;
	updatedAt: string;
	sellerId: string;
	categoryId: string;
	aiToolId: string;
	previewImages?: PreviewImage[];
}

/* ------------------------------------------------------------------ */
/* Payloads                                                            */
/* ------------------------------------------------------------------ */

export interface RegisterPayload {
	username: string;
	email: string;
	password: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface ResetPasswordPayload {
	userId: string;
	resetPasswordToken: string;
	newPassword: string;
}

export interface UpdateProfilePayload {
	username?: string;
	email?: string;
	bio?: string;
}

export interface CreatePromptPayload {
	title: string;
	promptContent: string;
	previewResult?: string;
	price: number;
	categoryId: string;
	aiToolId: string;
	coverImage?: File | null;
	previewImages?: File[];
}

/** Réponse générique message-only de l'API. */
export interface MessageResponse {
	message: string;
}
