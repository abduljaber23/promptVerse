import { clsx, type ClassValue } from "clsx";

/** Concatène des classes conditionnelles (wrapper mince autour de clsx). */
export function cn(...inputs: ClassValue[]): string {
	return clsx(inputs);
}
