import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/hooks/useWishlist";
import { Link } from "react-router-dom";
import { useState } from "react";
import nikeAirMaxWhite from "@/assets/nike-air-max-white.jpg";
import converseChuckTaylor from "@/assets/converse-chuck-taylor.jpg";
import adidasUltraboost from "@/assets/adidas-ultraboost.jpg";
import airJordanRed from "@/assets/air-jordan-red.jpg";
import nikeAirForcePink from "@/assets/nike-air-force-pink.jpg";
import kidsSneakersColorful from "@/assets/kids-sneakers-colorful.jpg";

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
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(id));

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

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      const success = await removeFromWishlist(id);
      if (success) setIsWishlisted(false);
    } else {
      const success = await addToWishlist(id);
      if (success) setIsWishlisted(true);
    }
  };
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getImageSrc = () => {
    const imageMap: { [key: string]: string } = {
      'src/assets/nike-air-max-white.jpg': nikeAirMaxWhite,
      'src/assets/converse-chuck-taylor.jpg': converseChuckTaylor,
      'src/assets/adidas-ultraboost.jpg': adidasUltraboost,
      'src/assets/air-jordan-red.jpg': airJordanRed,
      'src/assets/nike-air-force-pink.jpg': nikeAirForcePink,
      'src/assets/kids-sneakers-colorful.jpg': kidsSneakersColorful,
    };
    return imageMap[image] || image || "/placeholder.svg";
  };

  return (
    <div className="product-card group">
      {/* Image Container */}
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden rounded-lg mb-3 md:mb-4 cursor-pointer">
          <img
            src={getImageSrc()}
            alt={name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
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
            className={`absolute top-3 right-3 bg-background/80 hover:bg-background ${isWishlisted ? 'text-destructive' : ''}`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>

          {/* Quick View Details */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              className="w-full hero-button"
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