import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

Deno.serve(async (req) => {
  try {
    // Esta função usa o service role key para criar/atualizar o usuário admin
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Admin';

    // Verifica se o usuário já existe
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingAdmin = existingUsers?.users.find(u => u.email === adminEmail);

    let userId: string;

    if (existingAdmin) {
      // Atualiza a senha do admin existente
      const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingAdmin.id,
        { password: adminPassword }
      );

      if (updateError) {
        throw updateError;
      }

      userId = existingAdmin.id;
      console.log('Senha do admin atualizada');
    } else {
      // Cria novo usuário admin
      const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });

      if (createError) {
        throw createError;
      }

      userId = createData.user.id;
      console.log('Novo usuário admin criado');
    }

    // Garante que o usuário tem o role de admin
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .upsert({
        user_id: userId,
        role: 'admin'
      }, {
        onConflict: 'user_id,role'
      });

    if (roleError) {
      throw roleError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin configurado com sucesso',
        email: adminEmail
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Erro ao configurar admin:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
