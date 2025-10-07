import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Login com Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (authError) {
        // Credenciais Inválidas ou E-mail não confirmado
        if (authError.message.includes('Email not confirmed')) {
          setError("E-mail não confirmado. Verifique sua caixa de entrada e clique no link de confirmação.");
        } else if (authError.message.includes('Invalid login credentials')) {
          setError("E-mail ou senha incorretos. Verifique seus dados ou crie uma conta.");
        } else {
          setError("Erro no login: " + authError.message);
        }
        return;
      }

      if (data.user) {
        // Verificar se o usuário tem role de admin
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('role', 'admin')
          .single();

        if (roles) {
          // Usuário é admin
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo ao painel administrativo."
          });
          navigate("/admin-dashboard");
        } else {
          // Usuário não é admin
          toast({
            title: "Login realizado com sucesso!",
            description: "Redirecionando para a página inicial..."
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (error) {
      setError("E-mail ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-start mb-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground text-center">
            Página de Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                className="w-full" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="w-full" 
              />
            </div>
            
            <Button type="submit" className="w-full hero-button" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            
            {error && (
              <p className="text-destructive text-sm text-center mt-2">
                {error}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
