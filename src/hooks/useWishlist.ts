import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: string;
  product_id: string;
  product?: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image_url: string;
    rating: number;
  };
}

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchWishlist = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setWishlistItems([]);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          id,
          product_id,
          products (
            id,
            name,
            brand,
            price,
            image_url,
            rating
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedItems = data.map(item => ({
        id: item.id,
        product_id: item.product_id,
        product: Array.isArray(item.products) ? item.products[0] : item.products
      }));

      setWishlistItems(formattedItems);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast({
        title: 'Erro ao carregar favoritos',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Faça login',
          description: 'Você precisa estar logado para adicionar favoritos.',
          variant: 'destructive',
        });
        return false;
      }

      const { error } = await supabase
        .from('wishlist')
        .insert({ user_id: user.id, product_id: productId });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Já está nos favoritos',
            description: 'Este produto já está na sua lista de favoritos.',
          });
          return false;
        }
        throw error;
      }

      toast({
        title: 'Adicionado aos favoritos!',
        description: 'Produto adicionado à sua lista de favoritos.',
      });

      await fetchWishlist();
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar aos favoritos.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return false;

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      toast({
        title: 'Removido dos favoritos',
        description: 'Produto removido da sua lista de favoritos.',
      });

      await fetchWishlist();
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível remover dos favoritos.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  useEffect(() => {
    fetchWishlist();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchWishlist();
      } else if (event === 'SIGNED_OUT') {
        setWishlistItems([]);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshWishlist: fetchWishlist,
  };
};
