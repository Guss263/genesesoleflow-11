import sneaker1 from "@/assets/sneaker-1.jpg";
import sneaker2 from "@/assets/sneaker-2.jpg";
import sneaker3 from "@/assets/sneaker-3.jpg";
import sneaker4 from "@/assets/sneaker-4.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isNew: boolean;
  isSale: boolean;
  category: 'running' | 'casual' | 'basketball' | 'lifestyle';
  gender: 'masculino' | 'feminino' | 'infantil';
  description?: string;
}

export const allProducts: Product[] = [
  // Running
  {
    id: "1",
    name: "Air Max Revolution",
    brand: "SportTech",
    price: 299.99,
    originalPrice: 399.99,
    image: sneaker1,
    rating: 4.8,
    isNew: false,
    isSale: true,
    category: 'running',
    gender: 'masculino',
    description: "Tênis de corrida com tecnologia de amortecimento avançada"
  },
  {
    id: "2",
    name: "Urban Classic",
    brand: "StreetStyle",
    price: 249.99,
    image: sneaker2,
    rating: 4.6,
    isNew: true,
    isSale: false,
    category: 'casual',
    gender: 'feminino',
    description: "Estilo urbano com conforto para o dia a dia"
  },
  {
    id: "3",
    name: "Running Pro Elite",
    brand: "ActiveWear",
    price: 349.99,
    image: sneaker3,
    rating: 4.9,
    isNew: false,
    isSale: false,
    category: 'running',
    gender: 'masculino',
    description: "Performance profissional para atletas de elite"
  },
  {
    id: "4",
    name: "Lifestyle Orange",
    brand: "CasualFit",
    price: 189.99,
    originalPrice: 229.99,
    image: sneaker4,
    rating: 4.5,
    isNew: false,
    isSale: true,
    category: 'lifestyle',
    gender: 'feminino',
    description: "Estilo vibrante para um visual moderno"
  },
  {
    id: "5",
    name: "Speed Runner X",
    brand: "VelocityFit",
    price: 279.99,
    image: sneaker1,
    rating: 4.7,
    isNew: true,
    isSale: false,
    category: 'running',
    gender: 'masculino',
    description: "Máxima velocidade e performance"
  },
  {
    id: "6",
    name: "Court Master",
    brand: "BasketPro",
    price: 329.99,
    image: sneaker2,
    rating: 4.8,
    isNew: false,
    isSale: false,
    category: 'basketball',
    gender: 'masculino',
    description: "Domínio total nas quadras de basquete"
  },
  {
    id: "7",
    name: "Comfort Walk",
    brand: "DailyFit",
    price: 159.99,
    originalPrice: 199.99,
    image: sneaker3,
    rating: 4.4,
    isNew: false,
    isSale: true,
    category: 'casual',
    gender: 'feminino',
    description: "Conforto extremo para uso diário"
  },
  {
    id: "8",
    name: "Mini Explorer",
    brand: "KidsActive",
    price: 129.99,
    image: sneaker4,
    rating: 4.6,
    isNew: true,
    isSale: false,
    category: 'casual',
    gender: 'infantil',
    description: "Aventura e diversão para os pequenos"
  },
  {
    id: "9",
    name: "Fashion Forward",
    brand: "TrendSet",
    price: 219.99,
    image: sneaker1,
    rating: 4.5,
    isNew: true,
    isSale: false,
    category: 'lifestyle',
    gender: 'feminino',
    description: "Tendência e estilo em cada passo"
  },
  {
    id: "10",
    name: "Slam Dunk Pro",
    brand: "HoopMaster",
    price: 389.99,
    image: sneaker2,
    rating: 4.9,
    isNew: false,
    isSale: false,
    category: 'basketball',
    gender: 'masculino',
    description: "Performance profissional para o basquete"
  },
  {
    id: "11",
    name: "Little Champion",
    brand: "KidsWin",
    price: 99.99,
    originalPrice: 119.99,
    image: sneaker3,
    rating: 4.3,
    isNew: false,
    isSale: true,
    category: 'running',
    gender: 'infantil',
    description: "Primeiros passos rumo à vitória"
  },
  {
    id: "12",
    name: "Street Vibes",
    brand: "UrbanStyle",
    price: 259.99,
    image: sneaker4,
    rating: 4.6,
    isNew: true,
    isSale: false,
    category: 'lifestyle',
    gender: 'masculino',
    description: "Estilo urbano autêntico"
  }
];

// Function to get custom products from localStorage
export const getCustomProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  const customProducts = localStorage.getItem("customProducts");
  return customProducts ? JSON.parse(customProducts) : [];
};

// Function to get all products (original + custom)
export const getAllProducts = (): Product[] => {
  return [...allProducts, ...getCustomProducts()];
};

export const getProductsByCategory = (category: string) => {
  const allProductsList = getAllProducts();
  return allProductsList.filter(product => product.category === category);
};

export const getProductsByGender = (gender: string) => {
  const allProductsList = getAllProducts();
  return allProductsList.filter(product => product.gender === gender);
};

export const getNewProducts = () => {
  const allProductsList = getAllProducts();
  return allProductsList.filter(product => product.isNew);
};

export const getFeaturedProducts = () => {
  const allProductsList = getAllProducts();
  return allProductsList.slice(0, 4);
};