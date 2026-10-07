import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Directory from "./pages/Directory";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PartnerPage from "./pages/PartnerPage";
import ProtectionPage from "./pages/ProtectionPage";
import RequestPage from "./pages/RequestPage";
import TalentPage from "./pages/TalentPage";
import TrackingPage from "./pages/TrackingPage";
import AdminPage from "./pages/AdminPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/demande" component={RequestPage} />
      <Route path="/talents" component={TalentPage} />
      <Route path="/annuaire" component={Directory} />
      <Route path="/suivi" component={TrackingPage} />
      <Route path="/association" component={PartnerPage} />
      <Route path="/protection" component={ProtectionPage} />
      <Route path="/coordination" component={AdminPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider><Toaster /><Router /></TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
