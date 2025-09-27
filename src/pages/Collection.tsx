import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { allProducts, getProductsByCategory } from "@/data/products";

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos', count: allProducts.length },
    { id: 'running', name: 'Corrida', count: getProductsByCategory('running').length },
    { id: 'casual', name: 'Casual', count: getProductsByCategory('casual').length },
    { id: 'basketball', name: 'Basquete', count: getProductsByCategory('basketball').length },
    { id: 'lifestyle', name: 'Lifestyle', count: getProductsByCategory('lifestyle').length },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : getProductsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Nossa <span className="text-primary">Coleção Completa</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore todos os nossos modelos premium divididos por categoria. 
                Encontre o tênis perfeito para cada ocasião.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="px-6 py-2"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container">
            {activeCategory === 'all' ? (
              // Show all categories separately
              <div className="space-y-16">
                {['running', 'casual', 'basketball', 'lifestyle'].map((category) => {
                  const categoryProducts = getProductsByCategory(category);
                  const categoryNames = {
                    running: 'Corrida',
                    casual: 'Casual',
                    basketball: 'Basquete',
                    lifestyle: 'Lifestyle'
                  };
                  
                  return (
                    <div key={category}>
                      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                        {categoryNames[category as keyof typeof categoryNames]}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryProducts.map((product) => (
                          <ProductCard key={product.id} {...product} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Show filtered category
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collection;