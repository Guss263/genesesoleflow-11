import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Regra 1: Login de Administrador
      if (email === "genese@gmail.com" && password === "Admin") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin-dashboard");
        return;
      }

      // Regra 2: Login de Cliente com Supabase
      const {
        data,
        error: authError
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (authError) {
        // Regra 3: Credenciais Inválidas ou E-mail não confirmado
        if (authError.message.includes('Email not confirmed')) {
          setError("E-mail não confirmado. Verifique sua caixa de entrada.");
        } else {
          setError("E-mail ou senha incorretos.");
        }
        return;
      }
      if (data.user) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para a página inicial..."
        });

        // Redirecionar para a página inicial
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setError("E-mail ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Página de Login </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full" />
            </div>
            
            <Button type="submit" className="w-full hero-button" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            
            {error && <p className="text-destructive text-sm text-center mt-2">
                {error}
              </p>}
          </form>
        </CardContent>
      </Card>
    </div>;
};
export default AdminLogin;