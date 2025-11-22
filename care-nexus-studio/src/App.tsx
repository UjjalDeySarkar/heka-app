import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Emergency from "./pages/Emergency";
import Ambulances from "./pages/Ambulances";
import HomeCare from "./pages/HomeCare";
import LabTests from "./pages/LabTests";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Admissions from "./pages/Admissions";
import Staff from "./pages/Staff";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/ambulances" element={<Ambulances />} />
            <Route path="/home-care" element={<HomeCare />} />
            <Route path="/lab-tests" element={<LabTests />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/staff" element={<Staff />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
