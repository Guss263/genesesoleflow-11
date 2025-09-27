import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sizes: "",
    collection: "",
    brand: "",
    price: "",
    category: ""
  });
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    // Check if user is authenticated as admin
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const collections = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "infantil", label: "Infantil" }
  ];

  const categories = [
    { value: "running", label: "Running" },
    { value: "casual", label: "Casual" },
    { value: "basketball", label: "Basketball" },
    { value: "lifestyle", label: "Lifestyle" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.collection || !formData.category || !formData.price) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Create new product object
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand || "GeneBrand",
      price: parseFloat(formData.price),
      image: "/placeholder.svg", // Placeholder for now
      rating: 4.5,
      isNew: true,
      isSale: false,
      category: formData.category as Product['category'],
      gender: formData.collection as Product['gender'],
      description: formData.description
    };

    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
    
    // Add new product
    const updatedProducts = [...existingProducts, newProduct];
    
    // Save to localStorage
    localStorage.setItem("customProducts", JSON.stringify(updatedProducts));

    toast({
      title: "Sucesso!",
      description: "Produto adicionado com sucesso.",
    });

    // Clear form
    setFormData({
      name: "",
      description: "",
      sizes: "",
      collection: "",
      brand: "",
      price: "",
      category: ""
    });
    setImages(null);
    
    // Reset file input
    const fileInput = document.getElementById("images") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Gerenciador de Produtos</h1>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Adicionar/Editar Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    placeholder="Nome da marca"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sizes">Tamanhos Disponíveis</Label>
                  <Input
                    id="sizes"
                    value={formData.sizes}
                    onChange={(e) => handleInputChange("sizes", e.target.value)}
                    placeholder="ex: 38, 39, 40, 41, 42"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collection">Coleção *</Label>
                  <Select value={formData.collection} onValueChange={(value) => handleInputChange("collection", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma coleção" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((collection) => (
                        <SelectItem key={collection.value} value={collection.value}>
                          {collection.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detalhes do Produto</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descrição detalhada do produto..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Imagens do Produto</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files)}
                />
              </div>

              <Button type="submit" className="w-full hero-button">
                Salvar Produto
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;