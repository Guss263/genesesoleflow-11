import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Lock, ShoppingBag, Heart, LogOut } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
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
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
    } finally {
      setLoading(false);
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Minha Conta</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="password">
                <Lock className="h-4 w-4 mr-2" />
                Senha
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="wishlist">
                <Heart className="h-4 w-4 mr-2" />
                Favoritos
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
                  <p className="text-muted-foreground text-center py-8">
                    Você ainda não realizou nenhum pedido.
                  </p>
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
                  <p className="text-muted-foreground text-center py-8">
                    Sua lista de desejos está vazia.
                  </p>
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
