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
import Payment from "./pages/Payment";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryPage from "./pages/CategoryPage";
import OrderTracking from "./pages/OrderTracking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
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
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
