import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WhoWeAre from "./pages/WhoWeAre";
import RaisePathways from "./pages/RaisePathways";
import ToolsGuides from "./pages/ToolsGuides";
import AIPolicyTemplate from "./pages/AIPolicyTemplate";
import AIMaturityAssessment from "./pages/AIMaturityAssessment";
import ResponsibleAIHandbook from "./pages/ResponsibleAIHandbook";
import Blog from "./pages/Blog";
import Join from "./pages/Join";
import FAQ from "./pages/FAQ";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/raise-pathways" element={<RaisePathways />} />
          <Route path="/tools-guides" element={<ToolsGuides />} />
          <Route path="/ai-policy-template" element={<AIPolicyTemplate />} />
          <Route path="/ai-maturity-assessment" element={<AIMaturityAssessment />} />
          <Route path="/responsible-ai-handbook" element={<ResponsibleAIHandbook />} />
          <Route path="/news" element={<Blog />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/join" element={<Join />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
