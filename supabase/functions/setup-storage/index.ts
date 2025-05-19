
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.37.0';

serve(async (req) => {
  // Get the authorization token from the request
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Authorization header missing' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Create storage buckets if they don't exist
    const buckets = [
      { id: 'verification-documents', public: false, name: 'Verification Documents' },
      { id: 'marketplace-images', public: true, name: 'Marketplace Images' },
      { id: 'profile-avatars', public: true, name: 'Profile Avatars' }
    ];

    for (const bucket of buckets) {
      const { error } = await supabaseAdmin.storage.createBucket(
        bucket.id,
        { public: bucket.public, fileSizeLimit: 10485760 } // 10MB limit
      );

      // Ignore error if bucket already exists
      if (error && !error.message.includes('already exists')) {
        console.error(`Error creating bucket ${bucket.id}:`, error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Storage buckets configured' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in setup-storage function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
