export function PromptCardSkeleton() {
	return (
		<div className="flex flex-col overflow-hidden rounded-box border border-base-content/10 bg-base-200/50">
			<div className="skeleton aspect-[16/10] w-full rounded-none" />
			<div className="flex flex-col gap-3 p-4">
				<div className="skeleton h-4 w-3/4" />
				<div className="skeleton h-3 w-1/2" />
				<div className="mt-2 flex items-center justify-between">
					<div className="skeleton h-5 w-16" />
					<div className="skeleton h-3 w-12" />
				</div>
			</div>
		</div>
	);
}

export function PromptGridSkeleton({ count = 8 }: { count?: number }) {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{Array.from({ length: count }, (_, i) => (
				<PromptCardSkeleton key={i} />
			))}
		</div>
	);
}
