import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	page: number;
	hasNext: boolean;
	onPageChange: (page: number) => void;
	isFetching?: boolean;
}

export function Pagination({
	page,
	hasNext,
	onPageChange,
	isFetching,
}: PaginationProps) {
	const hasPrev = page > 1;
	if (!hasPrev && !hasNext) return null;

	return (
		<nav
			className="join mt-10 flex justify-center"
			aria-label="Pagination"
		>
			<button
				type="button"
				className="btn join-item btn-sm sm:btn-md"
				disabled={!hasPrev || isFetching}
				onClick={() => onPageChange(page - 1)}
			>
				<ChevronLeft className="size-4" />
				Précédent
			</button>
			<span className="btn join-item btn-sm pointer-events-none sm:btn-md">
				Page {page}
			</span>
			<button
				type="button"
				className="btn join-item btn-sm sm:btn-md"
				disabled={!hasNext || isFetching}
				onClick={() => onPageChange(page + 1)}
			>
				Suivant
				<ChevronRight className="size-4" />
			</button>
		</nav>
	);
}
