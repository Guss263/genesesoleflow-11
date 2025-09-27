import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  category: string;
  gender: string;
}

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    { id: "all", name: "Todos os Produtos", count: 0 },
    { id: "running", name: "Running", count: 0 },
    { id: "casual", name: "Casual", count: 0 },
    { id: "basketball", name: "Basketball", count: 0 },
    { id: "lifestyle", name: "Lifestyle", count: 0 },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        
        const transformedProducts: ProductCardProps[] = data?.map(product => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: Number(product.price),
          originalPrice: product.original_price ? Number(product.original_price) : undefined,
          image: product.image_url || "/placeholder.svg",
          rating: Number(product.rating),
          isNew: product.is_new,
          isSale: product.is_sale,
          category: product.category,
          gender: product.gender
        })) || [];
        
        setProducts(transformedProducts);
        
        // Update categories with counts
        const updatedCategories = [
          { id: "all", name: "Todos os Produtos", count: transformedProducts.length },
          { id: "running", name: "Running", count: transformedProducts.filter(p => p.category === 'running').length },
          { id: "casual", name: "Casual", count: transformedProducts.filter(p => p.category === 'casual').length },
          { id: "basketball", name: "Basketball", count: transformedProducts.filter(p => p.category === 'basketball').length },
          { id: "lifestyle", name: "Lifestyle", count: transformedProducts.filter(p => p.category === 'lifestyle').length },
        ];
        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-lg border transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            ) : activeCategory === "all" ? (
              // Show products grouped by category
              <div className="space-y-16">
                {categories.slice(1).map((category) => {
                  const categoryProducts = products.filter(p => p.category === category.id);
                  if (categoryProducts.length === 0) return null;
                  
                  return (
                    <div key={category.id}>
                      <h2 className="text-2xl font-bold mb-6 capitalize">{category.name}</h2>
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
              // Show filtered products
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