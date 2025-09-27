import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";

const Casual = () => {
  const casualProducts = [
    {
      id: "2",
      name: "Urban Classic",
      brand: "StreetStyle",
      price: 249.99,
      image: sneaker2,
      rating: 4.6,
      isNew: true,
      isSale: false,
    },
    {
      id: "4",
      name: "Lifestyle Orange",
      brand: "CasualFit",
      price: 189.99,
      originalPrice: 229.99,
      image: sneaker4,
      rating: 4.5,
      isNew: false,
      isSale: true,
    },
    {
      id: "cas-3",
      name: "City Walker",
      brand: "UrbanStep",
      price: 199.99,
      image: sneaker2,
      rating: 4.4,
      isNew: false,
      isSale: false,
    },
    {
      id: "cas-4",
      name: "Street Comfort",
      brand: "DailyWear",
      price: 169.99,
      originalPrice: 199.99,
      image: sneaker4,
      rating: 4.3,
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
              <div className="text-6xl mb-4">👟</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tênis Casual
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estilo urbano para o seu dia a dia. Conforto e design que se adaptam 
                a qualquer ocasião, do trabalho ao lazer.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {casualProducts.map((product) => (
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

export default Casual;