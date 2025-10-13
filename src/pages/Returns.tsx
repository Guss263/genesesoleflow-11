import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, RefreshCw, Clock, CheckCircle } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Trocas e Devoluções</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Política de Trocas</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Na GêneseFlow, você tem até 30 dias após o recebimento do produto para solicitar troca ou devolução.
            </p>
            <p className="mb-4">
              Os produtos devem estar em perfeito estado, sem sinais de uso, com todas as etiquetas originais e na embalagem original.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Como Solicitar</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Entre em Contato</h3>
              <p className="text-sm text-muted-foreground">Envie um email com seu número de pedido</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. Aguarde Aprovação</h3>
              <p className="text-sm text-muted-foreground">Analisaremos sua solicitação em até 48h</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. Envie o Produto</h3>
              <p className="text-sm text-muted-foreground">Você receberá uma etiqueta de devolução</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">4. Receba Reembolso</h3>
              <p className="text-sm text-muted-foreground">Em até 10 dias após recebimento</p>
            </div>
          </div>
        </section>

        <section className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Condições Importantes</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Produto sem uso e com etiquetas originais</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Embalagem original em perfeito estado</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Nota fiscal acompanhando o produto</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Prazo de 30 dias após recebimento</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
