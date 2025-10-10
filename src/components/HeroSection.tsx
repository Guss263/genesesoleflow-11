import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroSneaker from "@/assets/hero-sneaker.jpg";

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero min-h-[500px] md:min-h-[600px] flex items-center px-4 py-8 md:py-0">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Encontre o
                <span className="text-primary block">tênis perfeito</span>
                para você
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg">
                Coleção exclusiva dos melhores tênis premium. Qualidade, conforto e 
                estilo para cada passo da sua jornada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to="/collection" className="w-full sm:w-auto">
                <Button className="hero-button px-6 md:px-8 py-4 md:py-6 text-base md:text-lg w-full">
                  Explorar Coleção
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="outline" className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg w-full">
                  Criar Conta
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-primary">500+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Modelos</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-primary">50+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Marcas</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-primary">10k+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Clientes</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <img
              src={heroSneaker}
              alt="Tênis Premium GêneseFlow"
              className="w-full h-auto relative z-10 transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;