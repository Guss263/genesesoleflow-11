import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Pencil, Trash2 } from "lucide-react";

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
  const [products, setProducts] = useState<any[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      // Verificar se o usuário está autenticado
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/admin-login");
        return;
      }

      // Verificar se o usuário tem role de admin
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roles) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta página.",
          variant: "destructive"
        });
        navigate("/");
        return;
      }

      fetchProducts();
    };

    checkAdminAccess();
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar produtos: " + error.message,
          variant: "destructive"
        });
        return;
      }

      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar produtos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.collection || !formData.category || !formData.price) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      let imageUrl = "/placeholder.svg";

      // Upload image if one is selected
      if (images && images.length > 0) {
        const file = images[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) {
          toast({
            title: "Erro no upload",
            description: "Erro ao fazer upload da imagem: " + uploadError.message,
            variant: "destructive"
          });
          return;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      // Convert sizes string to array
      const sizesArray = formData.sizes.split(',').map(size => size.trim()).filter(size => size.length > 0);

      const productData = {
        name: formData.name,
        brand: formData.brand || "GeneBrand",
        price: parseFloat(formData.price),
        image_url: imageUrl,
        rating: 4.5,
        is_new: true,
        is_sale: false,
        category: formData.category,
        gender: formData.collection,
        description: formData.description,
        sizes: sizesArray
      };

      let result;
      if (editingProductId) {
        // If updating and no new image, keep existing image
        if (!images || images.length === 0) {
          delete productData.image_url;
        }
        
        // Update existing product
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProductId)
          .select();
      } else {
        // Insert new product
        result = await supabase
          .from('products')
          .insert([productData])
          .select();
      }

      if (result.error) {
        toast({
          title: "Erro",
          description: `Erro ao ${editingProductId ? 'atualizar' : 'salvar'} produto: ` + result.error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso!",
        description: editingProductId ? "Produto atualizado com sucesso." : "Produto adicionado com sucesso.",
      });

      // Clear form and reset editing state
      clearForm();
      // Refresh products list
      fetchProducts();
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao salvar produto.",
        variant: "destructive"
      });
    }
  };

  const clearForm = () => {
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
    setEditingProductId(null);
    
    // Reset file input
    const fileInput = document.getElementById("images") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleEditProduct = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description || "",
      sizes: product.sizes ? product.sizes.join(', ') : "",
      collection: product.gender,
      brand: product.brand || "",
      price: product.price.toString(),
      category: product.category
    });
    setEditingProductId(product.id);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmed = window.confirm("Você tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.");
    
    if (!confirmed) return;

    try {
      // First, get the product to delete its image
      const { data: productData } = await supabase
        .from('products')
        .select('image_url')
        .eq('id', productId)
        .single();

      // Delete the product from database
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao excluir produto: " + error.message,
          variant: "destructive"
        });
        return;
      }

      // Delete image from storage if it exists and is not placeholder
      if (productData?.image_url && !productData.image_url.includes('placeholder.svg')) {
        const imagePath = productData.image_url.split('/').pop();
        if (imagePath) {
          await supabase.storage
            .from('product-images')
            .remove([`products/${imagePath}`]);
        }
      }

      toast({
        title: "Sucesso!",
        description: "Produto excluído com sucesso.",
      });

      // Refresh products list
      fetchProducts();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao excluir produto.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files)}
                />
                <p className="text-sm text-muted-foreground">
                  Selecione uma imagem para o produto (formato: JPG, PNG, WEBP)
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 hero-button">
                  {editingProductId ? "Atualizar Produto" : "Salvar Produto"}
                </Button>
                {editingProductId && (
                  <Button type="button" variant="outline" onClick={clearForm} className="flex-1">
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Products List Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Produtos Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p>Carregando produtos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum produto cadastrado ainda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src={product.image_url || "/placeholder.svg"} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Coleção: {product.gender} | Categoria: {product.category}
                      </p>
                      <p className="text-sm font-medium">R$ {product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;