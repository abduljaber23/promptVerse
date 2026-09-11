import { Link } from "react-router-dom";
import { PlusCircle, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useMyPrompts } from "@/hooks/usePrompts";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatDate, formatPrice } from "@/common/lib/format";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { PromptGrid } from "@/components/prompt/PromptGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";

export function DashboardPage() {
	useDocumentTitle("Mon tableau de bord — PromptVerse");
	const { user } = useAuth();
	const { data: prompts, isLoading, isError, error } = useMyPrompts();

	const published = prompts?.length ?? 0;
	const totalSales =
		prompts?.reduce((acc, p) => acc + p.salesCount, 0) ?? 0;

	return (
		<div className="space-y-10">
			<header className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					{user ? (
						<UserAvatar
							username={user.username}
							avatarKey={user.profile?.avatar}
							size={56}
							className="text-base"
						/>
					) : null}
					<div>
						<h1 className="text-xl font-bold">
							Bonjour, {user?.username}
						</h1>
						<p className="text-sm text-base-content/55">
							Membre depuis {formatDate(user?.createdAt)}
						</p>
					</div>
				</div>
				<div className="flex gap-2">
					<Link
						to="/dashboard/purchases"
						className="btn btn-ghost btn-sm"
					>
						<ShoppingBag className="size-4" />
						Mes achats
					</Link>
					<Link
						to="/dashboard/prompts/new"
						className="btn btn-primary btn-sm"
					>
						<PlusCircle className="size-4" />
						Vendre un prompt
					</Link>
				</div>
			</header>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard label="Prompts publiés" value={published} />
				<StatCard label="Ventes cumulées" value={totalSales} />
				<StatCard
					label="Solde disponible"
					value={user ? formatPrice(user.balance) : "—"}
				/>
				<StatCard
					label="E-mail vérifié"
					value={user?.isEmailVerified ? "Oui" : "Non"}
				/>
			</div>

			<section className="space-y-4">
				<h2 className="text-lg font-semibold">Mes prompts en vente</h2>
				{isError ? (
					<Alert variant="error">{getApiErrorMessage(error)}</Alert>
				) : !isLoading && published === 0 ? (
					<EmptyState
						icon={ShoppingBag}
						title="Vous n'avez encore rien publié"
						description="Publiez votre premier prompt pour commencer à vendre."
						action={
							<Link
								to="/dashboard/prompts/new"
								className="btn btn-primary btn-sm"
							>
								Publier un prompt
							</Link>
						}
					/>
				) : (
					<PromptGrid
						prompts={prompts}
						isLoading={isLoading}
						skeletonCount={3}
					/>
				)}
			</section>

			{prompts && prompts.length > 0 ? (
				<section className="space-y-3">
					<h2 className="text-lg font-semibold">Détail des ventes</h2>
					<div className="overflow-x-auto rounded-box border border-base-content/10">
						<table className="table table-sm">
							<thead>
								<tr>
									<th>Prompt</th>
									<th>Prix</th>
									<th>Ventes</th>
									<th>Publié le</th>
								</tr>
							</thead>
							<tbody>
								{prompts.map((p) => (
									<tr key={p.id}>
										<td className="max-w-xs truncate">
											<Link
												to={`/prompts/${p.slug}`}
												className="link link-hover"
											>
												{p.title}
											</Link>
										</td>
										<td>{formatPrice(p.price)}</td>
										<td>{p.salesCount}</td>
										<td>{formatDate(p.createdAt)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			) : null}
		</div>
	);
}

function StatCard({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	return (
		<div className="rounded-box border border-base-content/10 bg-base-200/50 p-4">
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-base-content/55">{label}</p>
		</div>
	);
}
