import { Navigate, Route, Routes } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { GuestRoute } from "@/components/auth/GuestRoute";

import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { PromptDetailPage } from "@/pages/PromptDetailPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { VerifyEmailPage } from "@/pages/auth/VerifyEmailPage";

import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { CreatePromptPage } from "@/pages/dashboard/CreatePromptPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";

import { AdminUsersPage } from "@/pages/admin/AdminUsersPage";
import { AdminCategoriesPage } from "@/pages/admin/AdminCategoriesPage";
import { AdminAiToolsPage } from "@/pages/admin/AdminAiToolsPage";

export function AppRoutes() {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				<Route index element={<HomePage />} />
				<Route path="prompts" element={<CatalogPage />} />
				<Route path="prompts/:slug" element={<PromptDetailPage />} />

				<Route element={<ProtectedRoute />}>
					<Route path="dashboard" element={<DashboardLayout />}>
						<Route index element={<DashboardPage />} />
						<Route
							path="prompts/new"
							element={<CreatePromptPage />}
						/>
						<Route path="settings" element={<SettingsPage />} />
					</Route>

					<Route element={<AdminRoute />}>
						<Route path="admin" element={<AdminLayout />}>
							<Route
								index
								element={
									<Navigate to="/admin/users" replace />
								}
							/>
							<Route
								path="users"
								element={<AdminUsersPage />}
							/>
							<Route
								path="categories"
								element={<AdminCategoriesPage />}
							/>
							<Route
								path="ai-tools"
								element={<AdminAiToolsPage />}
							/>
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Route>

			{/* Écrans plein écran, sans navbar/footer */}
			<Route element={<GuestRoute />}>
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
				<Route
					path="forgot-password"
					element={<ForgotPasswordPage />}
				/>
			</Route>
			<Route
				path="reset-password/:id/:token"
				element={<ResetPasswordPage />}
			/>
			<Route
				path="verify-email/:id/:token"
				element={<VerifyEmailPage />}
			/>
		</Routes>
	);
}
