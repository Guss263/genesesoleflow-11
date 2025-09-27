import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";

const ProductGrid = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção especial dos tênis mais procurados e amados 
            pelos nossos clientes
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-12">
          <Link to="/collection">
            <button className="hero-button px-8 py-3 rounded-lg font-medium transition-all">
              Ver Todos os Produtos
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;