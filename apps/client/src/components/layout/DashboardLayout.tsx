import { NavLink, Outlet } from "react-router-dom";
import {
	LayoutDashboard,
	PlusCircle,
	Settings,
	ShoppingBag,
} from "lucide-react";
import { cn } from "@/common/lib/cn";
import { Container } from "./Container";

const ITEMS = [
	{ to: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, end: true },
	{
		to: "/dashboard/prompts/new",
		label: "Vendre un prompt",
		icon: PlusCircle,
		end: false,
	},
	{
		to: "/dashboard/purchases",
		label: "Mes achats",
		icon: ShoppingBag,
		end: false,
	},
	{ to: "/dashboard/settings", label: "Paramètres", icon: Settings, end: false },
];

export function DashboardLayout() {
	return (
		<Container size="wide" className="py-8 lg:py-12">
			<div className="grid gap-8 lg:grid-cols-[220px_1fr]">
				<aside className="lg:sticky lg:top-24 lg:self-start">
					<nav className="flex gap-1 overflow-x-auto lg:flex-col">
						{ITEMS.map(({ to, label, icon: Icon, end }) => (
							<NavLink
								key={to}
								to={to}
								end={end}
								className={({ isActive }) =>
									cn(
										"flex items-center gap-2 rounded-btn px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
										isActive
											? "bg-primary/10 text-primary"
											: "text-base-content/60 hover:bg-base-content/5 hover:text-base-content",
									)
								}
							>
								<Icon className="size-4" />
								{label}
							</NavLink>
						))}
					</nav>
				</aside>
				<div className="min-w-0">
					<Outlet />
				</div>
			</div>
		</Container>
	);
}
