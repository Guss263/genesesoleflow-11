import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'boleto'>('card');
  const { items, total, clearCart } = useCart();

  const handleStripeCheckout = async () => {
    setIsLoading(true);

    try {
      // Verifica autenticação
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

      // Verifica carrinho
      if (!items || items.length === 0) {
        toast({
          title: "Carrinho vazio",
          description: "Adicione produtos ao carrinho antes de continuar.",
          variant: "destructive",
        });
        navigate('/cart');
        return;
      }

      // Cria pedido no banco de dados
      const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: 'pending',
          total: total,
          payment_method: 'stripe',
        });

      if (orderError) {
        throw new Error(`Erro ao criar pedido: ${orderError.message}`);
      }

      // Chama função Stripe checkout
      const payload = {
        items: items.map(item => ({
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          size: item.size,
          color: item.color,
        })),
        total: total,
        paymentMethod: paymentMethod,
      };
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: payload,
      });

      if (error) {
        throw new Error(error.message || "Erro ao criar sessão de checkout");
      }

      if (data?.url) {
        clearCart();
        
        const win = window.open(data.url, "_blank", "noopener,noreferrer");
        if (!win) {
          window.location.href = data.url;
        }
      } else {
        throw new Error('URL de checkout não foi retornada pela função');
      }
    } catch (error) {
      toast({
        title: "Erro ao processar pagamento",
        description: error instanceof Error ? error.message : "Erro desconhecido. Tente novamente.",
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
                Finalizar Compra
              </CardTitle>
              <p className="text-muted-foreground">
                Revise seu pedido e prossiga para o pagamento
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {/* Resumo do Pedido */}
                <div className="bg-accent rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Resumo do Pedido
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Itens ({items.length}):</span>
                      <span className="text-foreground">R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete:</span>
                      <span className="text-foreground">Grátis</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-semibold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-primary">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Lista de Itens */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Itens do Pedido
                  </h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-accent/50 rounded-lg">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.brand} - {item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Tamanho: ${item.size}`}
                          {item.color && ` | Cor: ${item.color}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">R$ {item.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seleção de Método de Pagamento */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Escolha a Forma de Pagamento
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-accent/50 hover:border-primary/50'
                      }`}
                    >
                      <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-foreground">Cartão</p>
                      <p className="text-xs text-muted-foreground mt-1">Crédito ou Débito</p>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('boleto')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'boleto'
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-accent/50 hover:border-primary/50'
                      }`}
                    >
                      <div className="h-8 w-8 mx-auto mb-2 text-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <path d="M2 10h20"/>
                        </svg>
                      </div>
                      <p className="font-semibold text-foreground">Boleto</p>
                      <p className="text-xs text-muted-foreground mt-1">Até 3 dias</p>
                    </button>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      ℹ️ <strong>PIX temporariamente indisponível.</strong> Este método de pagamento precisa ser ativado no painel Stripe.
                    </p>
                  </div>

                  <div className="bg-accent rounded-lg p-4 text-sm text-muted-foreground">
                    {paymentMethod === 'card' && (
                      <>
                        <strong className="text-foreground">Cartão de Crédito/Débito:</strong>
                        <p className="mt-1">• Parcelamento disponível • Confirmação imediata</p>
                      </>
                    )}
                    {paymentMethod === 'boleto' && (
                      <>
                        <strong className="text-foreground">Boleto Bancário:</strong>
                        <p className="mt-1">• Vencimento em 3 dias úteis • Confirmação em até 2 dias úteis</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    onClick={handleStripeCheckout}
                    disabled={isLoading || items.length === 0}
                    className="hero-button flex-1"
                  >
                    {isLoading ? 'Processando...' : 'Ir para Pagamento'}
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
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
