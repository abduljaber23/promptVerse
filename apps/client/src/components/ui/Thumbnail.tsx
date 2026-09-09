import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/common/lib/cn";

interface ThumbnailProps {
	src: string | null;
	alt: string;
	className?: string;
	rounded?: string;
}

/**
 * Image avec repli automatique : si la clé de stockage n'est pas résolvable
 * (bucket privé, objet absent…), on affiche un dégradé + icône plutôt qu'une
 * image cassée.
 */
export function Thumbnail({
	src,
	alt,
	className,
	rounded = "rounded-box",
}: ThumbnailProps) {
	const [failed, setFailed] = useState(false);
	const showImage = src && !failed;

	return (
		<div
			className={cn(
				"relative overflow-hidden bg-base-300",
				rounded,
				className,
			)}
		>
			{showImage ? (
				<img
					src={src}
					alt={alt}
					loading="lazy"
					className="size-full object-cover"
					onError={() => setFailed(true)}
				/>
			) : (
				<div className="grid size-full place-items-center bg-gradient-to-br from-base-200 to-base-300 text-base-content/25">
					<ImageIcon className="size-8" />
				</div>
			)}
		</div>
	);
}
