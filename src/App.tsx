import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Promocoes from "./pages/Promocoes";
import Running from "./pages/Running";
import Casual from "./pages/Casual";
import Basketball from "./pages/Basketball";
import Lifestyle from "./pages/Lifestyle";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Collection from "./pages/Collection";
import NewReleases from "./pages/NewReleases";
import Masculino from "./pages/Masculino";
import Feminino from "./pages/Feminino";
import Infantil from "./pages/Infantil";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import CategoryPage from "./pages/CategoryPage";
import OrderTracking from "./pages/OrderTracking";
import SearchResults from "./pages/SearchResults";
import Help from "./pages/Help";
import Returns from "./pages/Returns";
import SizeGuide from "./pages/SizeGuide";
import Shipping from "./pages/Shipping";
import Warranty from "./pages/Warranty";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/promocoes" element={<Promocoes />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/new-releases" element={<NewReleases />} />
            <Route path="/masculino" element={<Masculino />} />
            <Route path="/feminino" element={<Feminino />} />
            <Route path="/infantil" element={<Infantil />} />
            <Route path="/running" element={<Running />} />
            <Route path="/casual" element={<Casual />} />
            <Route path="/basketball" element={<Basketball />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/categoria/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/help" element={<Help />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
