import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { itemCount } = useCart();

  useEffect(() => {
    // Verificar usuário autenticado
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };
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
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="font-bold text-primary mx-px py-0 my-0 px-[2px] text-4xl text-left">Gênese</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map(item => item.href.startsWith('/') ? 
            <div key={item.label} className="relative group">
              <Link to={item.href} className="nav-link text-sm font-medium whitespace-nowrap relative">
                {item.label}
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary opacity-0 transform scale-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100"></div>
              </Link>
            </div> : 
            <div key={item.label} className="relative group">
              <a href={item.href} className="nav-link text-sm font-medium whitespace-nowrap relative">
                {item.label}
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary opacity-0 transform scale-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100"></div>
              </a>
            </div>)}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-secondary rounded-full px-4 py-2 w-60">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Buscar tênis..." 
              className="bg-transparent border-none outline-none flex-1 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* User Account */}
          {user && (
            <Badge variant="secondary" className="hidden sm:inline-flex">Logado</Badge>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Minha Conta</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

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
            {user ? (
              <>
                <Link to="/profile" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Minha Conta
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Entrar
                </Link>
                <Link to="/register" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Cadastrar
                </Link>
              </>
            )}
          </nav>
        </div>}
    </header>;
};
export default Header;