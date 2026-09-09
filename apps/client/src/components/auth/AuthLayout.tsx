import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
	title: string;
	subtitle?: string;
	children: ReactNode;
	footer?: ReactNode;
}

export function AuthLayout({
	title,
	subtitle,
	children,
	footer,
}: AuthLayoutProps) {
	return (
		<div className="relative flex min-h-screen items-center justify-center bg-base-100 px-4 py-16">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(620px_260px_at_50%_0%,rgba(0,119,255,0.12),transparent_70%)]"
			/>
			<div className="relative w-full max-w-md rounded-box border border-base-content/10 bg-base-200/60 p-8 shadow-xl backdrop-blur">
				<Link
					to="/"
					className="block text-center text-xl font-bold tracking-tight"
				>
					<span className="text-primary">Prompt</span>Verse
				</Link>
				<h1 className="mt-4 text-center text-xl font-semibold">
					{title}
				</h1>
				{subtitle ? (
					<p className="mt-2 text-center text-sm text-base-content/60">
						{subtitle}
					</p>
				) : null}
				<div className="mt-6">{children}</div>
				{footer ? (
					<p className="mt-6 text-center text-sm text-base-content/60">
						{footer}
					</p>
				) : null}
			</div>
		</div>
	);
}
