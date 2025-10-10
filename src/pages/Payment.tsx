import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CreditCard, Smartphone, Building, Copy, Check } from 'lucide-react';
import QRCode from 'react-qr-code';

const paymentSchema = z.object({
  paymentMethod: z.enum(['credit', 'debit', 'pix', 'boleto'], {
    required_error: "Selecione um método de pagamento",
  }),
  cardNumber: z.string()
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Número do cartão inválido")
    .refine((val) => {
      // Algoritmo de Luhn para validar número do cartão
      const digits = val.replace(/\s/g, '');
      let sum = 0;
      let isEven = false;
      
      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i]);
        
        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        
        sum += digit;
        isEven = !isEven;
      }
      
      return sum % 10 === 0;
    }, "Número do cartão inválido")
    .optional(),
  cardName: z.string()
    .trim()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras")
    .optional(),
  cardExpiry: z.string()
    .regex(/^\d{2}\/\d{2}$/, "Formato deve ser MM/AA")
    .refine((val) => {
      if (!val) return true;
      const [month, year] = val.split('/').map(Number);
      if (month < 1 || month > 12) return false;
      const expiry = new Date(2000 + year, month - 1);
      return expiry > new Date();
    }, "Cartão expirado")
    .optional(),
  cardCvv: z.string()
    .regex(/^\d{3,4}$/, "CVV deve ter 3 ou 4 dígitos")
    .optional(),
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
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [boletoCode, setBoletoCode] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedBoleto, setCopiedBoleto] = useState(false);

  const { cartTotal = 299.90, cartItemCount = 1 } = location.state || {};

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

  // Gerar códigos quando o método de pagamento for selecionado
  useEffect(() => {
    if (paymentMethod === 'pix' && !pixCode) {
      // Gerar chave PIX aleatória (simulação)
      const randomKey = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}5204000053039865802BR5925LOJA SNEAKERS6009SAO PAULO62070503***63041D3D`;
      setPixCode(randomKey);
    }
    
    if (paymentMethod === 'boleto' && !boletoCode) {
      // Gerar código de barras do boleto (simulação)
      const randomBoleto = `${Math.floor(10000000000 + Math.random() * 90000000000)}.${Math.floor(10000 + Math.random() * 90000)} ${Math.floor(10000 + Math.random() * 90000)}.${Math.floor(100000 + Math.random() * 900000)} ${Math.floor(10000 + Math.random() * 90000)}.${Math.floor(100000 + Math.random() * 900000)} ${Math.floor(1 + Math.random() * 9)} ${Math.floor(10000000000000 + Math.random() * 90000000000000)}`;
      setBoletoCode(randomBoleto);
    }
  }, [paymentMethod, pixCode, boletoCode]);

  const copyToClipboard = (text: string, type: 'pix' | 'boleto') => {
    navigator.clipboard.writeText(text);
    if (type === 'pix') {
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    } else {
      setCopiedBoleto(true);
      setTimeout(() => setCopiedBoleto(false), 2000);
    }
    toast({
      title: "Copiado!",
      description: `Código ${type === 'pix' ? 'PIX' : 'do boleto'} copiado para área de transferência.`,
    });
  };

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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para finalizar a compra.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      // Criar pedido no banco de dados
      const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
      const orderTotal = data.paymentMethod === 'pix' ? cartTotal * 0.95 : 
                         data.paymentMethod === 'boleto' ? cartTotal * 0.97 : 
                         cartTotal;

      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: 'pending',
          total: orderTotal,
          payment_method: data.paymentMethod,
        });

      if (orderError) throw orderError;

      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Pagamento processado com sucesso!",
        description: "Redirecionando para acompanhamento...",
      });
      
      // Redirecionar para a página de acompanhamento
      setTimeout(() => {
        navigate('/order-tracking', {
          state: {
            orderNumber: orderNumber,
            cartTotal: orderTotal
          }
        });
      }, 1500);
    } catch (error) {
      console.error('Payment error:', error);
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
                      <span className="text-muted-foreground">Itens ({cartItemCount}):</span>
                      <span className="text-foreground">R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete:</span>
                      <span className="text-foreground">Grátis</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-semibold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-primary">R$ {cartTotal.toFixed(2)}</span>
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
                        <span className="text-sm text-primary font-semibold ml-auto">R$ {(cartTotal * 0.95).toFixed(2)}</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Label htmlFor="boleto" className="flex items-center space-x-2 cursor-pointer flex-1">
                        <Building className="h-5 w-5 text-primary" />
                        <span>Boleto Bancário - Desconto de 3%</span>
                        <span className="text-sm text-primary font-semibold ml-auto">R$ {(cartTotal * 0.97).toFixed(2)}</span>
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
                  <div className="bg-accent rounded-lg p-6 space-y-4">
                    <h4 className="font-semibold text-foreground text-lg mb-4">Pagamento via PIX</h4>
                    
                    {/* QR Code */}
                    <div className="flex justify-center bg-white p-4 rounded-lg">
                      <QRCode value={pixCode} size={200} />
                    </div>
                    
                    {/* Chave PIX */}
                    <div className="space-y-2">
                      <Label className="text-foreground">Chave PIX (Copiar e Colar):</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={pixCode} 
                          readOnly 
                          className="font-mono text-xs"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(pixCode, 'pix')}
                        >
                          {copiedPix ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Instruções */}
                    <div className="pt-2">
                      <h5 className="font-semibold text-foreground mb-2">Instruções:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Abra o app do seu banco</li>
                        <li>• Escolha pagar com PIX QR Code ou Copia e Cola</li>
                        <li>• Escaneie o QR Code ou cole a chave PIX</li>
                        <li>• Confirme o pagamento de R$ {(cartTotal * 0.95).toFixed(2)}</li>
                        <li>• Desconto de 5% já aplicado</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Informações Boleto */}
                {paymentMethod === 'boleto' && (
                  <div className="bg-accent rounded-lg p-6 space-y-4">
                    <h4 className="font-semibold text-foreground text-lg mb-4">Boleto Bancário</h4>
                    
                    {/* Código de Barras */}
                    <div className="space-y-2">
                      <Label className="text-foreground">Código de Barras do Boleto:</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={boletoCode} 
                          readOnly 
                          className="font-mono text-xs"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(boletoCode, 'boleto')}
                        >
                          {copiedBoleto ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Informações do Boleto */}
                    <div className="bg-background/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Valor:</span>
                        <span className="text-foreground font-semibold">R$ {(cartTotal * 0.97).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Vencimento:</span>
                        <span className="text-foreground">{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Desconto:</span>
                        <span className="text-primary">3% (R$ {(cartTotal * 0.03).toFixed(2)})</span>
                      </div>
                    </div>

                    {/* Instruções */}
                    <div className="pt-2">
                      <h5 className="font-semibold text-foreground mb-2">Instruções:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Copie o código de barras acima</li>
                        <li>• Pague em qualquer banco, lotérica ou app bancário</li>
                        <li>• Prazo de vencimento: 3 dias úteis</li>
                        <li>• Após o pagamento, o pedido será processado em até 2 dias úteis</li>
                      </ul>
                    </div>
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
                    <Link to="/cart">Voltar ao Carrinho</Link>
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