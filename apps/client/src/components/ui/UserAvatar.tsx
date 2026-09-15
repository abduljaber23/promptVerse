import { useState } from "react";
import { cn } from "@/common/lib/cn";
import { resolveAssetUrl } from "@/common/lib/assets";
import { initials } from "@/common/lib/format";

interface UserAvatarProps {
	username: string;
	avatarKey?: string | null;
	size?: number;
	className?: string;
}

export function UserAvatar({
	username,
	avatarKey,
	size = 36,
	className,
}: UserAvatarProps) {
	const [failed, setFailed] = useState(false);
	const url = resolveAssetUrl(avatarKey);
	const showImage = url && !failed;

	return (
		<span
			className={cn(
				"inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-primary/15 text-xs font-semibold text-primary ring-1 ring-base-content/10",
				className,
			)}
			style={{ width: size, height: size }}
		>
			{showImage ? (
				<img
					src={url}
					alt={username}
					className="size-full object-cover"
					onError={() => setFailed(true)}
				/>
			) : (
				(initials(username) || "?").slice(0, 2)
			)}
		</span>
	);
}
