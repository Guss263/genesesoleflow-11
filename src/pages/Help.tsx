import { Mail, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Central de Ajuda</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border rounded-lg">
            <Mail className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-muted-foreground mb-4">Resposta em até 24 horas</p>
            <a href="mailto:contato@geneseflow.com.br" className="text-primary hover:underline">
              contato@geneseflow.com.br
            </a>
          </div>
          
          <div className="p-6 border rounded-lg">
            <Phone className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Telefone</h3>
            <p className="text-sm text-muted-foreground mb-4">Seg-Sex: 9h às 18h</p>
            <a href="tel:+5519998206607" className="text-primary hover:underline">
              (19) 9 9820-6607
            </a>
          </div>
          
          <div className="p-6 border rounded-lg">
            <MessageCircle className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-4">Atendimento imediato</p>
            <a href="https://wa.me/5519998206607" className="text-primary hover:underline">
              Iniciar conversa
            </a>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <details className="p-4 border rounded-lg">
              <summary className="font-semibold cursor-pointer">Como faço para rastrear meu pedido?</summary>
              <p className="mt-2 text-muted-foreground">Você pode rastrear seu pedido através da página de Rastreamento de Pedidos usando o código fornecido no email de confirmação.</p>
            </details>
            <details className="p-4 border rounded-lg">
              <summary className="font-semibold cursor-pointer">Qual o prazo de entrega?</summary>
              <p className="mt-2 text-muted-foreground">O prazo varia de 5 a 15 dias úteis dependendo da sua região. Frete expresso disponível para entregas em até 3 dias úteis.</p>
            </details>
            <details className="p-4 border rounded-lg">
              <summary className="font-semibold cursor-pointer">Posso cancelar meu pedido?</summary>
              <p className="mt-2 text-muted-foreground">Sim, você pode cancelar seu pedido dentro de 24 horas após a compra. Entre em contato através dos nossos canais de atendimento.</p>
            </details>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
