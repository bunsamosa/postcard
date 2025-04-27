<script lang="ts">
  import { X } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  export let isOpen: boolean = false;
  export let imageNumber: number = 1;
  export let onClose: () => void;
  export let onEdit: () => void;
  export let onNext: () => void;
  export let onPrevious: () => void;

  // Function to get the correct image extension
  function getImagePath(imageNum: number): string {
    if (imageNum === 9 || imageNum === 10) {
      return `/images/img${imageNum}.png`;
    }
    return `/images/img${imageNum}.jpg`;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      onClose();
    } else if (event.key === 'ArrowRight') {
      onNext();
    } else if (event.key === 'ArrowLeft') {
      onPrevious();
    } else if (event.key === 'Enter') {
      onEdit();
    }
    
    // Prevent all keyboard events while modal is open
    event.stopPropagation();
  }

  // Add/remove event listeners and scroll lock
  $: if (browser && isOpen) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown, true);
  } else if (browser) {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown, true);
  }

  onMount(() => {
    return () => {
      if (browser) {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeydown, true);
      }
    };
  });
</script>

{#if isOpen}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center"
    transition:fade={{ duration: 200 }}
  >
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-white/80 backdrop-blur-sm"
      on:click={onClose}
    ></div>
    
    <!-- Modal content -->
    <div class="relative z-10">
      <!-- Close button -->
      <button
        class="fixed right-6 top-6 p-2 hover:bg-black/5 rounded-full"
        on:click={onClose}
      >
        <X class="w-6 h-6 text-[#3D3D3D]" />
      </button>

      <!-- Image -->
      <div class="bg-white p-4 shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] w-[453.6px]">
        <div class="h-[560px] flex justify-center items-center">
          <img
            src={getImagePath(imageNumber)}
            alt="Selected postcard"
            class="w-[409.248px] h-full object-cover"
          />
        </div>
      </div>

      <!-- Like button -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+24px)]">
        <button
          on:click={onEdit}
          class="bg-black text-white p-4 rounded-[12px] text-base font-inter font-medium hover:bg-black/90 transition-colors inline-flex items-center gap-2"
        >
          I like this <span class="text-lg">→</span>
        </button>
      </div>
    </div>
  </div>
{/if} 