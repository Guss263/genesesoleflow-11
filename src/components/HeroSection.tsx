import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroSneaker from "@/assets/hero-sneaker.jpg";

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero min-h-[600px] flex items-center">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Encontre o
                <span className="text-primary block">tênis perfeito</span>
                para você
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Coleção exclusiva dos melhores tênis premium. Qualidade, conforto e 
                estilo para cada passo da sua jornada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/collection">
                <Button className="hero-button px-8 py-6 text-lg w-full">
                  Explorar Coleção
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="px-8 py-6 text-lg w-full">
                  Criar Conta
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Modelos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Marcas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Clientes</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <img
              src={heroSneaker}
              alt="Tênis Premium SoleFlow"
              className="w-full h-auto relative z-10 transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;