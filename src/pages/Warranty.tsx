import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, AlertCircle } from "lucide-react";

const Warranty = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Garantia</h1>
        
        <section className="mb-12 bg-primary/10 p-8 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Garantia de 90 Dias</h2>
          </div>
          <p className="text-lg">
            Todos os nossos produtos possuem garantia contra defeitos de fabricação
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">O que está coberto</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Defeitos de Fabricação</h3>
                <p className="text-muted-foreground">Costuras desfeitas, problemas de colagem, defeitos nos materiais</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Sola Descascando</h3>
                <p className="text-muted-foreground">Problemas de aderência da sola sem uso inadequado</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Deformação sem Uso</h3>
                <p className="text-muted-foreground">Alterações na estrutura sem desgaste natural</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">O que NÃO está coberto</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Desgaste Natural</h3>
                <p className="text-muted-foreground">Desgaste normal pelo uso do calçado</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Uso Inadequado</h3>
                <p className="text-muted-foreground">Danos causados por uso indevido ou práticas esportivas inadequadas</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Alterações</h3>
                <p className="text-muted-foreground">Produtos modificados ou customizados</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Má Conservação</h3>
                <p className="text-muted-foreground">Danos causados por armazenamento inadequado ou falta de manutenção</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Como Acionar a Garantia</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>Entre em contato através do nosso email ou telefone</li>
            <li>Envie fotos detalhadas do defeito apresentado</li>
            <li>Informe o número do pedido e data da compra</li>
            <li>Nossa equipe analisará o caso em até 48 horas</li>
            <li>Se aprovado, enviaremos instruções para devolução ou troca</li>
          </ol>
        </section>

        <section className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Importante</h2>
          <ul className="space-y-2">
            <li>• Guarde a nota fiscal e a caixa original</li>
            <li>• A garantia é válida apenas para o primeiro comprador</li>
            <li>• Produtos em promoção também possuem garantia</li>
            <li>• A análise técnica determina se o problema está coberto</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Warranty;
