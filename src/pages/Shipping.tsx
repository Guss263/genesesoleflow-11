import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, MapPin, Clock, Package } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Frete Grátis</h1>
        
        <section className="mb-12 bg-primary/10 p-8 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Frete Grátis em Todo o Brasil!</h2>
          </div>
          <p className="text-lg">
            Aproveite frete grátis para compras acima de R$ 299,00
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Prazos de Entrega</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Região Sudeste</h3>
              <p className="text-muted-foreground">5 a 7 dias úteis</p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Região Sul</h3>
              <p className="text-muted-foreground">7 a 10 dias úteis</p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Demais Regiões</h3>
              <p className="text-muted-foreground">10 a 15 dias úteis</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Opções de Frete</h2>
          <div className="space-y-4">
            <div className="p-6 border rounded-lg flex items-start gap-4">
              <Package className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Frete Padrão (Grátis acima de R$ 299)</h3>
                <p className="text-muted-foreground mb-2">Entrega nos prazos informados acima</p>
                <p className="text-sm">Rastreamento completo disponível</p>
              </div>
            </div>
            
            <div className="p-6 border rounded-lg flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Frete Expresso (R$ 29,90)</h3>
                <p className="text-muted-foreground mb-2">Entrega em até 3 dias úteis</p>
                <p className="text-sm">Disponível para capitais e regiões metropolitanas</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Informações Importantes</h2>
          <ul className="space-y-2">
            <li>• O prazo de entrega começa a contar após a aprovação do pagamento</li>
            <li>• Você receberá o código de rastreamento por email</li>
            <li>• É necessário que haja alguém no endereço para receber o pedido</li>
            <li>• Em caso de ausência, serão feitas até 3 tentativas de entrega</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
