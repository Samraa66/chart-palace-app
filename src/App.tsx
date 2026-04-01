import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, NavLink, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Users, BarChart3, Megaphone, Activity } from "lucide-react";
import { lazy, Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CRMDashboard = lazy(() => import("./pages/CRMDashboard"));
const FunnelAnalytics = lazy(() => import("./pages/FunnelAnalytics"));
const AdIntelligence = lazy(() => import("./pages/AdIntelligence"));
const MemberActivity = lazy(() => import("./pages/MemberActivity"));

const queryClient = new QueryClient();

const TABS = [
  { to: "/crm", label: "CRM", icon: Users },
  { to: "/funnel", label: "Funnel", icon: BarChart3 },
  { to: "/ads", label: "Ads", icon: Megaphone },
  { to: "/activity", label: "Activity", icon: Activity },
] as const;

function TopTabBar() {
  const isMobile = useIsMobile();

  return (
    <nav className="flex items-center border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50 safe-top">
      {!isMobile && (
        <span className="text-sm font-bold text-primary px-4 py-2 shrink-0 tracking-tight">
          TradeFlow
        </span>
      )}
      <div className="flex flex-1 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors relative whitespace-nowrap
              ${isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <tab.icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function AppShell() {
  return (
    <div className="h-[100dvh] flex flex-col bg-background">
      <TopTabBar />
      <div className="flex-1 min-h-0 overflow-hidden">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground text-sm">Loading…</div>}>
          <Routes>
            <Route path="/crm" element={<CRMDashboard />} />
            <Route path="/funnel" element={<FunnelAnalytics />} />
            <Route path="/ads" element={<AdIntelligence />} />
            <Route path="/activity" element={<MemberActivity />} />
            <Route path="*" element={<Navigate to="/crm" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
