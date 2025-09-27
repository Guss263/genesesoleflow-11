import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";

const Lifestyle = () => {
  const lifestyleProducts = [
    {
      id: "2",
      name: "Fashion Forward",
      brand: "TrendSetter",
      price: 319.99,
      image: sneaker2,
      rating: 4.8,
      isNew: true,
      isSale: false,
    },
    {
      id: "4",
      name: "Modern Classic",
      brand: "StyleIcon",
      price: 269.99,
      originalPrice: 299.99,
      image: sneaker4,
      rating: 4.7,
      isNew: false,
      isSale: true,
    },
    {
      id: "lif-3",
      name: "Retro Vibes",
      brand: "VintageStyle",
      price: 229.99,
      image: sneaker2,
      rating: 4.5,
      isNew: false,
      isSale: false,
    },
    {
      id: "lif-4",
      name: "Minimalist Chic",
      brand: "CleanDesign",
      price: 279.99,
      originalPrice: 319.99,
      image: sneaker4,
      rating: 4.6,
      isNew: false,
      isSale: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-accent/50">
          <div className="container">
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tênis Lifestyle
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Moda e conforto unidos em perfeita harmonia. Designs únicos que 
                expressam sua personalidade e estilo de vida.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {lifestyleProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Lifestyle;