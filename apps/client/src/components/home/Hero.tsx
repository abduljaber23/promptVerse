import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function Hero() {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		const q = query.trim();
		navigate(q ? `/prompts?q=${encodeURIComponent(q)}` : "/prompts");
	};

	return (
		<section className="relative overflow-hidden border-b border-base-content/10">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(560px_240px_at_50%_0%,rgba(0,119,255,0.14),transparent_70%)]"
			/>
			<Container className="relative py-20 text-center sm:py-24">
				<p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
					Marketplace de prompts IA
				</p>
				<h1 className="mx-auto mt-4 max-w-2xl text-balance text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
					Les meilleurs prompts pour booster votre productivité
				</h1>
				<p className="mx-auto mt-4 max-w-xl text-base text-base-content/60 sm:text-lg">
					Achetez et vendez des prompts optimisés et pré-testés pour
					ChatGPT, Midjourney, Claude et Stable Diffusion.
				</p>
				<form
					onSubmit={onSubmit}
					className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
				>
					<label className="input flex-1 items-center gap-2 bg-base-200">
						<Search className="size-4 text-base-content/50" />
						<input
							type="search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="ex : rédacteur SEO, logo 3D néon…"
							className="grow"
						/>
					</label>
					<button type="submit" className="btn btn-primary">
						Explorer
					</button>
				</form>
			</Container>
		</section>
	);
}
