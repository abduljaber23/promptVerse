import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock } from "lucide-react";
import { usePurchaseBySessionId } from "@/hooks/usePurchases";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { Container } from "@/components/layout/Container";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";

const POLL_TIMEOUT_MS = 15_000;

export function PurchaseSuccessPage() {
	useDocumentTitle("Paiement — PromptVerse");
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get("session_id") ?? undefined;
	const [timedOut, setTimedOut] = useState(false);

	const {
		data: purchase,
		isLoading,
		isError,
		error,
		refetch,
	} = usePurchaseBySessionId(sessionId);

	useEffect(() => {
		if (purchase && purchase.status !== "PENDING") return;
		const timer = setTimeout(() => setTimedOut(true), POLL_TIMEOUT_MS);
		return () => clearTimeout(timer);
	}, [purchase]);

	if (!sessionId) {
		return (
			<Container size="narrow" className="py-16">
				<Alert variant="error">
					Session de paiement introuvable dans l'URL.
				</Alert>
			</Container>
		);
	}

	if (isError) {
		return (
			<Container size="narrow" className="py-16">
				<Alert variant="error">{getApiErrorMessage(error)}</Alert>
			</Container>
		);
	}

	if (isLoading || !purchase || purchase.status === "PENDING") {
		if (timedOut) {
			return (
				<Container size="narrow" className="py-16">
					<EmptyState
						icon={Clock}
						title="Ça prend plus de temps que prévu"
						description="Le paiement est peut-être déjà validé côté Stripe — vérifiez à nouveau, ou consultez « Mes achats » dans quelques instants."
						action={
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => {
									setTimedOut(false);
									void refetch();
								}}
							>
								Vérifier à nouveau
							</button>
						}
					/>
				</Container>
			);
		}

		return (
			<Container size="narrow" className="py-16">
				<EmptyState
					icon={Clock}
					title="Traitement du paiement…"
					description="Stripe confirme votre transaction, ça ne prend que quelques secondes."
				/>
			</Container>
		);
	}

	if (purchase.status === "FAILED") {
		return (
			<Container size="narrow" className="py-16">
				<Alert variant="error">
					Le paiement n'a pas abouti. Vous pouvez réessayer depuis la
					page du prompt.
				</Alert>
				<Link
					to={`/prompts/${purchase.prompt.slug}`}
					className="btn btn-primary mt-6"
				>
					Retour au prompt
				</Link>
			</Container>
		);
	}

	return (
		<Container size="narrow" className="py-16">
			<EmptyState
				icon={CheckCircle2}
				title="Paiement confirmé !"
				description={`"${purchase.prompt.title}" est débloqué, prêt à copier-coller.`}
				action={
					<Link
						to={`/prompts/${purchase.prompt.slug}`}
						className="btn btn-primary"
					>
						Voir le prompt
					</Link>
				}
			/>
		</Container>
	);
}
