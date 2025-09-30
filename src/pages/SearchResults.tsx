import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`name.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`);

      if (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        return;
      }

      const transformedProducts = data.map((product) => ({
        id: product.id,
        name: product.name,
        brand: product.brand || "GeneBrand",
        price: Number(product.price),
        image: product.image_url || "",
        rating: Number(product.rating) || 4.5,
        originalPrice: product.original_price ? Number(product.original_price) : undefined,
        isNew: product.is_new,
        isSale: product.is_sale,
      }));

      setProducts(transformedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Resultados da Busca
              </h1>
              {query && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Buscando por: <span className="font-semibold text-primary">"{query}"</span>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section className="py-16">
          <div className="container">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-4">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground">
                  {query 
                    ? `Não encontramos produtos para "${query}". Tente buscar com outros termos.`
                    : "Digite algo na barra de busca para encontrar produtos."
                  }
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

export default SearchResults;
