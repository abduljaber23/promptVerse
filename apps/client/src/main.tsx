import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthBootstrap } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/Toaster";
import "@/common/store/ui.store"; // applique le thème persistant au chargement
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
			staleTime: 30_000,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthBootstrap />
				<App />
			</BrowserRouter>
			<Toaster />
			{import.meta.env.DEV ? (
				<ReactQueryDevtools initialIsOpen={false} />
			) : null}
		</QueryClientProvider>
	</StrictMode>,
);
