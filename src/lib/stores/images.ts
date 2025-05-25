import { writable, get } from 'svelte/store';
import type { PostcardImage } from '$lib/supabase';
import { fetchPostcardImages } from '$lib/supabase';

interface ImageStore {
  images: PostcardImage[];
  isLoading: boolean;
  error: string | null;
}

function createImageStore() {
  const store = writable<ImageStore>({
    images: [],
    isLoading: false,
    error: null
  });

  return {
    subscribe: store.subscribe,
    loadImages: async () => {
      store.update(state => ({ ...state, isLoading: true, error: null }));
      try {
        const images = await fetchPostcardImages();
        store.set({ images, isLoading: false, error: null });
        return images;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load images';
        store.set({ images: [], isLoading: false, error: errorMessage });
        return [];
      }
    },
    getImageUrl: (imageNumber: number) => {
      const state = get(store);
      return state.images[imageNumber - 1]?.url || '';
    }
  };
}

export const imageStore = createImageStore(); 