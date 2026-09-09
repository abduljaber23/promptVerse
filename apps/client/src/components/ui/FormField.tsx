import type { ReactNode } from "react";
import { cn } from "@/common/lib/cn";

interface FormFieldProps {
	label: string;
	htmlFor?: string;
	error?: string;
	hint?: ReactNode;
	required?: boolean;
	children: ReactNode;
	className?: string;
}

export function FormField({
	label,
	htmlFor,
	error,
	hint,
	required,
	children,
	className,
}: FormFieldProps) {
	return (
		<div className={cn("form-control w-full", className)}>
			<label htmlFor={htmlFor} className="label">
				<span className="label-text font-medium">
					{label}
					{required ? (
						<span className="ml-0.5 text-error">*</span>
					) : null}
				</span>
			</label>
			{children}
			{error ? (
				<p className="mt-1 text-xs text-error">{error}</p>
			) : hint ? (
				<p className="mt-1 text-xs text-base-content/55">{hint}</p>
			) : null}
		</div>
	);
}
