
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    // Define buckets to create
    const buckets = [
      { id: 'profile-avatars', name: 'Profile Avatars', public: true },
      { id: 'verification-documents', name: 'Verification Documents', public: false },
      { id: 'marketplace-images', name: 'Marketplace Images', public: true },
    ];
    
    const results = [];
    
    // Create each bucket
    for (const bucket of buckets) {
      const { data, error } = await supabaseAdmin
        .storage
        .createBucket(bucket.id, { 
          public: bucket.public, 
          fileSizeLimit: bucket.id === 'marketplace-images' ? 10485760 : 5242880, // 10MB for marketplace, 5MB for others
        });
      
      if (error && !error.message.includes('already exists')) {
        throw error;
      }
      
      results.push({
        bucket: bucket.id,
        status: error?.message.includes('already exists') ? 'already exists' : 'created',
      });
    }
    
    // Set up security policies for verification-documents
    const { error: policyError } = await supabaseAdmin.rpc('create_storage_policy', {
      bucket_id: 'verification-documents',
      policy_name: 'User Document Access',
      definition: 'auth.uid() = owner',
      operation: 'SELECT',
    });
    
    if (policyError && !policyError.message.includes('already exists')) {
      throw policyError;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Storage buckets set up successfully',
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error setting up storage buckets:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
