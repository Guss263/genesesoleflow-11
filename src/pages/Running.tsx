import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";

const Running = () => {
  const runningProducts = [
    {
      id: "1",
      name: "Air Max Revolution",
      brand: "SportTech",
      price: 299.99,
      originalPrice: 399.99,
      image: sneaker1,
      rating: 4.8,
      isNew: false,
      isSale: true,
    },
    {
      id: "3",
      name: "Running Pro Elite",
      brand: "ActiveWear",
      price: 349.99,
      image: sneaker3,
      rating: 4.9,
      isNew: false,
      isSale: false,
    },
    {
      id: "run-3",
      name: "Speed Runner",
      brand: "FastTrack",
      price: 279.99,
      image: sneaker1,
      rating: 4.7,
      isNew: true,
      isSale: false,
    },
    {
      id: "run-4",
      name: "Marathon Master",
      brand: "EnduranceGear",
      price: 389.99,
      originalPrice: 429.99,
      image: sneaker3,
      rating: 4.9,
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
              <div className="text-6xl mb-4">🏃‍♂️</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tênis Running
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubra nossa coleção completa de tênis para corrida. Performance, 
                conforto e tecnologia para levar você além dos seus limites.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {runningProducts.map((product) => (
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

export default Running;