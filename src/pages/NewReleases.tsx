import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getNewProducts } from "@/data/products";

const NewReleases = () => {
  const newProducts = getNewProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-primary">Lançamentos</span> Exclusivos
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubra as últimas novidades em tênis premium. 
                Seja o primeiro a usar os modelos mais inovadores do mercado.
              </p>
            </div>
          </div>
        </section>

        {/* New Products Grid */}
        <section className="py-16">
          <div className="container">
            {newProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-4">Em breve!</h3>
                <p className="text-muted-foreground">
                  Novos lançamentos chegando em breve. Fique atento!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewReleases;