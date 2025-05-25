import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log(supabaseUrl, supabaseAnonKey);
console.log('TEST VAR:', import.meta.env.VITE_TEST_VAR);

// Create a client that can be used in both browser and server
export const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co',
  supabaseAnonKey || 'your-anon-key'
);

// Type for the postcard images
export interface PostcardImage {
  name: string;
  url: string;
}

// Function to fetch images from the postcard-images storage bucket
export const fetchPostcardImages = async (): Promise<PostcardImage[]> => {
  // Hardcoded filenames from your Supabase bucket
  const filenames = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
    'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg',
    'img11.jpg', 'img12.jpg', 'img14.jpg', 'img15.png'
  ];
  const urlBase = 'https://djefjmucdhbrngeqovuz.supabase.co/storage/v1/object/public/postcard-images/';
  const images = filenames.map(name => ({
    name,
    url: urlBase + name
  }));
  console.log('Hardcoded images:', images);
  return images;
}; 