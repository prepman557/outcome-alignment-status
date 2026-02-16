import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AccountDetail from "./pages/AccountDetail";
import NotFound from "./pages/NotFound";
import { useAccounts } from "./hooks/useAccounts";

const queryClient = new QueryClient();

function AppRoutes() {
  const { accounts, updateAccount } = useAccounts();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-14 items-center">
          <h1 className="text-lg font-semibold tracking-tight">Outcome Alignment Board</h1>
        </div>
      </header>
      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Dashboard accounts={accounts} />} />
          <Route path="/account/:id" element={<AccountDetail accounts={accounts} onUpdate={updateAccount} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
