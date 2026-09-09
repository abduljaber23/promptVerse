import { useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
	LayoutDashboard,
	LogOut,
	Menu,
	PlusCircle,
	Search,
	Settings,
	Shield,
} from "lucide-react";
import { cn } from "@/common/lib/cn";
import { useAuth } from "@/context/AuthContext";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { UserAvatar } from "@/components/ui/UserAvatar";

const NAV_LINKS = [
	{ to: "/prompts", label: "Catalogue" },
	{ to: "/dashboard/prompts/new", label: "Vendre" },
];

export function Navbar() {
	const navigate = useNavigate();
	const { isAuthenticated, user, isAdmin, logout } = useAuth();
	const [search, setSearch] = useState("");

	const onSearch = (event: FormEvent) => {
		event.preventDefault();
		const q = search.trim();
		navigate(q ? `/prompts?q=${encodeURIComponent(q)}` : "/prompts");
	};

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	return (
		<header className="sticky top-0 z-40 border-b border-base-content/10 bg-base-100/85 backdrop-blur">
			<Container size="wide" className="flex h-16 items-center gap-3">
				{/* Menu mobile */}
				<div className="dropdown lg:hidden">
					<button
						type="button"
						tabIndex={0}
						className="btn btn-ghost btn-sm px-2"
						aria-label="Ouvrir le menu"
					>
						<Menu className="size-5" />
					</button>
					<ul className="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-box bg-base-200 p-2 shadow-lg">
						{NAV_LINKS.map((link) => (
							<li key={link.to}>
								<Link to={link.to}>{link.label}</Link>
							</li>
						))}
					</ul>
				</div>

				<Logo />

				<nav className="hidden items-center gap-1 lg:flex">
					{NAV_LINKS.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							className={({ isActive }) =>
								cn(
									"rounded-btn px-3 py-1.5 text-sm font-medium transition-colors",
									isActive
										? "bg-base-content/5 text-base-content"
										: "text-base-content/60 hover:text-base-content",
								)
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>

				<form
					onSubmit={onSearch}
					className="ml-auto hidden max-w-xs flex-1 md:block"
				>
					<label className="input input-sm w-full items-center gap-2 bg-base-200">
						<Search className="size-4 text-base-content/50" />
						<input
							type="search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Rechercher un prompt…"
							className="grow"
						/>
					</label>
				</form>

				<div className="ml-auto flex items-center gap-2 md:ml-0">
					{isAuthenticated && user ? (
						<div className="dropdown dropdown-end">
							<button
								type="button"
								tabIndex={0}
								className="btn btn-ghost btn-sm px-1"
								aria-label="Menu utilisateur"
							>
								<UserAvatar
									username={user.username}
									avatarKey={user.profile?.avatar}
									size={32}
								/>
							</button>
							<ul className="menu dropdown-content menu-sm z-50 mt-3 w-56 rounded-box bg-base-200 p-2 shadow-lg">
								<li className="menu-title truncate">
									{user.username}
								</li>
								<li>
									<Link to="/dashboard">
										<LayoutDashboard className="size-4" />
										Mon tableau de bord
									</Link>
								</li>
								<li>
									<Link to="/dashboard/prompts/new">
										<PlusCircle className="size-4" />
										Vendre un prompt
									</Link>
								</li>
								<li>
									<Link to="/dashboard/settings">
										<Settings className="size-4" />
										Paramètres
									</Link>
								</li>
								{isAdmin ? (
									<li>
										<Link to="/admin">
											<Shield className="size-4" />
											Administration
										</Link>
									</li>
								) : null}
								<li>
									<button
										type="button"
										onClick={handleLogout}
										className="text-error"
									>
										<LogOut className="size-4" />
										Se déconnecter
									</button>
								</li>
							</ul>
						</div>
					) : (
						<>
							<Link
								to="/login"
								className="btn btn-ghost btn-sm"
							>
								Se connecter
							</Link>
							<Link
								to="/register"
								className="btn btn-primary btn-sm"
							>
								Créer un compte
							</Link>
						</>
					)}
				</div>
			</Container>
		</header>
	);
}
