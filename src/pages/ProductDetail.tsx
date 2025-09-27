import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Star, Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";

// Mock data - em um app real viria de uma API
const getProductData = (id: string) => {
  const allProducts = {
    "1": {
      id: "1",
      name: "Air Max Revolution",
      brand: "SportTech",
      price: 299.99,
      originalPrice: 399.99,
      image: sneaker1,
      rating: 4.8,
      isNew: false,
      isSale: true,
      description: "Tênis de corrida com tecnologia avançada de amortecimento. Ideal para treinos intensos e corridas de longa distância.",
      colors: [
        { name: "Preto", value: "#000000", image: sneaker1 },
        { name: "Branco", value: "#FFFFFF", image: sneaker2 },
        { name: "Azul", value: "#0066CC", image: sneaker3 }
      ],
      sizes: ["38", "39", "40", "41", "42", "43", "44"]
    },
    "2": {
      id: "2",
      name: "Urban Classic",
      brand: "StreetStyle",
      price: 249.99,
      originalPrice: undefined,
      image: sneaker2,
      rating: 4.6,
      isNew: true,
      isSale: false,
      description: "Tênis casual urbano com design moderno. Perfeito para o dia a dia com muito estilo e conforto.",
      colors: [
        { name: "Branco", value: "#FFFFFF", image: sneaker2 },
        { name: "Cinza", value: "#808080", image: sneaker4 },
        { name: "Preto", value: "#000000", image: sneaker1 }
      ],
      sizes: ["36", "37", "38", "39", "40", "41", "42"]
    },
    "3": {
      id: "3",
      name: "Running Pro Elite",
      brand: "ActiveWear",
      price: 349.99,
      originalPrice: undefined,
      image: sneaker3,
      rating: 4.9,
      isNew: false,
      isSale: false,
      description: "Tênis profissional para corrida com máxima performance. Desenvolvido para atletas de alto rendimento.",
      colors: [
        { name: "Azul", value: "#0066CC", image: sneaker3 },
        { name: "Preto", value: "#000000", image: sneaker1 },
        { name: "Vermelho", value: "#CC0000", image: sneaker4 }
      ],
      sizes: ["39", "40", "41", "42", "43", "44", "45"]
    },
    "4": {
      id: "4",
      name: "Lifestyle Orange",
      brand: "CasualFit",
      price: 189.99,
      originalPrice: 229.99,
      image: sneaker4,
      rating: 4.5,
      isNew: false,
      isSale: true,
      description: "Tênis lifestyle com toque de cor vibrante. Combina com qualquer look casual e oferece conforto o dia todo.",
      colors: [
        { name: "Laranja", value: "#FF6600", image: sneaker4 },
        { name: "Branco", value: "#FFFFFF", image: sneaker2 },
        { name: "Azul", value: "#0066CC", image: sneaker3 }
      ],
      sizes: ["35", "36", "37", "38", "39", "40", "41"]
    }
  };

  return allProducts[id as keyof typeof allProducts] || null;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const product = getProductData(id || "");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>(product?.image || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container text-center">
            <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
            <Button onClick={() => navigate("/")}>Voltar à página inicial</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast({
        title: "Selecione uma cor",
        description: "Por favor, escolha uma cor antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSize) {
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, escolha um tamanho antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    const selectedColorObj = product.colors.find(color => color.name === selectedColor);
    
    addItem({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: selectedColorObj?.image || product.image,
      color: selectedColor,
      size: selectedSize,
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} (${selectedColor}, ${selectedSize}) foi adicionado ao seu carrinho.`,
    });
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-accent/50">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Color-based Image Thumbnails */}
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedImage(color.image);
                      setSelectedColor(color.name);
                    }}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedColor === color.name 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={color.image}
                      alt={`${product.name} - ${color.name}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground">Novo</Badge>
                )}
                {product.isSale && (
                  <Badge variant="destructive">Oferta</Badge>
                )}
              </div>

              {/* Title and Brand */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-lg text-muted-foreground">{product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.rating})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-3">
                <h3 className="font-semibold">
                  Cor: {selectedColor && <span className="text-primary">{selectedColor}</span>}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color.name);
                        setSelectedImage(color.image);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        selectedColor === color.name
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="font-semibold">
                  Tamanho: {selectedSize && <span className="text-primary">{selectedSize}</span>}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-lg border text-center transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
                
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t space-y-2 text-sm text-muted-foreground">
                <p>✓ Frete grátis para compras acima de R$ 199</p>
                <p>✓ Troca grátis em até 30 dias</p>
                <p>✓ Garantia de 1 ano</p>
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