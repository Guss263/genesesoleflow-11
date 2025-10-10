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
  const { items, total, clearCart } = useCart();

  const handleStripeCheckout = async () => {
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

      if (items.length === 0) {
        toast({
          title: "Carrinho vazio",
          description: "Adicione produtos ao carrinho antes de continuar.",
          variant: "destructive",
        });
        navigate('/cart');
        return;
      }

      // Create order in database first
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

      if (orderError) throw orderError;

      // Call Stripe checkout function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
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
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Clear cart before redirecting
        clearCart();
        
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout não recebida');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Erro ao processar pagamento",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
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

                {/* Informações de Pagamento Stripe */}
                <div className="bg-accent/50 rounded-lg p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Pagamento Seguro via Stripe</h3>
                      <p className="text-sm text-muted-foreground">
                        Você será redirecionado para o checkout seguro do Stripe
                      </p>
                    </div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-9">
                    <li>• Aceita cartões de crédito e débito</li>
                    <li>• Pagamento 100% seguro e criptografado</li>
                    <li>• Confirmação imediata</li>
                  </ul>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    onClick={handleStripeCheckout}
                    disabled={isLoading || items.length === 0}
                    className="hero-button flex-1"
                  >
                    {isLoading ? 'Processando...' : 'Pagar com Stripe'}
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
