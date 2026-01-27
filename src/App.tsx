import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import ParentPortal from "./pages/ParentPortal";
import Contact from "./pages/Contact";
import Social from "./pages/Social";
import Consulting from "./pages/Consulting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// When deployed under a sub-path (e.g. GitHub Pages /repo-name/),
// this keeps routing working and prevents white screens.
const routerBasename = (() => {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, "");
  return base && base !== "/" ? base : undefined;
})();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={routerBasename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/parent-portal" element={<ParentPortal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/social" element={<Social />} />
            <Route path="/consulting" element={<Consulting />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
