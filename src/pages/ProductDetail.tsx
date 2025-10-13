import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, Heart, ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getAllProducts } from "@/data/products";
interface ProductData {
  id: string;
  name: string;
  brand: string;
  price: number;
  original_price?: number;
  image_url?: string;
  rating: number;
  is_new: boolean;
  is_sale: boolean;
  description?: string;
  sizes?: string[];
  category: string;
  gender: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);

      try {
        // Se o ID não for UUID, tente buscar nos produtos locais (páginas estáticas)
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(id);
        if (!isUUID) {
          const local = getAllProducts().find(p => p.id === id);
          if (local) {
            setProduct({
              id: local.id,
              name: local.name,
              brand: local.brand,
              price: local.price,
              original_price: local.originalPrice,
              image_url: typeof local.image === 'string' ? local.image : "/placeholder.svg",
              rating: local.rating,
              is_new: local.isNew,
              is_sale: local.isSale,
              description: local.description,
              sizes: undefined,
              category: local.category,
              gender: local.gender,
            });
          } else {
            setProduct(null);
          }
          return;
        }

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching product:', error);
          setProduct(null);
          return;
        }
        setProduct(data);
      } catch (error) {
        console.error('Error:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, escolha um tamanho antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image_url || "/placeholder.svg",
      color: selectedColor || "Padrão",
      size: selectedSize || "Único",
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-96 w-full" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-20" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <p className="text-muted-foreground mb-8">
              O produto que você está procurando não existe ou foi removido.
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar à página inicial
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center mb-6 hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Product Info */}
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary">Início</Link>
                <span>/</span>
                <Link to="/collection" className="hover:text-primary">Produtos</Link>
                <span>/</span>
                <span>{product.category}</span>
              </div>

              {/* Title and Brand */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.is_new && <Badge variant="secondary">Novo</Badge>}
                  {product.is_sale && <Badge variant="destructive">Oferta</Badge>}
                </div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-lg text-muted-foreground">{product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating}
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                </div>
                {product.original_price && (
                  <p className="text-sm text-green-600 font-medium">
                    Economize {formatPrice(product.original_price - product.price)}
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Tamanho</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 text-center border rounded-md transition-colors ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full hero-button py-6 text-lg"
                  size="lg"
                >
                  Adicionar ao Carrinho - {formatPrice(product.price)}
                </Button>
                
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Favoritar
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2 pt-6 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Categoria:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coleção:</span>
                  <span className="capitalize">{product.gender}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Marca:</span>
                  <span>{product.brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;