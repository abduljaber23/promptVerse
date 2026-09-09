// `erasableSyntaxOnly` interdit les `enum` TS : on utilise des objets `as const`.

export const UserRole = {
	USER: "USER",
	ADMIN: "ADMIN",
	SUPER_ADMIN: "SUPER_ADMIN",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserStatus = {
	INACTIVE: "INACTIVE",
	ACTIVE: "ACTIVE",
	BANNED: "BANNED",
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const PromptStatus = {
	PUBLISHED: "PUBLISHED",
	ARCHIVED: "ARCHIVED",
} as const;
export type PromptStatus = (typeof PromptStatus)[keyof typeof PromptStatus];

export const ADMIN_ROLES: readonly UserRole[] = [
	UserRole.ADMIN,
	UserRole.SUPER_ADMIN,
];
