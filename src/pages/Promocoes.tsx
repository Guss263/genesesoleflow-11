import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";

const Promocoes = () => {
  const promocionalProducts = [
    {
      id: "promo-1",
      name: "Air Max Revolution",
      brand: "SportTech",
      price: 179.99,
      originalPrice: 299.99,
      image: sneaker1,
      rating: 4.8,
      isNew: false,
      isSale: true,
    },
    {
      id: "promo-2",
      name: "Urban Classic",
      brand: "StreetStyle",
      price: 149.99,
      originalPrice: 249.99,
      image: sneaker2,
      rating: 4.6,
      isNew: false,
      isSale: true,
    },
    {
      id: "promo-3",
      name: "Running Pro Elite",
      brand: "ActiveWear",
      price: 209.99,
      originalPrice: 349.99,
      image: sneaker3,
      rating: 4.9,
      isNew: false,
      isSale: true,
    },
    {
      id: "promo-4",
      name: "Lifestyle Orange",
      brand: "CasualFit",
      price: 113.99,
      originalPrice: 189.99,
      image: sneaker4,
      rating: 4.5,
      isNew: false,
      isSale: true,
    },
    {
      id: "promo-5",
      name: "Speed Runner",
      brand: "FastTrack",
      price: 139.99,
      originalPrice: 219.99,
      image: sneaker1,
      rating: 4.7,
      isNew: false,
      isSale: true,
    },
    {
      id: "promo-6",
      name: "Casual Comfort",
      brand: "EasyWalk",
      price: 99.99,
      originalPrice: 159.99,
      image: sneaker2,
      rating: 4.4,
      isNew: false,
      isSale: true,
    },
  ];

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container">
            <div className="text-center">
              <Badge className="mb-4 bg-primary text-primary-foreground">
                🔥 OFERTAS ESPECIAIS
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Promoções 
                <span className="text-primary"> Imperdíveis</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Encontre os melhores tênis com descontos de até 40%. 
                Ofertas por tempo limitado!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  💰 Até 40% OFF
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  🚚 Frete Grátis
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  ⚡ Entrega Rápida
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tênis em Promoção
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Aproveite nossas ofertas especiais e garante já o seu tênis favorito
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {promocionalProducts.map((product) => (
                <div key={product.id} className="relative">
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-primary text-primary-foreground font-bold">
                      -{calculateDiscount(product.originalPrice!, product.price)}% OFF
                    </Badge>
                  </div>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="hero-button px-8 py-3 rounded-lg font-medium transition-all">
                Ver Mais Promoções
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">
                Não Perca Nenhuma Promoção!
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Cadastre-se em nossa newsletter e seja o primeiro a saber sobre 
                nossas ofertas exclusivas e lançamentos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                />
                <button className="hero-button px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap">
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Promocoes;