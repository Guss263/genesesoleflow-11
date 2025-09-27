import { useState } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    itemCount
  } = useCart();
  const navigationItems = [{
    label: "Masculino",
    href: "/masculino"
  }, {
    label: "Feminino",
    href: "/feminino"
  }, {
    label: "Infantil",
    href: "/infantil"
  }, {
    label: "Lançamentos",
    href: "/new-releases"
  }, {
    label: "Promoções",
    href: "/promocoes"
  }, {
    label: "Sobre Nós",
    href: "/about"
  }];
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="font-bold text-primary mx-px py-0 my-0 px-[2px] text-4xl text-left">Gênese</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map(item => item.href.startsWith('/') ? <Link key={item.label} to={item.href} className="nav-link text-sm font-medium">
                {item.label}
              </Link> : <a key={item.label} href={item.href} className="nav-link text-sm font-medium">
                {item.label}
              </a>)}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-secondary rounded-full px-4 py-2 w-60">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input type="text" placeholder="Buscar tênis..." className="bg-transparent border-none outline-none flex-1 text-sm" />
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* User Account */}
          <Link to="/register">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Shopping Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {itemCount}
                </Badge>}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            {navigationItems.map(item => item.href.startsWith('/') ? <Link key={item.label} to={item.href} className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link> : <a key={item.label} href={item.href} className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>)}
            <Link to="/register" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Cadastro
            </Link>
          </nav>
        </div>}
    </header>;
};
export default Header;