import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";

const Basketball = () => {
  const basketballProducts = [
    {
      id: "1",
      name: "Court Master Pro",
      brand: "HoopTech",
      price: 399.99,
      image: sneaker1,
      rating: 4.9,
      isNew: true,
      isSale: false,
    },
    {
      id: "3",
      name: "Slam Dunk Elite",
      brand: "CourtKing",
      price: 359.99,
      originalPrice: 429.99,
      image: sneaker3,
      rating: 4.8,
      isNew: false,
      isSale: true,
    },
    {
      id: "bsk-3",
      name: "Triple Threat",
      brand: "GameChanger",
      price: 329.99,
      image: sneaker1,
      rating: 4.7,
      isNew: false,
      isSale: false,
    },
    {
      id: "bsk-4",
      name: "High Top Legend",
      brand: "ClassicCourt",
      price: 289.99,
      originalPrice: 349.99,
      image: sneaker3,
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
              <div className="text-6xl mb-4">🏀</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tênis Basketball
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Performance máxima para a quadra. Tecnologia avançada para suporte, 
                estabilidade e explosão em cada jogada.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {basketballProducts.map((product) => (
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

export default Basketball;