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
    console.log("Iniciando checkout...");
    const body = await req.json();
    console.log("Body recebido:", JSON.stringify(body, null, 2));
    
    const { items, total } = body;
    
    if (!items || items.length === 0) {
      throw new Error("Nenhum item no carrinho");
    }
    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Header de autorização não encontrado");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError) {
      console.error("Erro de autenticação:", authError);
      throw new Error("Erro ao autenticar usuário");
    }
    
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("Usuário não autenticado ou email não disponível");
    }
    
    console.log("Usuário autenticado:", user.email);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });
    
    console.log("Stripe inicializado");

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Cliente existente encontrado:", customerId);
    } else {
      console.log("Novo cliente - será criado no checkout");
    }

    // Create line items from cart
    const lineItems = items.map((item: any) => {
      console.log("Processando item:", item.name, "Preço:", item.price);
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${item.brand} - ${item.name}`,
            images: item.image ? [item.image] : [],
            description: `Tamanho: ${item.size || 'N/A'}, Cor: ${item.color || 'N/A'}`,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    console.log("Line items criados:", lineItems.length);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/order-tracking?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      metadata: {
        user_id: user.id,
      },
    });

    console.log("Sessão criada com sucesso:", session.id);

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro no checkout:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro ao criar checkout",
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
