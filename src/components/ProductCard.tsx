import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

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

const ProductCard = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  rating,
  isNew,
  isSale,
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      brand,
      price,
      image,
    });
    
    toast({
      title: "Produto adicionado!",
      description: `${name} foi adicionado ao seu carrinho.`,
    });
  };
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="product-card group">
      {/* Image Container */}
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden rounded-lg mb-4 cursor-pointer">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-primary text-primary-foreground">Novo</Badge>
            )}
            {isSale && (
              <Badge variant="destructive">Oferta</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 hover:bg-background"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              className="w-full hero-button" 
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <Link to={`/product/${id}`}>
        <div className="space-y-2 cursor-pointer">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm text-muted-foreground">{rating}</span>
          </div>

          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>

          <p className="text-sm text-muted-foreground">{brand}</p>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;