import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, Package, Truck, MapPin } from 'lucide-react';

const OrderTracking = () => {
  const location = useLocation();
  const { orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase(), cartTotal = 0 } = location.state || {};

  const trackingSteps = [
    {
      icon: CheckCircle2,
      title: 'Pedido Recebido',
      description: 'Seu pedido foi confirmado com sucesso',
      status: 'complete',
      time: 'Agora'
    },
    {
      icon: Package,
      title: 'Em Preparação',
      description: 'Estamos separando seus produtos',
      status: 'current',
      time: 'Em breve'
    },
    {
      icon: Truck,
      title: 'Em Transporte',
      description: 'Seu pedido está a caminho',
      status: 'pending',
      time: 'Aguardando'
    },
    {
      icon: MapPin,
      title: 'Entregue',
      description: 'Pedido entregue no endereço',
      status: 'pending',
      time: 'Aguardando'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="product-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <CheckCircle2 className="h-16 w-16 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl text-foreground mb-2">
                Pedido Confirmado!
              </CardTitle>
              <p className="text-muted-foreground">
                Seu pedido foi recebido e será processado em breve
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Informações do Pedido */}
              <div className="bg-accent rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Número do Pedido</p>
                    <p className="font-semibold text-foreground">#{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valor Total</p>
                    <p className="font-semibold text-primary">R$ {cartTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Status de Acompanhamento */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Acompanhe seu Pedido
                </h3>
                
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`
                          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                          ${step.status === 'complete' ? 'bg-primary text-primary-foreground' : ''}
                          ${step.status === 'current' ? 'bg-primary/20 text-primary' : ''}
                          ${step.status === 'pending' ? 'bg-muted text-muted-foreground' : ''}
                        `}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className={`font-semibold ${
                                step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                              }`}>
                                {step.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {step.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Informação Adicional */}
              <div className="bg-accent rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Próximos Passos
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Seu pedido será embalado com cuidado</li>
                  <li>• Você receberá um e-mail com o código de rastreamento</li>
                  <li>• A entrega será realizada em até 7 dias úteis</li>
                  <li>• Qualquer dúvida, entre em contato conosco</li>
                </ul>
              </div>

              {/* Botão de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="hero-button flex-1">
                  <Link to="/">Continuar Comprando</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/about">Fale Conosco</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTracking;
