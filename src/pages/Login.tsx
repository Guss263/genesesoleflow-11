import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail } from "lucide-react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          toast({
            variant: "destructive",
            title: "E-mail não confirmado",
            description: "Verifique sua caixa de entrada e clique no link de confirmação."
          });
        } else {
          toast({
            variant: "destructive",
            title: "Erro no login",
            description: "E-mail ou senha incorretos."
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!"
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao fazer login."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro no login social",
          description: error.message
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível realizar o login social."
      });
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error.message
        });
      } else {
        toast({
          title: "E-mail enviado!",
          description: "Verifique sua caixa de entrada para redefinir sua senha."
        });
        setShowResetPassword(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível enviar o e-mail de recuperação."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showResetPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-start mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowResetPassword(false)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Recuperar Senha
            </CardTitle>
            <CardDescription className="text-center">
              Digite seu e-mail para receber o link de recuperação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">E-mail</Label>
                <Input 
                  id="reset-email" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  placeholder="seu@email.com"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <CardTitle className="text-2xl font-bold text-center">
            Entrar na sua conta
          </CardTitle>
          <CardDescription className="text-center">
            Escolha uma opção para fazer login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Login Social */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('google')}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Continuar com Google
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('facebook')}
            >
              <FaFacebook className="mr-2 h-4 w-4" />
              Continuar com Facebook
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('apple')}
            >
              <FaApple className="mr-2 h-4 w-4" />
              Continuar com Apple
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com e-mail
              </span>
            </div>
          </div>

          {/* Login com E-mail */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                placeholder="seu@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm"
                  onClick={() => setShowResetPassword(true)}
                >
                  Esqueceu a senha?
                </Button>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link to="/register" className="text-primary hover:underline font-medium">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
