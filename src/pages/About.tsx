import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Users, Newspaper, Leaf, HandHeart, ArrowUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const About = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Conheça a GeneseFLOW
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sua marca de confiança em calçados esportivos e lifestyle
          </p>
          
          {/* Navigation Menu */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <a href="#sobre-nos">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Sobre Nós
              </Button>
            </a>
            <a href="#trabalhe-conosco">
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Trabalhe Conosco
              </Button>
            </a>
            <a href="#imprensa">
              <Button variant="outline" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                Imprensa
              </Button>
            </a>
            <a href="#sustentabilidade">
              <Button variant="outline" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Sustentabilidade
              </Button>
            </a>
            <a href="#programa-afiliados">
              <Button variant="outline" className="flex items-center gap-2">
                <HandHeart className="h-4 w-4" />
                Programa de Afiliados
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Sobre Nós */}
        <section id="sobre-nos" className="scroll-mt-24">
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Sobre Nós</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  A GeneseFLOW nasceu da paixão pelo movimento e pela inovação. Desde 2010, nos dedicamos a criar calçados 
                  que combinam tecnologia de ponta, design exclusivo e conforto excepcional para atletas e entusiastas do 
                  lifestyle esportivo.
                </p>
                <p className="text-lg leading-relaxed">
                  Nossa missão é impulsionar cada passo da sua jornada, seja nas pistas de corrida, quadras de basquete 
                  ou no dia a dia urbano. Acreditamos que cada pessoa merece calçados que reflitam sua personalidade e 
                  apoiem seus objetivos.
                </p>
                <p className="text-lg leading-relaxed">
                  Com mais de uma década de experiência, a GeneseFLOW se tornou referência em qualidade, inovação e 
                  atendimento ao cliente, conquistando a confiança de milhares de pessoas em todo o Brasil.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Trabalhe Conosco */}
        <section id="trabalhe-conosco" className="scroll-mt-24">
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Trabalhe Conosco</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Na GeneseFLOW, acreditamos que nossos colaboradores são o coração da empresa. Buscamos pessoas 
                  apaixonadas, criativas e determinadas que compartilhem nossa visão de inovação e excelência.
                </p>
                <p className="text-lg leading-relaxed">
                  Oferecemos um ambiente de trabalho dinâmico, oportunidades de crescimento profissional e um 
                  pacote de benefícios competitivo. Se você quer fazer parte de uma equipe que está moldando o 
                  futuro dos calçados esportivos, queremos conhecer você!
                </p>
                <div className="bg-muted p-6 rounded-lg mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Como se candidatar:</h3>
                  <p className="text-lg mb-2">
                    Envie seu currículo e uma carta de apresentação para:
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-lg">
                    <Mail className="h-5 w-5" />
                    <a href="mailto:contato@geneseflow.com.br" className="hover:underline">
                      contato@geneseflow.com.br
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Imprensa */}
        <section id="imprensa" className="scroll-mt-24">
          <Card className="shadow-card">
            
          </Card>
        </section>

        <Separator />

        {/* Sustentabilidade */}
        <section id="sustentabilidade" className="scroll-mt-24">
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Sustentabilidade</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Na GeneseFLOW, acreditamos que a responsabilidade ambiental é fundamental para o futuro do planeta 
                  e do esporte. Nosso compromisso com a sustentabilidade está presente em cada etapa do nosso processo 
                  produtivo.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Nossas Iniciativas:</h3>
                    <ul className="space-y-2">
                      <li>• Materiais reciclados em 80% dos produtos</li>
                      <li>• Energia renovável em todas as fábricas</li>
                      <li>• Programa de reciclagem de calçados usados</li>
                      <li>• Embalagens biodegradáveis</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Metas 2025:</h3>
                    <ul className="space-y-2">
                      <li>• Neutralidade de carbono</li>
                      <li>• 100% de materiais sustentáveis</li>
                      <li>• Zero desperdício na produção</li>
                      <li>• 1 milhão de calçados reciclados</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Programa de Afiliados */}
        <section id="programa-afiliados" className="scroll-mt-24">
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <HandHeart className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Programa de Afiliados</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Junte-se ao Programa de Afiliados GeneseFLOW e ganhe dinheiro compartilhando os produtos que você ama. 
                  Nossa plataforma oferece ferramentas completas para maximizar seus ganhos e acompanhar seu desempenho.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">10%</h3>
                    <p className="font-semibold">Comissão por venda</p>
                  </div>
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">30 dias</h3>
                    <p className="font-semibold">Cookie de rastreamento</p>
                  </div>
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">R$ 0</h3>
                    <p className="font-semibold">Taxa de adesão</p>
                  </div>
                </div>
                <div className="bg-gradient-primary p-6 rounded-lg mt-6 text-center">
                  <h3 className="text-xl font-semibold text-primary-foreground mb-3">
                    Benefícios Exclusivos:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-primary-foreground">
                    <div>• Material promocional gratuito</div>
                    <div>• Suporte dedicado 24/7</div>
                    <div>• Dashboard em tempo real</div>
                    <div>• Pagamentos mensais garantidos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button onClick={scrollToTop} size="icon" className="h-12 w-12 rounded-full shadow-glow">
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>

      <Footer />
    </div>;
};
export default About;