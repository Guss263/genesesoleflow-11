import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
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
}

const NewReleases = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_new', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching new products:', error);
          return;
        }

        const transformed: ProductCardProps[] = data?.map(p => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          price: Number(p.price),
          originalPrice: p.original_price ? Number(p.original_price) : undefined,
          image: p.image_url || "/placeholder.svg",
          rating: Number(p.rating),
          isNew: p.is_new,
          isSale: p.is_sale,
        })) || [];

        setProducts(transformed);
      } catch (e) {
        console.error('Error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
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