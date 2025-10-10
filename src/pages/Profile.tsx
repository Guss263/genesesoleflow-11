import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/hooks/useWishlist";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Lock, ShoppingBag, Heart, LogOut, Trash2, Package } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  payment_method: string;
  created_at: string;
}

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  
  // Dados do perfil
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // Alteração de senha
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { wishlistItems, removeFromWishlist, isLoading: wishlistLoading } = useWishlist();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);

      // Buscar dados do perfil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || "");
        setPhone(profileData.phone || "");
        setAddress(profileData.address || "");
      }

      // Buscar pedidos
      fetchOrders(user.id);
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone: phone,
          address: address,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o perfil."
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem."
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres."
      });
      return;
    }

    setIsUpdating(true);

    try {
      // Primeiro, verificar senha atual tentando fazer login
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });

      if (signInError) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Senha atual incorreta."
        });
        setIsUpdating(false);
        return;
      }

      // Atualizar senha
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Senha alterada!",
        description: "Sua senha foi atualizada com sucesso."
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível alterar a senha."
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado",
      description: "Até logo!"
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Minha Conta</h1>
              <p className="text-sm md:text-base text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="profile" className="text-xs md:text-sm">
                <User className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Perfil</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="password" className="text-xs md:text-sm">
                <Lock className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Senha
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-xs md:text-sm">
                <ShoppingBag className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="text-xs md:text-sm">
                <Heart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Favoritos</span>
                <span className="sm:hidden">❤️</span>
              </TabsTrigger>
            </TabsList>

            {/* Perfil */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-muted"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Seu endereço completo"
                      />
                    </div>

                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Senha */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>
                    Atualize sua senha de acesso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>

                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Atualizando..." : "Alterar Senha"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pedidos */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pedidos</CardTitle>
                  <CardDescription>
                    Acompanhe seus pedidos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <p className="text-center py-8">Carregando...</p>
                  ) : orders.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Você ainda não realizou nenhum pedido.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold">Pedido #{order.order_number}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">
                                R$ {Number(order.total).toFixed(2)}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.status === 'paid' ? 'Pago' :
                                 order.status === 'pending' ? 'Pendente' : 'Cancelado'}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Pagamento: {order.payment_method === 'credit' ? 'Cartão de Crédito' :
                                       order.payment_method === 'debit' ? 'Cartão de Débito' :
                                       order.payment_method === 'pix' ? 'PIX' : 'Boleto'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favoritos */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Desejos</CardTitle>
                  <CardDescription>
                    Seus produtos favoritos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlistLoading ? (
                    <p className="text-center py-8">Carregando...</p>
                  ) : wishlistItems.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Sua lista de desejos está vazia.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                          <img
                            src={item.product?.image_url || '/placeholder.svg'}
                            alt={item.product?.name || 'Produto'}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <Link to={`/product/${item.product_id}`}>
                              <h3 className="font-semibold hover:text-primary transition-colors">
                                {item.product?.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.product?.brand}</p>
                            <p className="font-bold text-primary">
                              R$ {Number(item.product?.price || 0).toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromWishlist(item.product_id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
