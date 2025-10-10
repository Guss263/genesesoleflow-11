import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      id: "running",
      name: "Running",
      description: "Tênis para corrida e exercícios",
      icon: "🏃‍♂️",
      color: "from-blue-500 to-cyan-500",
      href: "/running",
    },
    {
      id: "casual",
      name: "Casual",
      description: "Estilo urbano para o dia a dia",
      icon: "👟",
      color: "from-green-500 to-emerald-500",
      href: "/casual",
    },
    {
      id: "basketball",
      name: "Basketball",
      description: "Performance para quadra",
      icon: "🏀",
      color: "from-orange-500 to-red-500",
      href: "/basketball",
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Moda e conforto unidos",
      icon: "✨",
      color: "from-purple-500 to-pink-500",
      href: "/lifestyle",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-accent/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Explore por Categoria
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Encontre o tênis ideal para cada momento
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.href}>
              <div className="group relative overflow-hidden rounded-xl bg-card border border-border p-8 text-center hover:shadow-card transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;