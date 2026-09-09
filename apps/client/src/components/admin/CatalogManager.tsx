import { useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { ArchiveRestore, Check, Pencil, Trash2, X } from "lucide-react";
import type { AiTool, Category } from "@/common/types";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { formatDate } from "@/common/lib/format";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type CatalogItem = Category | AiTool;

interface NameMutation {
	mutateAsync: (name: string) => Promise<unknown>;
	isPending: boolean;
}
interface EditMutation {
	mutateAsync: (input: { id: string; name: string }) => Promise<unknown>;
	isPending: boolean;
}
interface IdMutation {
	mutateAsync: (id: string) => Promise<unknown>;
	isPending: boolean;
}

interface CatalogManagerProps {
	singular: string;
	active: UseQueryResult<CatalogItem[]>;
	archived: UseQueryResult<CatalogItem[]>;
	create: NameMutation;
	update: EditMutation;
	remove: IdMutation;
	restore: IdMutation;
}

export function CatalogManager({
	singular,
	active,
	archived,
	create,
	update,
	remove,
	restore,
}: CatalogManagerProps) {
	const [name, setName] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingName, setEditingName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [toDelete, setToDelete] = useState<CatalogItem | null>(null);

	const run = async (fn: () => Promise<unknown>) => {
		setError(null);
		try {
			await fn();
		} catch (err) {
			setError(getApiErrorMessage(err));
		}
	};

	return (
		<div className="space-y-8">
			{error ? <Alert variant="error">{error}</Alert> : null}

			<form
				className="flex flex-wrap gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					const trimmed = name.trim();
					if (!trimmed) return;
					void run(async () => {
						await create.mutateAsync(trimmed);
						setName("");
					});
				}}
			>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={`Nom du nouveau ${singular}`}
					className="input input-bordered input-sm w-64 bg-base-100"
				/>
				<button
					type="submit"
					className="btn btn-primary btn-sm"
					disabled={create.isPending}
				>
					Ajouter
				</button>
			</form>

			<section className="space-y-3">
				<h2 className="text-sm font-semibold text-base-content/70">
					Actifs
				</h2>
				{active.isLoading ? (
					<Spinner />
				) : active.isError ? (
					<Alert variant="error">
						{getApiErrorMessage(active.error)}
					</Alert>
				) : (
					<div className="overflow-x-auto rounded-box border border-base-content/10">
						<table className="table table-sm">
							<thead>
								<tr>
									<th>Nom</th>
									<th>Slug</th>
									<th>Créé le</th>
									<th className="text-right">Actions</th>
								</tr>
							</thead>
							<tbody>
								{(active.data ?? []).map((item) => (
									<tr key={item.id}>
										<td>
											{editingId === item.id ? (
												<input
													value={editingName}
													onChange={(e) =>
														setEditingName(
															e.target.value,
														)
													}
													className="input input-xs input-bordered bg-base-100"
												/>
											) : (
												item.name
											)}
										</td>
										<td className="text-base-content/50">
											{item.slug}
										</td>
										<td className="text-base-content/50">
											{formatDate(item.createdAt)}
										</td>
										<td>
											<div className="flex justify-end gap-1">
												{editingId === item.id ? (
													<>
														<button
															type="button"
															className="btn btn-ghost btn-xs"
															disabled={
																update.isPending
															}
															onClick={() =>
																run(async () => {
																	await update.mutateAsync(
																		{
																			id: item.id,
																			name: editingName.trim(),
																		},
																	);
																	setEditingId(
																		null,
																	);
																})
															}
														>
															<Check className="size-3.5" />
														</button>
														<button
															type="button"
															className="btn btn-ghost btn-xs"
															onClick={() =>
																setEditingId(null)
															}
														>
															<X className="size-3.5" />
														</button>
													</>
												) : (
													<>
														<button
															type="button"
															className="btn btn-ghost btn-xs"
															onClick={() => {
																setEditingId(
																	item.id,
																);
																setEditingName(
																	item.name,
																);
															}}
														>
															<Pencil className="size-3.5" />
														</button>
														<button
															type="button"
															className="btn btn-ghost btn-xs text-error"
															onClick={() =>
																setToDelete(item)
															}
														>
															<Trash2 className="size-3.5" />
														</button>
													</>
												)}
											</div>
										</td>
									</tr>
								))}
								{(active.data ?? []).length === 0 ? (
									<tr>
										<td
											colSpan={4}
											className="text-center text-base-content/50"
										>
											Aucun élément.
										</td>
									</tr>
								) : null}
							</tbody>
						</table>
					</div>
				)}
			</section>

			<section className="space-y-3">
				<h2 className="text-sm font-semibold text-base-content/70">
					Archivés
				</h2>
				{archived.isLoading ? (
					<Spinner />
				) : (archived.data ?? []).length === 0 ? (
					<p className="text-sm text-base-content/50">
						Aucun élément archivé.
					</p>
				) : (
					<ul className="space-y-2">
						{(archived.data ?? []).map((item) => (
							<li
								key={item.id}
								className="flex items-center justify-between rounded-lg bg-base-200 px-3 py-2 text-sm"
							>
								<span className="text-base-content/60">
									{item.name}
								</span>
								<button
									type="button"
									className="btn btn-ghost btn-xs"
									disabled={restore.isPending}
									onClick={() =>
										run(() => restore.mutateAsync(item.id))
									}
								>
									<ArchiveRestore className="size-3.5" />
									Restaurer
								</button>
							</li>
						))}
					</ul>
				)}
			</section>

			<ConfirmDialog
				open={!!toDelete}
				title={`Archiver « ${toDelete?.name ?? ""} » ?`}
				description="L'élément sera archivé (suppression douce) et pourra être restauré."
				confirmLabel="Archiver"
				danger
				loading={remove.isPending}
				onConfirm={() =>
					run(async () => {
						if (toDelete) {
							await remove.mutateAsync(toDelete.id);
						}
						setToDelete(null);
					})
				}
				onClose={() => setToDelete(null)}
			/>
		</div>
	);
}
