<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ChevronLeft, ChevronRight, LayoutGrid, Layers, X } from "lucide-svelte";
  import { onMount } from 'svelte';
  import PostcardModal from "$lib/components/PostcardModal.svelte";
  import { goto } from "$app/navigation";
  import { spring } from 'svelte/motion';
  import { fade, fly } from 'svelte/transition';
  import { imageStore } from '$lib/stores/images';

  let currentIndex = 0;
  let isStackView = true;
  let isModalOpen = false;
  let isAboutModalOpen = false;
  let selectedImage: number | null = null;
  
  let MAX_IMAGES = 0;
  let stackOrder: number[] = []; 
  let allImages: number[] = [];

  let stackContainer: HTMLElement;
  let scrollX = spring(0, {
    stiffness: 0.08,
    damping: 0.4
  });

  // Prevent page scroll when stack view is active
  $: {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = isStackView ? 'hidden' : '';
    }
  }

  onMount(() => {
    // Add Escape key support for About modal
    function handleAboutKeydown(e: KeyboardEvent) {
      if (isAboutModalOpen && e.key === 'Escape') {
        closeAboutModal();
      }
    }
    window.addEventListener('keydown', handleAboutKeydown);

    imageStore.loadImages(); 

    const unsubscribe = imageStore.subscribe(storeState => {
      const loadedImages = storeState.images || [];
      MAX_IMAGES = loadedImages.length;
      if (MAX_IMAGES > 0) {
        stackOrder = Array.from({ length: MAX_IMAGES }, (_, i) => i);
        allImages = Array.from({ length: MAX_IMAGES }, (_, i) => i + 1);
      } else {
        stackOrder = [];
        allImages = [];
      }
    });

    window.addEventListener('keydown', handleKeydown);
    if (stackContainer) {
      stackContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      unsubscribe(); 
      window.removeEventListener('keydown', handleKeydown);
      if (stackContainer) {
        stackContainer.removeEventListener('wheel', handleWheel);
      }
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
      window.removeEventListener('keydown', handleAboutKeydown);
    };
  });

  function handleWheel(event: WheelEvent) {
    if (!isStackView || isModalOpen) return;
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const newX = $scrollX + delta * 0.5;
    scrollX.set(newX);
    if (Math.abs($scrollX) > 120) {
      if ($scrollX > 0) {
        previousImage();
      } else {
        nextImage();
      }
      scrollX.set(0, { hard: false });
    }
  }

  function nextImage() {
    if (isModalOpen) {
      selectedImage = (selectedImage! % MAX_IMAGES) + 1;
    } else {
      stackOrder = [...stackOrder.slice(1), stackOrder[0]];
      currentIndex = stackOrder[0];
    }
  }

  function previousImage() {
    if (isModalOpen) {
      selectedImage = ((selectedImage! - 2 + MAX_IMAGES) % MAX_IMAGES) + 1;
    } else {
      stackOrder = [stackOrder[stackOrder.length - 1], ...stackOrder.slice(0, -1)];
      currentIndex = stackOrder[0];
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!isStackView || isModalOpen) return;
    if (event.key === 'ArrowLeft') {
      previousImage();
    } else if (event.key === 'ArrowRight') {
      nextImage();
    }
  }

  function toggleView() {
    isStackView = !isStackView;
  }

  function openModal(imageNum: number) {
    selectedImage = imageNum;
    currentIndex = imageNum - 1;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    selectedImage = null;
  }

  function handleEdit() {
    goto(`/edit?image=${selectedImage}`);
  }

  function openAboutModal() {
    isAboutModalOpen = true;
  }

  function closeAboutModal() {
    isAboutModalOpen = false;
  }

  function redirectToContact() {
    const email = 'postcardsbysuku@gmail.com';
    const subject = encodeURIComponent('Print Order Request');
    const body = encodeURIComponent('Hi Sukanya, \nI want to request a print order for your postcards!');
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Jomhuria&family=Inter:wght@400;500&family=Caveat:wght@400;500&family=Courier+Prime&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
</svelte:head>

{#if isAboutModalOpen}
  <div 
    class="fixed inset-0 z-50 bg-white flex items-center justify-center" 
    onclick={(e: MouseEvent) => { if (e.target === e.currentTarget) closeAboutModal(); }} 
  >
    <!-- Close button -->
    <button 
      class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-2xl" 
      onclick={closeAboutModal} 
      aria-label="Close about modal" 
    >
      <span class="material-symbols-outlined text-[28px] text-[#5A5A5A]">close</span>
    </button>
    <!-- Centered About Content -->
    <div class="flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 -mt-9">
      <h2 class="font-jomhuria font-normal text-[56px] mb-0 text-center">About</h2>
      <p class="font-caveat text-[26px] text-center text-black max-w-2xl">
        There was a time when sending a postcard meant - slowing down to share a moment, a thought, or a feeling with friends and family far away. I've always loved that. This is my way of bringing back that magic digitally.<br><br>
        In a world of instant messages, here's a space for art, memories, and words. Each postcard features artwork I've created over the years, and will keep adding to. Enjoy! <br> ~Sukanya
      </p>
      <div class="flex items-center gap-4 mt-12">
        <a href="https://www.instagram.com/artbysuku.png/" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80977 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47033 10.1584C8.8486 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5 6.5H17.51" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="https://x.com/su_kanye" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4C22 4 21.3 6.1 20 7.4C21.6 17.4 10.6 24.7 2 19C4.2 19.1 6.4 18.4 8 17C3 15.5 -0.5 9.6 3 5C5.2 7.6 8.6 9.1 12 9C11.1 4.8 16 2.4 19 5.2C20.1 5.2 22 4 22 4Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
    <!-- Corner Image -->
    <img 
      src="https://djefjmucdhbrngeqovuz.supabase.co/storage/v1/object/public/postcard-images//Self_Portrait_1.jpg" 
      alt="Self Portrait" 
      class="absolute bottom-0 left-0 w-64 h-auto select-none pointer-events-none scale-[1.2] origin-left" 
      draggable="false"
    />
  </div>
{/if}

<PostcardModal 
  isOpen={isModalOpen}
  imageNumber={selectedImage || (MAX_IMAGES > 0 ? 1 : 0)}
  onClose={closeModal}
  onEdit={handleEdit}
  onNext={nextImage}
  onPrevious={previousImage}
/>

<div class="w-full min-h-screen bg-white p-2 sm:p-4 flex flex-col items-center">
  <!-- Header -->
  <header class="max-w-[1201px] mx-auto h-[84px] sm:h-16 px-2 sm:px-4 relative w-full">
    <div class="absolute left-2 sm:left-4 top-[6px]">
      <h1 class="text-[40px] sm:text-[56px] font-jomhuria leading-[40px] sm:leading-[56px] text-black">Send a postcard</h1>
    </div>
    <div class="absolute left-1/2 -translate-x-1/2 top-[48px] sm:top-[14px] flex items-center gap-2">
      <button
        class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EDF2F8] transition-colors duration-200 {isStackView ? 'bg-[#EDF2F8]' : ''}"
        onclick={() => (isStackView = true)}
        aria-label="Stack view"
      >
        <span class="material-symbols-outlined text-[24px] {isStackView ? 'text-black' : 'text-[#5A5A5A]'}">photo_prints</span>
      </button>
      <button
        class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EDF2F8] transition-colors duration-200 {!isStackView ? 'bg-[#EDF2F8]' : ''}"
        onclick={() => (isStackView = false)}
        aria-label="Grid view"
      >
        <span class="material-symbols-outlined text-[24px] {!isStackView ? 'text-black' : 'text-[#5A5A5A]'}">grid_view</span>
      </button>
    </div>
    <div class="absolute right-2 sm:right-4 top-[48px] sm:top-4 flex items-center gap-2">
      <button 
        class="px-[10px] py-1 rounded-[40px] hover:bg-[#F2F2F7] hidden sm:block text-[#3D3D3D] text-base leading-5 font-inter hover:text-black transition-colors duration-200"
        onclick={redirectToContact} 
      >
        Paper please
      </button>
      <button 
        class="px-[10px] py-1 rounded-[40px] hover:bg-[#F2F2F7] hidden sm:block text-[#3D3D3D] text-base leading-5 font-inter hover:text-black transition-colors duration-200"
        onclick={openAboutModal} 
      >
        About
      </button>
    </div>
  </header>

  <!-- Main content -->
  <main class="flex flex-col items-center justify-center mt-0 sm:mt-[41px] w-full max-w-[1201px]">
    {#if MAX_IMAGES === 0}
      <p class="text-xl text-gray-600">Loading postcards...</p>
    {:else if isStackView}
      <div 
        class="relative w-[90vw] sm:w-[499.30px] h-[500px] sm:h-[645.83px] card-stack-perspective"
        bind:this={stackContainer}
      >
        <!-- Left Navigation Arrow -->
        <button
          class="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full -ml-0 sm:-ml-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EDF2F8] transition-colors duration-200 z-20"
          onclick={previousImage} 
          aria-label="Previous postcard"
        >
          <span class="material-symbols-outlined text-[24px] text-[#5A5A5A]">chevron_left</span>
        </button>

        {#if stackOrder.length > 1}
          {#each stackOrder.slice(1, 4) as imageOrderIndex, idx (imageOrderIndex)}
            <div
              class="absolute w-[85vw] sm:w-[450px] h-[460px] sm:h-[600px] bg-white p-4 sm:p-6 transition-transform duration-500 will-change-transform"
              style="
                left: {20 + (idx * 12)}px; 
                top: {12 + (idx * 12)}px; 
                transform: 
                  translateX({$scrollX * 0.15 * (1 - idx * 0.2)}px)
                  translateZ({-100 - (idx * 20)}px)
                  rotate({2 + (idx * 0.8)}deg); 
                transform-origin: center;
                box-shadow: 0px {15 + (idx * 8)}px {25 + (idx * 15)}px rgba(0, 0, 0, 0.08);
                opacity: {1 - (idx * 0.15)};
              "
            >
              <img
                src={imageStore.getImageUrl(imageOrderIndex + 1)}
                alt="Background postcard"
                class="w-full h-full object-cover"
              />
            </div>
          {/each}
        {/if}

        {#if stackOrder.length > 0}
          <div 
            class="absolute left-0 top-0 bg-white p-4 sm:p-6 transition-all duration-500 will-change-transform hover-card"
            style="
              transform-origin: center; 
              transform: 
                translateX({$scrollX * 0.15}px)
                translateZ(0)
                rotate({$scrollX * 0.005}deg);
              box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.1);
            "
          >
            <div class="flex justify-center items-center">
              <button
                class="w-full relative overflow-hidden"
                onclick={() => openModal(stackOrder[0] + 1)}
                tabindex="0"
                aria-label="Open postcard details"
              >
                <img
                  src={imageStore.getImageUrl(stackOrder[0] + 1)}
                  alt="Current postcard"
                  class="w-[80vw] sm:w-[406px] h-[420px] sm:h-[509.49px] object-cover"
                />
              </button>
            </div>
          </div>
        {/if}

        <!-- Right Navigation Arrow -->
        <button
          class="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full -mr-0 sm:-mr-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EDF2F8] transition-colors duration-200 z-20"
          onclick={nextImage} 
          aria-label="Next postcard"
        >
          <span class="material-symbols-outlined text-[24px] text-[#5A5A5A]">chevron_forward</span>
        </button>
      </div>
    {:else}
      <!-- Grid view -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-[76px]">
        {#each allImages as imageNum, i (imageNum)}
          <div 
            class="w-full sm:w-[324px] p-4 bg-white will-change-transform hover-card scale-[0.9]"
            style="box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.1);"
          >
            <button
              class="w-full h-full focus:outline-none"
              onclick={() => openModal(imageNum)} 
              tabindex="0"
              aria-label={`Open postcard ${imageNum} details`}
            >
              <div>
                {#if imageStore.getImageUrl(imageNum)}
                  <img
                    src={imageStore.getImageUrl(imageNum)}
                    alt={`Postcard ${imageNum}`}
                    loading="lazy"
                    class="w-full h-auto object-cover"
                  />
                {:else}
                  <div class="w-full bg-gray-200 flex items-center justify-center">
                    <p class="text-gray-400">Loading...</p>
                  </div>
                {/if}
              </div>
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </main>
</div>

<style>
  .font-jomhuria {
    font-family: 'Jomhuria', cursive;
  }
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  .font-caveat {
    font-family: 'Caveat', cursive;
  }
  .font-courier-prime {
    font-family: 'Courier Prime', monospace;
  }
  .card-stack-perspective {
    perspective: 2500px;
    perspective-origin: 75% 50%;
    transform-style: preserve-3d;
  }
  .transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    transition-duration: 0.5s;
  }
  .will-change-transform {
    will-change: transform;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
  .transition-all {
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .transition-colors {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  .hover-card {
    transition: transform 100ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 100ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center;
  }
  .hover-card:hover {
    transform: scale(1.02) translateY(-12px) !important;
    box-shadow: 0px 40px 80px rgba(0, 0, 0, 0.15) !important;
  }
  button {
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transform-style: preserve-3d;
  }
  button:focus {
    outline: none;
  }
  button:focus-visible {
    outline: none;
  }
  a:focus, a:focus-visible {
    outline: none;
  }
  input:focus, input:focus-visible {
    outline: none;
  }
</style>
