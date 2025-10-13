import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <p className="text-muted-foreground mb-4">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p>
              A GêneseFlow valoriza sua privacidade e está comprometida em proteger seus dados pessoais. 
              Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Informações que Coletamos</h2>
            <p className="mb-3">Coletamos as seguintes categorias de informações:</p>
            
            <h3 className="text-xl font-semibold mb-2">1.1 Informações Fornecidas por Você</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Nome completo</li>
              <li>Email</li>
              <li>Telefone</li>
              <li>Endereço de entrega</li>
              <li>CPF/CNPJ</li>
              <li>Informações de pagamento (processadas por terceiros seguros)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">1.2 Informações Coletadas Automaticamente</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Endereço IP</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo de navegação</li>
              <li>Cookies e tecnologias similares</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Como Usamos suas Informações</h2>
            <p className="mb-3">Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processar e entregar seus pedidos</li>
              <li>Enviar confirmações e atualizações sobre seu pedido</li>
              <li>Fornecer atendimento ao cliente</li>
              <li>Processar pagamentos e prevenir fraudes</li>
              <li>Enviar comunicações de marketing (com seu consentimento)</li>
              <li>Melhorar nosso site e serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Compartilhamento de Informações</h2>
            <p className="mb-3">Podemos compartilhar suas informações com:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Prestadores de Serviço:</strong> Empresas de entrega, processadores de pagamento</li>
              <li><strong>Parceiros de Marketing:</strong> Apenas com seu consentimento explícito</li>
              <li><strong>Autoridades Legais:</strong> Quando exigido por lei</li>
            </ul>
            <p className="mt-3">
              Nunca vendemos seus dados pessoais para terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
            <p className="mb-3">
              Utilizamos cookies para melhorar sua experiência de navegação. Cookies são pequenos arquivos 
              armazenados no seu dispositivo que nos ajudam a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lembrar suas preferências</li>
              <li>Manter você conectado</li>
              <li>Analisar o tráfego do site</li>
              <li>Personalizar conteúdo e anúncios</li>
            </ul>
            <p className="mt-3">
              Você pode gerenciar cookies através das configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações 
              contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Criptografia SSL/TLS</li>
              <li>Armazenamento seguro de dados</li>
              <li>Acesso restrito a informações pessoais</li>
              <li>Monitoramento regular de segurança</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Seus Direitos</h2>
            <p className="mb-3">De acordo com a LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou incorretos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Revogar consentimento</li>
              <li>Portabilidade dos dados</li>
              <li>Informação sobre compartilhamento de dados</li>
            </ul>
            <p className="mt-3">
              Para exercer seus direitos, entre em contato através do email: contato@geneseflow.com.br
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Retenção de Dados</h2>
            <p>
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas 
              nesta política, a menos que um período de retenção maior seja exigido ou permitido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Menores de Idade</h2>
            <p>
              Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente 
              informações de menores. Se você é pai/mãe e acredita que seu filho forneceu informações, 
              entre em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças 
              significativas através do nosso site ou por email. A data da última atualização será sempre 
              indicada no topo desta página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contato</h2>
            <p className="mb-3">
              Para questões sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> contato@geneseflow.com.br</li>
              <li><strong>Telefone:</strong> (19) 9 9820-6607</li>
              <li><strong>Endereço:</strong> Campinas, SP - Brasil</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
