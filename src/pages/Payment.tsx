import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CreditCard, Smartphone, Building } from 'lucide-react';

const paymentSchema = z.object({
  paymentMethod: z.enum(['credit', 'debit', 'pix', 'boleto'], {
    required_error: "Selecione um método de pagamento",
  }),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === 'credit' || data.paymentMethod === 'debit') {
    return data.cardNumber && data.cardName && data.cardExpiry && data.cardCvv;
  }
  return true;
}, {
  message: "Preencha todos os dados do cartão",
  path: ["cardNumber"],
});

type PaymentForm = z.infer<typeof paymentSchema>;

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
  });

  const paymentMethod = watch('paymentMethod');

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/);
    if (match) {
      return [match[1], match[2], match[3], match[4]]
        .filter(Boolean)
        .join(' ');
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/(\d{1,2})(\d{1,2})?/);
    if (match && match[2]) {
      return `${match[1]}/${match[2]}`;
    }
    return cleaned;
  };

  const onSubmit = async (data: PaymentForm) => {
    setIsLoading(true);
    
    try {
      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Pagamento processado com sucesso!",
        description: "Seu pedido foi confirmado. Redirecionando...",
      });
      
      // Redirecionar para a página inicial
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast({
        title: "Erro no processamento",
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
                Simulação de Pagamento
              </CardTitle>
              <p className="text-muted-foreground">
                Escolha sua forma de pagamento preferida
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Resumo do Pedido */}
                <div className="bg-accent rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Resumo do Pedido
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="text-foreground">R$ 299,90</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete:</span>
                      <span className="text-foreground">R$ 15,00</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-semibold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-primary">R$ 314,90</span>
                    </div>
                  </div>
                </div>

                {/* Método de Pagamento */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Método de Pagamento
                  </h3>
                  
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setValue('paymentMethod', value as any)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex items-center space-x-2 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>Cartão de Crédito</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <RadioGroupItem value="debit" id="debit" />
                      <Label htmlFor="debit" className="flex items-center space-x-2 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>Cartão de Débito</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex items-center space-x-2 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <span>PIX - Desconto de 5%</span>
                        <span className="text-sm text-primary font-semibold ml-auto">R$ 299,16</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Label htmlFor="boleto" className="flex items-center space-x-2 cursor-pointer flex-1">
                        <Building className="h-5 w-5 text-primary" />
                        <span>Boleto Bancário - Desconto de 3%</span>
                        <span className="text-sm text-primary font-semibold ml-auto">R$ 305,45</span>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {errors.paymentMethod && (
                    <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
                  )}
                </div>

                {/* Dados do Cartão */}
                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                      Dados do Cartão
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          {...register('cardNumber')}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setValue('cardNumber', formatted);
                          }}
                          maxLength={19}
                          className={errors.cardNumber ? 'border-destructive' : ''}
                        />
                        {errors.cardNumber && (
                          <p className="text-sm text-destructive">{errors.cardNumber.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cardName">Nome no Cartão *</Label>
                        <Input
                          id="cardName"
                          placeholder="Nome como impresso no cartão"
                          {...register('cardName')}
                          className={errors.cardName ? 'border-destructive' : ''}
                        />
                        {errors.cardName && (
                          <p className="text-sm text-destructive">{errors.cardName.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Validade *</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/AA"
                          {...register('cardExpiry')}
                          onChange={(e) => {
                            const formatted = formatExpiry(e.target.value);
                            setValue('cardExpiry', formatted);
                          }}
                          maxLength={5}
                          className={errors.cardExpiry ? 'border-destructive' : ''}
                        />
                        {errors.cardExpiry && (
                          <p className="text-sm text-destructive">{errors.cardExpiry.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV *</Label>
                        <Input
                          id="cardCvv"
                          placeholder="000"
                          {...register('cardCvv')}
                          maxLength={4}
                          className={errors.cardCvv ? 'border-destructive' : ''}
                        />
                        {errors.cardCvv && (
                          <p className="text-sm text-destructive">{errors.cardCvv.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Informações PIX */}
                {paymentMethod === 'pix' && (
                  <div className="bg-accent rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Como funciona o PIX:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Após a confirmação, você receberá o código PIX</li>
                      <li>• Abra o app do seu banco e escaneie o QR Code</li>
                      <li>• O pagamento é processado instantaneamente</li>
                      <li>• Desconto de 5% já aplicado no valor final</li>
                    </ul>
                  </div>
                )}

                {/* Informações Boleto */}
                {paymentMethod === 'boleto' && (
                  <div className="bg-accent rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Como funciona o Boleto:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Após a confirmação, você receberá o boleto por e-mail</li>
                      <li>• Pague em qualquer banco ou lotérica</li>
                      <li>• Prazo de vencimento: 3 dias úteis</li>
                      <li>• Desconto de 3% já aplicado no valor final</li>
                    </ul>
                  </div>
                )}

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="hero-button flex-1"
                  >
                    {isLoading ? 'Processando...' : 'Finalizar Pagamento'}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link to="/register">Voltar ao Cadastro</Link>
                  </Button>
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

export default Payment;