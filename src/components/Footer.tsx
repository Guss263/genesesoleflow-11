import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  const footerSections = [{
    title: "Produtos",
    links: [{
      label: "Masculino",
      href: "#"
    }, {
      label: "Feminino",
      href: "#"
    }, {
      label: "Infantil",
      href: "#"
    }, {
      label: "Lançamentos",
      href: "#"
    }, {
      label: "Promoções",
      href: "#"
    }]
  }, {
    title: "Atendimento",
    links: [{
      label: "Central de Ajuda",
      href: "#"
    }, {
      label: "Trocas e Devoluções",
      href: "#"
    }, {
      label: "Guia de Tamanhos",
      href: "#"
    }, {
      label: "Frete Grátis",
      href: "#"
    }, {
      label: "Garantia",
      href: "#"
    }]
  }, {
    title: "Empresa",
    links: [{
      label: "Sobre Nós",
      href: "/about#sobre-nos"
    }, {
      label: "Trabalhe Conosco",
      href: "/about#trabalhe-conosco"
    }, {
      label: "Imprensa",
      href: "/about#imprensa"
    }, {
      label: "Sustentabilidade",
      href: "/about#sustentabilidade"
    }, {
      label: "Programa de Afiliados",
      href: "/about#programa-afiliados"
    }]
  }];
  const socialLinks = [{
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }, {
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }, {
    icon: Youtube,
    href: "#",
    label: "YouTube"
  }];
  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">GêneseFlow</h3>
            <p className="text-background/80 mb-6 leading-relaxed">
              Sua loja online de tênis premium. Oferecemos qualidade, conforto e 
              estilo para cada passo da sua jornada.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>Contato@Gêneseflow.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>(11) 9 91234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Campinas, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map(section => <div key={section.title}>
              <h4 className="font-semibold mb-4 text-primary">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => <li key={link.label}>
                    <a href={link.href} className="text-background/80 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>)}
              </ul>
            </div>)}
        </div>

        {/* Newsletter Subscription */}
        

        {/* Bottom Footer */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-background/60 text-sm text-center md:text-left">
              © 2024 SoleFlow. Todos os direitos reservados.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(social => <a key={social.label} href={social.href} className="text-background/60 hover:text-primary transition-colors" aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </a>)}
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;