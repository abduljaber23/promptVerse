import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Upload } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
	useDeleteAccount,
	useDeleteAvatar,
	useUpdateProfile,
	useUploadAvatar,
} from "@/hooks/useProfile";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { toast } from "@/common/store/toast.store";
import { FormField } from "@/components/ui/FormField";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const schema = z.object({
	username: z
		.string()
		.min(3, "3 caractères minimum.")
		.max(50, "50 caractères maximum."),
	email: z.string().min(1, "L'e-mail est requis.").email("E-mail invalide."),
	bio: z.string().max(500, "500 caractères maximum.").optional(),
});
type FormValues = z.infer<typeof schema>;

export function SettingsPage() {
	useDocumentTitle("Paramètres — PromptVerse");
	const navigate = useNavigate();
	const { user } = useAuth();
	const fileInput = useRef<HTMLInputElement>(null);

	const updateProfile = useUpdateProfile();
	const uploadAvatar = useUploadAvatar();
	const deleteAvatar = useDeleteAvatar();
	const deleteAccount = useDeleteAccount();

	const [confirmOpen, setConfirmOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		values: {
			username: user?.username ?? "",
			email: user?.email ?? "",
			bio: user?.profile?.bio ?? "",
		},
	});

	const onSubmit = handleSubmit(async (values) => {
		try {
			const res = await updateProfile.mutateAsync(values);
			toast.success(res.message);
		} catch (error) {
			toast.error(getApiErrorMessage(error));
		}
	});

	const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		try {
			await uploadAvatar.mutateAsync(file);
			toast.success("Avatar mis à jour.");
		} catch (error) {
			toast.error(getApiErrorMessage(error));
		}
	};

	const onDeleteAvatar = async () => {
		try {
			await deleteAvatar.mutateAsync();
			toast.success("Avatar retiré.");
		} catch (error) {
			toast.error(getApiErrorMessage(error));
		}
	};

	const onDeleteAccount = async () => {
		try {
			await deleteAccount.mutateAsync();
			navigate("/", { replace: true });
		} catch (error) {
			setConfirmOpen(false);
			toast.error(getApiErrorMessage(error));
		}
	};

	if (!user) return null;

	return (
		<div className="max-w-2xl space-y-10">
			<header>
				<h1 className="text-xl font-bold">Paramètres du compte</h1>
			</header>

			{/* Avatar */}
			<section className="flex items-center gap-5">
				<UserAvatar
					username={user.username}
					avatarKey={user.profile?.avatar}
					size={72}
					className="text-lg"
				/>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						className="btn btn-sm"
						onClick={() => fileInput.current?.click()}
						disabled={uploadAvatar.isPending}
					>
						<Upload className="size-4" />
						Changer l'avatar
					</button>
					{user.profile?.avatar ? (
						<button
							type="button"
							className="btn btn-ghost btn-sm"
							onClick={onDeleteAvatar}
							disabled={deleteAvatar.isPending}
						>
							<Trash2 className="size-4" />
							Retirer
						</button>
					) : null}
					<input
						ref={fileInput}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={onAvatarChange}
					/>
				</div>
			</section>

			{/* Profil */}
			<form onSubmit={onSubmit} className="space-y-5" noValidate>
				<FormField
					label="Nom d'utilisateur"
					htmlFor="username"
					required
					error={errors.username?.message}
				>
					<input
						id="username"
						className="input w-full bg-base-100"
						{...register("username")}
					/>
				</FormField>

				<FormField
					label="Adresse e-mail"
					htmlFor="email"
					required
					error={errors.email?.message}
					hint="Changer d'e-mail déclenche un nouvel e-mail de vérification."
				>
					<input
						id="email"
						type="email"
						className="input w-full bg-base-100"
						{...register("email")}
					/>
				</FormField>

				<FormField
					label="Bio"
					htmlFor="bio"
					error={errors.bio?.message}
				>
					<textarea
						id="bio"
						rows={4}
						className="textarea textarea-bordered w-full bg-base-100 text-sm"
						placeholder="Présentez-vous en quelques lignes…"
						{...register("bio")}
					/>
				</FormField>

				<button
					type="submit"
					className="btn btn-primary"
					disabled={isSubmitting || !isDirty}
				>
					{isSubmitting ? (
						<span className="loading loading-spinner loading-sm" />
					) : null}
					Enregistrer
				</button>
			</form>

			{/* Zone dangereuse */}
			<section className="rounded-box border border-error/30 bg-error/5 p-5">
				<h2 className="text-sm font-semibold text-error">
					Supprimer mon compte
				</h2>
				<p className="mt-1 text-xs text-base-content/60">
					Cette action est irréversible. Vos prompts publiés ne
					pourront plus être vendus.
				</p>
				<button
					type="button"
					className="btn btn-error btn-outline btn-sm mt-3"
					onClick={() => setConfirmOpen(true)}
				>
					Supprimer définitivement
				</button>
			</section>

			<ConfirmDialog
				open={confirmOpen}
				title="Supprimer votre compte ?"
				description="Toutes vos données seront supprimées. Cette action ne peut pas être annulée."
				confirmLabel="Oui, supprimer"
				danger
				loading={deleteAccount.isPending}
				onConfirm={onDeleteAccount}
				onClose={() => setConfirmOpen(false)}
			/>
		</div>
	);
}
