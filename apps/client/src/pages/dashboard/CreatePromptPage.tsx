import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, Upload, X } from "lucide-react";
import { useCreatePrompt } from "@/hooks/usePrompts";
import { useAiTools, useCategories } from "@/hooks/useCatalog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { toast } from "@/common/store/toast.store";
import { FormField } from "@/components/ui/FormField";

const MAX_PREVIEWS = 10;

const schema = z.object({
	title: z
		.string()
		.min(3, "3 caractères minimum.")
		.max(255, "255 caractères maximum."),
	promptContent: z.string().min(1, "Le contenu du prompt est requis."),
	previewResult: z.string().max(5000).optional(),
	price: z
		.coerce
		.number({ invalid_type_error: "Prix invalide." })
		.min(0, "Le prix ne peut pas être négatif.")
		.max(99.99, "Prix maximum : 99,99 €."),
	categoryId: z.string().min(1, "Choisissez une catégorie."),
	aiToolId: z.string().min(1, "Choisissez un outil IA."),
});
type FormValues = z.infer<typeof schema>;

export function CreatePromptPage() {
	useDocumentTitle("Vendre un prompt — PromptVerse");
	const navigate = useNavigate();
	const categories = useCategories();
	const aiTools = useAiTools();
	const createPrompt = useCreatePrompt();

	const [coverImage, setCoverImage] = useState<File | null>(null);
	const [previewImages, setPreviewImages] = useState<File[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({ resolver: zodResolver(schema) });

	const onCover = (e: ChangeEvent<HTMLInputElement>) => {
		setCoverImage(e.target.files?.[0] ?? null);
	};

	const onPreviews = (e: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []);
		setPreviewImages((prev) => [...prev, ...files].slice(0, MAX_PREVIEWS));
		e.target.value = "";
	};

	const removePreview = (index: number) => {
		setPreviewImages((prev) => prev.filter((_, i) => i !== index));
	};

	const onSubmit = handleSubmit(async (values) => {
		try {
			const created = await createPrompt.mutateAsync({
				title: values.title,
				promptContent: values.promptContent,
				previewResult: values.previewResult || undefined,
				price: Number(values.price),
				categoryId: values.categoryId,
				aiToolId: values.aiToolId,
				coverImage,
				previewImages,
			});
			toast.success("Prompt publié.");
			navigate(`/prompts/${created.slug}`);
		} catch (error) {
			toast.error(getApiErrorMessage(error));
		}
	});

	return (
		<div className="max-w-2xl space-y-6">
			<header>
				<h1 className="text-xl font-bold">Publier un nouveau prompt</h1>
				<p className="text-sm text-base-content/55">
					Le contenu exact du prompt restera masqué pour les visiteurs
					jusqu'à l'achat.
				</p>
			</header>

			<form onSubmit={onSubmit} className="space-y-5" noValidate>
				<FormField
					label="Titre du prompt"
					htmlFor="title"
					required
					error={errors.title?.message}
				>
					<input
						id="title"
						className="input w-full bg-base-100"
						placeholder="ex : Générateur de fiches produit e-commerce"
						{...register("title")}
					/>
				</FormField>

				<div className="grid gap-5 sm:grid-cols-2">
					<FormField
						label="Catégorie"
						htmlFor="categoryId"
						required
						error={errors.categoryId?.message}
					>
						<select
							id="categoryId"
							className="select select-bordered w-full bg-base-100"
							defaultValue=""
							{...register("categoryId")}
						>
							<option value="" disabled>
								Sélectionner…
							</option>
							{(categories.data ?? []).map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>
					</FormField>

					<FormField
						label="Outil IA compatible"
						htmlFor="aiToolId"
						required
						error={errors.aiToolId?.message}
					>
						<select
							id="aiToolId"
							className="select select-bordered w-full bg-base-100"
							defaultValue=""
							{...register("aiToolId")}
						>
							<option value="" disabled>
								Sélectionner…
							</option>
							{(aiTools.data ?? []).map((t) => (
								<option key={t.id} value={t.id}>
									{t.name}
								</option>
							))}
						</select>
					</FormField>
				</div>

				<FormField
					label="Prix (€)"
					htmlFor="price"
					required
					error={errors.price?.message}
					hint="Entre 0 et 99,99 €"
				>
					<input
						id="price"
						type="number"
						step="0.01"
						min="0"
						max="99.99"
						className="input w-full max-w-[160px] bg-base-100"
						placeholder="4.99"
						{...register("price")}
					/>
				</FormField>

				<FormField
					label="Contenu exact du prompt"
					htmlFor="promptContent"
					required
					error={errors.promptContent?.message}
					hint="Confidentiel — visible uniquement par les acheteurs."
				>
					<textarea
						id="promptContent"
						rows={6}
						className="textarea textarea-bordered w-full bg-base-100 font-mono text-sm"
						placeholder="Saisissez ici les instructions exactes que l'acheteur copiera…"
						{...register("promptContent")}
					/>
				</FormField>

				<FormField
					label="Exemple de résultat (optionnel)"
					htmlFor="previewResult"
					error={errors.previewResult?.message}
				>
					<textarea
						id="previewResult"
						rows={4}
						className="textarea textarea-bordered w-full bg-base-100 text-sm"
						placeholder="Un aperçu du texte obtenu avec ce prompt…"
						{...register("previewResult")}
					/>
				</FormField>

				<FormField label="Image de couverture (optionnel)" htmlFor="cover">
					<label className="flex min-w-0 cursor-pointer items-center gap-3 rounded-box border border-dashed border-base-content/20 bg-base-100 p-4 text-sm text-base-content/60 hover:border-primary/40">
						<Upload className="size-5 shrink-0" />
						<span className="truncate">
							{coverImage ? coverImage.name : "Choisir une image…"}
						</span>
						<input
							id="cover"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={onCover}
						/>
					</label>
				</FormField>

				<FormField
					label={`Images de démonstration (${previewImages.length}/${MAX_PREVIEWS})`}
					htmlFor="previews"
				>
					<label className="flex min-w-0 cursor-pointer items-center gap-3 rounded-box border border-dashed border-base-content/20 bg-base-100 p-4 text-sm text-base-content/60 hover:border-primary/40">
						<ImagePlus className="size-5 shrink-0" />
						<span className="truncate">Ajouter des images…</span>
						<input
							id="previews"
							type="file"
							accept="image/*"
							multiple
							className="hidden"
							onChange={onPreviews}
						/>
					</label>
					{previewImages.length > 0 ? (
						<ul className="mt-2 space-y-1">
							{previewImages.map((file, index) => (
								<li
									key={`${file.name}-${index}`}
									className="flex items-center justify-between rounded-lg bg-base-200 px-3 py-1.5 text-xs"
								>
									<span className="truncate">{file.name}</span>
									<button
										type="button"
										onClick={() => removePreview(index)}
										className="btn btn-ghost btn-xs"
										aria-label="Retirer"
									>
										<X className="size-3" />
									</button>
								</li>
							))}
						</ul>
					) : null}
				</FormField>

				<div className="flex justify-end gap-3 pt-2">
					<button
						type="button"
						className="btn btn-ghost"
						onClick={() => navigate(-1)}
					>
						Annuler
					</button>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<span className="loading loading-spinner loading-sm" />
						) : null}
						Publier le prompt
					</button>
				</div>
			</form>
		</div>
	);
}
