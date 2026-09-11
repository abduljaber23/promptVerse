import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
	ArrowLeft,
	CheckCircle2,
	Eye,
	Lock,
	ShoppingCart,
	TrendingUp,
} from "lucide-react";
import { usePromptBySlug } from "@/hooks/usePrompts";
import { useCreateCheckoutSession } from "@/hooks/usePurchases";
import { useCatalogMaps } from "@/hooks/useCatalog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useAuth } from "@/context/AuthContext";
import { getApiErrorMessage, getStatus } from "@/common/lib/api-error";
import { resolveAssetUrl } from "@/common/lib/assets";
import { formatCount, formatPrice } from "@/common/lib/format";
import { toast } from "@/common/store/toast.store";
import { Container } from "@/components/layout/Container";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { RatingStars } from "@/components/ui/RatingStars";
import { Alert } from "@/components/ui/Alert";
import { PageLoader } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";

export function PromptDetailPage() {
	const { slug } = useParams<{ slug: string }>();
	const { data: prompt, isLoading, isError, error } = usePromptBySlug(slug);
	const { aiToolById, categoryById } = useCatalogMaps();
	const { isAuthenticated, user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const createCheckoutSession = useCreateCheckoutSession();
	const [activeImage, setActiveImage] = useState(0);

	useDocumentTitle(
		prompt ? `${prompt.title} — PromptVerse` : "Prompt — PromptVerse",
	);

	const images = useMemo(() => {
		if (!prompt) return [] as string[];
		const previews = [...(prompt.previewImages ?? [])]
			.sort((a, b) => a.sortOrder - b.sortOrder)
			.map((img) => resolveAssetUrl(img.url))
			.filter((url): url is string => Boolean(url));
		const cover = resolveAssetUrl(prompt.coverImage);
		return cover ? [cover, ...previews] : previews;
	}, [prompt]);

	if (isLoading) return <PageLoader label="Chargement du prompt…" />;

	if (isError || !prompt) {
		const notFound = getStatus(error) === 404;
		return (
			<Container size="narrow" className="py-16">
				{notFound ? (
					<EmptyState
						icon={Lock}
						title="Prompt introuvable"
						description="Ce prompt n'existe pas ou n'est plus publié."
						action={
							<Link to="/prompts" className="btn btn-primary btn-sm">
								Retour au catalogue
							</Link>
						}
					/>
				) : (
					<Alert variant="error">{getApiErrorMessage(error)}</Alert>
				)}
			</Container>
		);
	}

	const category = categoryById.get(prompt.categoryId);
	const aiTool = aiToolById.get(prompt.aiToolId);
	const isOwner = isAuthenticated && user?.id === prompt.sellerId;
	const hasAccess = isOwner || Boolean(prompt.isPurchasedByCurrentUser);
	const promptId = prompt.id;

	async function handleBuyClick() {
		if (!isAuthenticated) {
			navigate("/login", { state: { from: location.pathname } });
			return;
		}

		try {
			const { url } = await createCheckoutSession.mutateAsync(promptId);
			window.location.href = url;
		} catch (err) {
			toast.error(getApiErrorMessage(err));
		}
	}

	return (
		<Container size="wide" className="py-8">
			<Link
				to="/prompts"
				className="inline-flex items-center gap-1.5 text-sm text-base-content/60 hover:text-base-content"
			>
				<ArrowLeft className="size-4" />
				Retour au catalogue
			</Link>

			<div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
				{/* Colonne principale */}
				<div className="space-y-8">
					<div className="space-y-3">
						<div className="flex flex-wrap gap-2">
							{aiTool ? (
								<span className="badge badge-primary badge-outline">
									{aiTool.name}
								</span>
							) : null}
							{category ? (
								<span className="badge badge-outline">
									{category.name}
								</span>
							) : null}
						</div>
						<h1 className="text-2xl font-bold sm:text-3xl">
							{prompt.title}
						</h1>
						<div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60">
							<RatingStars
								value={prompt.averageRating}
								count={prompt.salesCount}
							/>
							<span className="inline-flex items-center gap-1">
								<TrendingUp className="size-4" />
								{formatCount(prompt.salesCount)} ventes
							</span>
							<span className="inline-flex items-center gap-1">
								<Eye className="size-4" />
								{formatCount(prompt.viewsCount)} vues
							</span>
						</div>
					</div>

					{/* Galerie */}
					<div className="space-y-3">
						<Thumbnail
							src={images[activeImage] ?? null}
							alt={prompt.title}
							className="aspect-[16/10] w-full"
						/>
						{images.length > 1 ? (
							<div className="flex gap-3 overflow-x-auto pb-1">
								{images.map((img, index) => (
									<button
										key={img}
										type="button"
										onClick={() => setActiveImage(index)}
										className={`shrink-0 overflow-hidden rounded-lg ring-2 transition ${
											index === activeImage
												? "ring-primary"
												: "ring-transparent opacity-70 hover:opacity-100"
										}`}
									>
										<Thumbnail
											src={img}
											alt={`Aperçu ${index + 1}`}
											rounded="rounded-lg"
											className="size-20"
										/>
									</button>
								))}
							</div>
						) : null}
					</div>

					{/* Exemple de résultat */}
					{prompt.previewResult ? (
						<section className="space-y-3">
							<h2 className="text-lg font-semibold">
								Exemple de résultat
							</h2>
							<div className="whitespace-pre-wrap rounded-box border border-base-content/10 bg-base-200/50 p-4 text-sm leading-relaxed text-base-content/80">
								{prompt.previewResult}
							</div>
						</section>
					) : null}

					{/* Contenu du prompt : en clair si débloqué, verrouillé sinon */}
					<section className="space-y-3">
						<h2 className="text-lg font-semibold">
							Le prompt exact
						</h2>
						{hasAccess ? (
							<div className="whitespace-pre-wrap rounded-box border border-base-content/10 bg-base-200/50 p-4 text-sm leading-relaxed text-base-content/80">
								{prompt.promptContent}
							</div>
						) : (
							<div className="rounded-box border border-base-content/10 bg-base-200/50 p-10">
								<div className="flex flex-col items-center gap-2 text-center">
									<span className="grid size-11 place-items-center rounded-full bg-primary/15 text-primary">
										<Lock className="size-5" />
									</span>
									<p className="text-sm font-medium">
										Contenu réservé aux acheteurs
									</p>
									<p className="max-w-xs text-xs text-base-content/55">
										Achetez ce prompt pour débloquer le texte
										exact, prêt à copier-coller.
									</p>
								</div>
							</div>
						)}
					</section>
				</div>

				{/* Bloc achat */}
				<aside className="lg:sticky lg:top-24 lg:self-start">
					<div className="rounded-box border border-base-content/10 bg-base-200/50 p-6">
						<p className="text-3xl font-bold text-success">
							{formatPrice(prompt.price)}
						</p>
						<p className="mt-1 text-xs text-base-content/55">
							Accès immédiat après paiement.
						</p>

						{isOwner ? (
							<div className="badge badge-outline mt-5 w-full py-3">
								Votre prompt
							</div>
						) : hasAccess ? (
							<div className="alert alert-success mt-5 py-3 text-sm">
								<CheckCircle2 className="size-4" />
								Déjà débloqué
							</div>
						) : (
							<button
								type="button"
								className="btn btn-primary mt-5 w-full"
								disabled={createCheckoutSession.isPending}
								onClick={() => void handleBuyClick()}
							>
								{createCheckoutSession.isPending ? (
									<span className="loading loading-spinner loading-sm" />
								) : (
									<ShoppingCart className="size-4" />
								)}
								Acheter
							</button>
						)}

						<ul className="mt-5 space-y-2 border-t border-base-content/10 pt-4 text-xs text-base-content/60">
							<li>• Texte du prompt copiable</li>
							<li>• Exemple de résultat inclus</li>
							<li>• Mises à jour gratuites de l'auteur</li>
						</ul>
					</div>
				</aside>
			</div>
		</Container>
	);
}
