import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthGuard } from "@/components/AuthGuard";
import { LanguageToggle } from "@/components/LanguageToggle";

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Workspace = lazy(() => import('./pages/Workspace'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const RouteSpinner = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="font-mono text-xs text-muted-foreground">Loading…</span>
    </div>
  </div>
);

const GlobalLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen">
    <div className="fixed top-3 right-3 z-[100]">
      <LanguageToggle />
    </div>
    {children}
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthGuard>
          <GlobalLayout>
            <Suspense fallback={<RouteSpinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </GlobalLayout>
        </AuthGuard>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
