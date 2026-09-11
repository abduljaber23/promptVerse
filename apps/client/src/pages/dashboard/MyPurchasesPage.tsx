import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useMyPurchases } from "@/hooks/usePurchases";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatDate, formatPrice } from "@/common/lib/format";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import { PageLoader } from "@/components/ui/Spinner";

export function MyPurchasesPage() {
	useDocumentTitle("Mes achats — PromptVerse");
	const { data: purchases, isLoading, isError, error } = useMyPurchases();

	if (isLoading) return <PageLoader label="Chargement de vos achats…" />;

	if (isError) {
		return <Alert variant="error">{getApiErrorMessage(error)}</Alert>;
	}

	if (!purchases || purchases.length === 0) {
		return (
			<EmptyState
				icon={ShoppingBag}
				title="Aucun achat pour le moment"
				description="Les prompts que vous achetez apparaîtront ici, avec un accès permanent au contenu."
				action={
					<Link to="/prompts" className="btn btn-primary btn-sm">
						Parcourir le catalogue
					</Link>
				}
			/>
		);
	}

	return (
		<div className="space-y-4">
			<h1 className="text-lg font-semibold">Mes achats</h1>
			<div className="overflow-x-auto rounded-box border border-base-content/10">
				<table className="table table-sm">
					<thead>
						<tr>
							<th>Prompt</th>
							<th>Prix payé</th>
							<th>Acheté le</th>
						</tr>
					</thead>
					<tbody>
						{purchases.map((purchase) => (
							<tr key={purchase.id}>
								<td className="max-w-xs truncate">
									<Link
										to={`/prompts/${purchase.prompt.slug}`}
										className="link link-hover"
									>
										{purchase.prompt.title}
									</Link>
								</td>
								<td>{formatPrice(purchase.amount)}</td>
								<td>{formatDate(purchase.createdAt)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
