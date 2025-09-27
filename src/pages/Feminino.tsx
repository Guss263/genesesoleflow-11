import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductsByGender } from "@/data/products";

const Feminino = () => {
  const feminineProducts = getProductsByGender('feminino');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Coleção <span className="text-primary">Feminina</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tênis femininos que combinam elegância e performance. 
                Estilo único para mulheres que não abrem mão do conforto.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {feminineProducts.map((product) => (
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

export default Feminino;