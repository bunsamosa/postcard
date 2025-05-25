import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { id } = params;

  if (!id) {
    throw error(400, 'Missing postcard ID');
  }

  const { data: postcardData, error: dbError } = await supabase
    .from('postcards-created')
    .select('*')
    .eq('id', id)
    .single();

  if (dbError) {
    console.error("Error fetching postcard:", dbError);
    throw error(500, `Failed to load postcard: ${dbError.message}`);
  }

  if (!postcardData) {
    throw error(404, 'Postcard not found');
  }

  return {
    postcard: postcardData
  };
} 