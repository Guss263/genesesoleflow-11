import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const registerSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z.string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
  phone: z.string()
    .trim()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, { message: "Telefone deve estar no formato (XX) XXXXX-XXXX" }),
  cpf: z.string()
    .trim()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF deve estar no formato XXX.XXX.XXX-XX" }),
  street: z.string()
    .trim()
    .min(5, { message: "Rua deve ter pelo menos 5 caracteres" })
    .max(200, { message: "Rua deve ter no máximo 200 caracteres" }),
  number: z.string()
    .trim()
    .min(1, { message: "Número é obrigatório" })
    .max(10, { message: "Número deve ter no máximo 10 caracteres" }),
  neighborhood: z.string()
    .trim()
    .min(2, { message: "Bairro deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Bairro deve ter no máximo 100 caracteres" }),
  city: z.string()
    .trim()
    .min(2, { message: "Cidade deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Cidade deve ter no máximo 100 caracteres" }),
  state: z.string()
    .trim()
    .length(2, { message: "Estado deve ter 2 caracteres (ex: SP)" }),
  cep: z.string()
    .trim()
    .regex(/^\d{5}-\d{3}$/, { message: "CEP deve estar no formato XXXXX-XXX" }),
  password: z.string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    .max(50, { message: "Senha deve ter no máximo 50 caracteres" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return value;
  };

  const formatCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{3})$/);
    if (match) {
      return `${match[1]}-${match[2]}`;
    }
    return value;
  };

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    
    try {
      // Simular envio de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Redirecionando para a simulação de pagamento...",
      });
      
      // Redirecionar para a página de simulação de pagamento
      setTimeout(() => {
        navigate('/payment');
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="product-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-foreground mb-2">
                Cadastro de Cliente
              </CardTitle>
              <p className="text-muted-foreground">
                Preencha seus dados para criar sua conta
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Dados Pessoais
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input
                        id="fullName"
                        placeholder="Seu nome completo"
                        {...register('fullName')}
                        className={errors.fullName ? 'border-destructive' : ''}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive">{errors.fullName.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        {...register('email')}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        placeholder="(11) 99999-9999"
                        {...register('phone')}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          setValue('phone', formatted);
                        }}
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        {...register('cpf')}
                        onChange={(e) => {
                          const formatted = formatCPF(e.target.value);
                          setValue('cpf', formatted);
                        }}
                        className={errors.cpf ? 'border-destructive' : ''}
                      />
                      {errors.cpf && (
                        <p className="text-sm text-destructive">{errors.cpf.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Endereço
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Rua *</Label>
                      <Input
                        id="street"
                        placeholder="Nome da rua"
                        {...register('street')}
                        className={errors.street ? 'border-destructive' : ''}
                      />
                      {errors.street && (
                        <p className="text-sm text-destructive">{errors.street.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        placeholder="123"
                        {...register('number')}
                        className={errors.number ? 'border-destructive' : ''}
                      />
                      {errors.number && (
                        <p className="text-sm text-destructive">{errors.number.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        placeholder="Nome do bairro"
                        {...register('neighborhood')}
                        className={errors.neighborhood ? 'border-destructive' : ''}
                      />
                      {errors.neighborhood && (
                        <p className="text-sm text-destructive">{errors.neighborhood.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        placeholder="Nome da cidade"
                        {...register('city')}
                        className={errors.city ? 'border-destructive' : ''}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive">{errors.city.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        placeholder="SP"
                        maxLength={2}
                        {...register('state')}
                        onChange={(e) => {
                          setValue('state', e.target.value.toUpperCase());
                        }}
                        className={errors.state ? 'border-destructive' : ''}
                      />
                      {errors.state && (
                        <p className="text-sm text-destructive">{errors.state.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        {...register('cep')}
                        onChange={(e) => {
                          const formatted = formatCEP(e.target.value);
                          setValue('cep', formatted);
                        }}
                        className={errors.cep ? 'border-destructive' : ''}
                      />
                      {errors.cep && (
                        <p className="text-sm text-destructive">{errors.cep.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Senha */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Senha de Acesso
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha *</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        {...register('password')}
                        className={errors.password ? 'border-destructive' : ''}
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirme sua senha"
                        {...register('confirmPassword')}
                        className={errors.confirmPassword ? 'border-destructive' : ''}
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="hero-button flex-1"
                  >
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link to="/">Voltar à Loja</Link>
                  </Button>
                </div>
                
                {/* Link para login */}
                <div className="text-center pt-4">
                  <p className="text-muted-foreground">
                    Já possui uma conta?{" "}
                    <Link 
                      to="/admin-login" 
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Realize o login
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;