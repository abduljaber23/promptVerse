import { NavLink, Outlet } from "react-router-dom";
import { FolderTree, Users, Wrench } from "lucide-react";
import { cn } from "@/common/lib/cn";
import { Container } from "./Container";

const ITEMS = [
	{ to: "/admin/users", label: "Utilisateurs", icon: Users },
	{ to: "/admin/categories", label: "Catégories", icon: FolderTree },
	{ to: "/admin/ai-tools", label: "Outils IA", icon: Wrench },
];

export function AdminLayout() {
	return (
		<Container size="wide" className="py-8 lg:py-12">
			<header className="mb-6">
				<h1 className="text-2xl font-bold">Administration</h1>
				<p className="text-sm text-base-content/55">
					Gestion des utilisateurs et du catalogue.
				</p>
			</header>
			<div className="tabs tabs-boxed mb-8 w-fit bg-base-200">
				{ITEMS.map(({ to, label, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							cn("tab gap-2", isActive && "tab-active")
						}
					>
						<Icon className="size-4" />
						{label}
					</NavLink>
				))}
			</div>
			<Outlet />
		</Container>
	);
}
