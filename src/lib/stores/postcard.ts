import { writable } from 'svelte/store';

interface PostcardStore {
  message: string;
  recipientInfo: string;
  selectedFont: string;
  selectedColor: string;
  selectedImage: string;
  selectedStamp: number;
}

export const postcardStore = writable<PostcardStore>({
  message: '',
  recipientInfo: '',
  selectedFont: 'Caveat',
  selectedColor: '#FFFFFF',
  selectedImage: '1',
  selectedStamp: Math.floor(Math.random() * 14) + 1
}); 