import { useState } from "react";
import { useAdminUsers, useMakeRole } from "@/hooks/useAdmin";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { UserRole } from "@/common/constants/roles";
import type { UserRole as UserRoleType } from "@/common/constants/roles";
import { getApiErrorMessage } from "@/common/lib/api-error";
import { formatDate } from "@/common/lib/format";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";

const ROLE_LABEL: Record<string, string> = {
	USER: "Utilisateur",
	ADMIN: "Admin",
	SUPER_ADMIN: "Super-admin",
};

const STATUS_BADGE: Record<string, string> = {
	ACTIVE: "badge-success",
	INACTIVE: "badge-ghost",
	BANNED: "badge-error",
};

export function AdminUsersPage() {
	useDocumentTitle("Utilisateurs — Admin PromptVerse");
	const { data, isLoading, isError, error } = useAdminUsers();
	const makeRole = useMakeRole();
	const [feedback, setFeedback] = useState<string | null>(null);

	const changeRole = async (userId: string, role: UserRoleType) => {
		setFeedback(null);
		try {
			await makeRole.mutateAsync({ userId, role });
			setFeedback("Rôle mis à jour.");
		} catch (err) {
			setFeedback(getApiErrorMessage(err));
		}
	};

	if (isLoading) return <Spinner />;
	if (isError) {
		return <Alert variant="error">{getApiErrorMessage(error)}</Alert>;
	}

	return (
		<div className="space-y-4">
			<p className="text-sm text-base-content/55">
				{data?.length ?? 0} utilisateur
				{(data?.length ?? 0) > 1 ? "s" : ""} inscrit
				{(data?.length ?? 0) > 1 ? "s" : ""}
			</p>

			{feedback ? <Alert variant="info">{feedback}</Alert> : null}

			<div className="overflow-x-auto rounded-box border border-base-content/10">
				<table className="table table-sm">
					<thead>
						<tr>
							<th>Utilisateur</th>
							<th>Statut</th>
							<th>Vérifié</th>
							<th>Inscrit le</th>
							<th>Rôle</th>
						</tr>
					</thead>
					<tbody>
						{(data ?? []).map((user) => (
							<tr key={user.id}>
								<td>
									<div className="font-medium">
										{user.username}
									</div>
									<div className="text-xs text-base-content/50">
										{user.email}
									</div>
								</td>
								<td>
									<span
										className={`badge badge-sm ${
											STATUS_BADGE[user.status] ??
											"badge-ghost"
										}`}
									>
										{user.status}
									</span>
								</td>
								<td>
									{user.isEmailVerified ? (
										<span className="text-success">✓</span>
									) : (
										<span className="text-base-content/40">
											—
										</span>
									)}
								</td>
								<td className="text-base-content/50">
									{formatDate(user.createdAt)}
								</td>
								<td>
									<select
										className="select select-xs select-bordered bg-base-100"
										value={user.role}
										disabled={makeRole.isPending}
										onChange={(e) =>
											changeRole(
												user.id,
												e.target.value as UserRoleType,
											)
										}
									>
										{Object.values(UserRole).map((role) => (
											<option key={role} value={role}>
												{ROLE_LABEL[role] ?? role}
											</option>
										))}
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className="text-xs text-base-content/45">
				La modification de rôle est réservée au super-admin (l'API
				renverra une erreur pour un simple admin).
			</p>
		</div>
	);
}
