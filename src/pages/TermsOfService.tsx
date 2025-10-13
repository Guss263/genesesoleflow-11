import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <p className="text-muted-foreground mb-4">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p>
              Bem-vindo à GêneseFlow. Ao acessar e usar nosso site, você concorda com os seguintes 
              termos e condições. Por favor, leia-os cuidadosamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este site, você aceita e concorda em cumprir estes Termos de Uso e 
              todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, 
              está proibido de usar ou acessar este site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Uso do Site</h2>
            
            <h3 className="text-xl font-semibold mb-2">2.1 Licença de Uso</h3>
            <p className="mb-3">
              É concedida permissão para visualizar e usar o conteúdo deste site apenas para uso pessoal 
              e não comercial. Esta licença não inclui:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Modificação ou cópia dos materiais</li>
              <li>Uso dos materiais para fins comerciais</li>
              <li>Tentativa de descompilar ou fazer engenharia reversa</li>
              <li>Remoção de direitos autorais ou outras notações proprietárias</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">2.2 Conta de Usuário</h3>
            <p>
              Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em 
              aceitar a responsabilidade por todas as atividades que ocorram sob sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Produtos e Preços</h2>
            
            <h3 className="text-xl font-semibold mb-2">3.1 Disponibilidade</h3>
            <p className="mb-3">
              Fazemos todos os esforços para exibir com precisão as cores e imagens dos produtos. 
              No entanto, não podemos garantir que a exibição de qualquer cor seja precisa.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.2 Preços</h3>
            <p className="mb-3">
              Todos os preços estão em Reais (BRL) e incluem impostos aplicáveis. Reservamo-nos o 
              direito de modificar preços a qualquer momento sem aviso prévio.
            </p>

            <h3 className="text-xl font-semibold mb-2">3.3 Estoque</h3>
            <p>
              Todos os pedidos estão sujeitos à disponibilidade de estoque. Se um produto estiver 
              indisponível após a compra, notificaremos você e ofereceremos reembolso total.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Pedidos e Pagamentos</h2>
            
            <h3 className="text-xl font-semibold mb-2">4.1 Processamento de Pedidos</h3>
            <p className="mb-3">
              Reservamo-nos o direito de recusar ou cancelar qualquer pedido por qualquer motivo, 
              incluindo mas não limitado a:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Disponibilidade limitada do produto</li>
              <li>Erros no preço ou na descrição do produto</li>
              <li>Suspeita de fraude</li>
              <li>Problemas identificados por nosso departamento de crédito</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">4.2 Métodos de Pagamento</h3>
            <p>
              Aceitamos diversos métodos de pagamento, incluindo cartões de crédito, débito e PIX. 
              Todos os pagamentos são processados através de plataformas seguras de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Entrega</h2>
            <p className="mb-3">
              As entregas são realizadas pelos Correios ou transportadoras parceiras. Os prazos de 
              entrega são estimativas e podem variar. Não nos responsabilizamos por atrasos causados 
              por greves, condições climáticas ou outras circunstâncias fora do nosso controle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Devoluções e Reembolsos</h2>
            <p className="mb-3">
              Você pode devolver produtos dentro de 30 dias após o recebimento, desde que estejam em 
              condições originais. Para mais detalhes, consulte nossa página de Trocas e Devoluções.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo deste site, incluindo mas não limitado a textos, gráficos, logos, imagens 
              e software, é propriedade da GêneseFlow e está protegido pelas leis de direitos autorais 
              brasileiras e internacionais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Limitação de Responsabilidade</h2>
            <p className="mb-3">
              Em nenhum caso a GêneseFlow será responsável por quaisquer danos (incluindo, sem limitação, 
              danos por perda de dados ou lucro) decorrentes do uso ou da incapacidade de usar os 
              materiais deste site, mesmo que a GêneseFlow tenha sido notificada oralmente ou por 
              escrito da possibilidade de tais danos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Links para Sites de Terceiros</h2>
            <p>
              Nosso site pode conter links para sites de terceiros. Não temos controle sobre o conteúdo 
              ou práticas de privacidade desses sites e não assumimos responsabilidade por eles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Modificações dos Termos</h2>
            <p>
              Reservamo-nos o direito de revisar estes termos de uso a qualquer momento sem aviso prévio. 
              Ao usar este site, você concorda em estar vinculado à versão atual destes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Lei Aplicável</h2>
            <p>
              Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil, 
              e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais brasileiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Contato</h2>
            <p className="mb-3">
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> contato@geneseflow.com.br</li>
              <li><strong>Telefone:</strong> (19) 9 9820-6607</li>
              <li><strong>Endereço:</strong> Campinas, SP - Brasil</li>
            </ul>
          </section>

          <section className="bg-muted p-6 rounded-lg">
            <p className="font-semibold">
              Ao continuar a usar nosso site, você reconhece que leu, entendeu e concordou em estar 
              vinculado a estes Termos de Uso.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
