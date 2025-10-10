import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment', { 
      state: { 
        cartItems: items,
        cartTotal: total,
        cartItemCount: itemCount
      } 
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container">
            <div className="text-center max-w-md mx-auto">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
              <p className="text-muted-foreground mb-8">
                Adicione alguns produtos incríveis ao seu carrinho
              </p>
              <Link to="/">
                <Button size="lg">Continuar Comprando</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Carrinho de Compras</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      {item.color && (
                        <p className="text-sm text-muted-foreground">Cor: {item.color}</p>
                      )}
                      {item.size && (
                        <p className="text-sm text-muted-foreground">Tamanho: {item.size}</p>
                      )}
                      <p className="font-bold text-primary">R$ {item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-8 text-center">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline" onClick={clearCart}>
                    Limpar Carrinho
                  </Button>
                  <Link to="/">
                    <Button variant="ghost">Continuar Comprando</Button>
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-accent/50 p-6 rounded-lg h-fit">
                <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Itens ({itemCount})</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Finalizar Compra
                </Button>
                
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Frete grátis para compras acima de R$ 199
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;