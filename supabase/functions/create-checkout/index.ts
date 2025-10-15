import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    console.log("=== INÍCIO DO CHECKOUT ===");
    
    // Valida body
    let body;
    try {
      body = await req.json();
      console.log("Body recebido:", JSON.stringify(body, null, 2));
    } catch (e) {
      console.error("Erro ao fazer parse do JSON:", e);
      throw new Error("Body da requisição inválido");
    }
    
    const { items, total, paymentMethod } = body;
    
    // Valida items
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Erro: carrinho vazio ou inválido");
      throw new Error("Nenhum item no carrinho");
    }
    console.log(`Número de itens: ${items.length}`);
    
    // Valida total
    if (!total || typeof total !== 'number' || total <= 0) {
      console.error("Erro: total inválido:", total);
      throw new Error("Total do pedido inválido");
    }
    console.log(`Total do pedido: R$ ${total.toFixed(2)}`);
    
    // Autentica usuário
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("Erro: header de autorização não encontrado");
      throw new Error("Header de autorização não encontrado");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError) {
      console.error("Erro de autenticação:", authError);
      throw new Error(`Erro ao autenticar usuário: ${authError.message}`);
    }
    
    const user = data.user;
    
    if (!user?.email) {
      console.error("Erro: usuário sem email");
      throw new Error("Usuário não autenticado ou email não disponível");
    }
    
    console.log("✓ Usuário autenticado:", user.email);

    // Inicializa Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("Erro: STRIPE_SECRET_KEY não configurada");
      throw new Error("Stripe não configurado");
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });
    console.log("✓ Stripe inicializado");

    // Verifica se cliente existe
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("✓ Cliente Stripe existente:", customerId);
    } else {
      console.log("ℹ Novo cliente - será criado no checkout");
    }

    // Cria line items do carrinho
    const lineItems = items.map((item: any, index: number) => {
      console.log(`Item ${index + 1}:`, item.name, "| Preço: R$", item.price, "| Qtd:", item.quantity);
      
      // Valida cada item
      if (!item.price || typeof item.price !== 'number' || item.price <= 0) {
        throw new Error(`Preço inválido para o item: ${item.name}`);
      }
      
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new Error(`Quantidade inválida para o item: ${item.name}`);
      }
      
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${item.brand || 'Produto'} - ${item.name || 'Sem nome'}`,
            images: item.image ? [item.image] : [],
            description: `Tamanho: ${item.size || 'N/A'}, Cor: ${item.color || 'N/A'}`,
          },
          unit_amount: Math.round(item.price * 100), // Converte para centavos
        },
        quantity: item.quantity,
      };
    });

    console.log(`✓ ${lineItems.length} line items criados`);

    // Cria sessão de checkout
    console.log("Criando sessão Stripe Checkout...");
    const origin = req.headers.get("origin") || "https://59fa342c-e162-4a36-8b42-90a2f90e2df0.lovableproject.com";
    
    // Define métodos de pagamento baseado na seleção do usuário
    // Nota: PIX não está disponível na conta Stripe de teste atual
    let paymentMethodTypes: string[] = ["card"];
    if (paymentMethod === 'boleto') {
      paymentMethodTypes = ["boleto"];
    }
    // PIX removido temporariamente - requer ativação no dashboard Stripe
    
    console.log("Métodos de pagamento:", paymentMethodTypes);
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      payment_method_types: paymentMethodTypes,
      success_url: `${origin}/order-tracking?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        user_id: user.id,
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutos
    });

    console.log("✓ Sessão criada com sucesso!");
    console.log("Session ID:", session.id);
    console.log("Checkout URL:", session.url);
    console.log("=== FIM DO CHECKOUT ===");

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Log detailed error server-side only
    console.error("❌ ERRO NO CHECKOUT:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : "N/A");
    
    // Return generic error message to client
    return new Response(
      JSON.stringify({ 
        error: "Não foi possível processar o pagamento. Por favor, tente novamente ou entre em contato com o suporte.",
        trackingId: crypto.randomUUID()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
