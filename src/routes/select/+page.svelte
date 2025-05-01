<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ChevronLeft, ChevronRight, LayoutGrid, Layers } from "lucide-svelte";
  import { onMount } from 'svelte';
  import PostcardModal from "$lib/components/PostcardModal.svelte";
  import { goto } from "$app/navigation";
  import { spring } from 'svelte/motion';
  import { fade, fly } from 'svelte/transition';

  const MAX_IMAGES = 12; // Updated from 10 to 12 to include all images
  let currentIndex = 0;
  let isStackView = true;
  let isModalOpen = false;
  let selectedImage: number | null = null;
  let stackOrder = Array.from({ length: MAX_IMAGES }, (_, i) => i); // Track card order in stack
  let stackContainer: HTMLElement;
  let scrollX = spring(0, {
    stiffness: 0.08,  // Adjusted for better response
    damping: 0.4      // Increased for more stability
  });

  // Function to get the correct image extension
  function getImagePath(imageNum: number): string {
    if (imageNum === 9 || imageNum === 10) {
      return `/images/img${imageNum}.png`;
    }
    return `/images/img${imageNum}.jpg`;
  }

  function handleWheel(event: WheelEvent) {
    if (!isStackView || isModalOpen) return;
    event.preventDefault();
    
    // Handle both vertical and horizontal scrolling
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const newX = $scrollX + delta * 0.5;
    scrollX.set(newX);

    // Check if we should transition to next/previous card
    if (Math.abs($scrollX) > 120) {
      if ($scrollX > 0) {
        previousImage();  // Reversed direction to match natural scroll
      } else {
        nextImage();
      }
      // Reset scroll position with animation
      scrollX.set(0, { hard: false });
    }
  }

  function nextImage() {
    if (isModalOpen) {
      selectedImage = (selectedImage! % MAX_IMAGES) + 1;
    } else {
      // Move current card to the back of the stack
      stackOrder = [...stackOrder.slice(1), stackOrder[0]];
      currentIndex = stackOrder[0];
    }
  }

  function previousImage() {
    if (isModalOpen) {
      selectedImage = ((selectedImage! - 2 + MAX_IMAGES) % MAX_IMAGES) + 1;
    } else {
      // Move last card to the front of the stack
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

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    if (stackContainer) {
      stackContainer.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      if (stackContainer) {
        stackContainer.removeEventListener('wheel', handleWheel);
      }
    };
  });

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
    // Navigate to edit page with selected image using SvelteKit navigation
    goto(`/edit?image=${selectedImage}`);
  }

  // Generate array of all image indices
  const allImages = Array.from({ length: MAX_IMAGES }, (_, i) => i + 1);
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Jomhuria&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
</svelte:head>

<PostcardModal 
  isOpen={isModalOpen}
  imageNumber={selectedImage || 1}
  onClose={closeModal}
  onEdit={handleEdit}
  onNext={nextImage}
  onPrevious={previousImage}
/>

<div class="w-full min-h-screen bg-white p-2 sm:p-4">
  <!-- Header -->
  <header class="max-w-[1201px] mx-auto h-[84px] sm:h-16 px-2 sm:px-4 relative">
    <!-- Title -->
    <div class="absolute left-2 sm:left-4 top-[6px]">
      <h1 class="text-[40px] sm:text-[56px] font-jomhuria leading-[40px] sm:leading-[56px] text-black">Send a postcard</h1>
    </div>

    <!-- View toggles -->
    <div class="absolute left-1/2 -translate-x-1/2 top-[48px] sm:top-[14px] flex items-center gap-2">
      <button
        class="w-10 h-10 flex items-center justify-center rounded-full {isStackView ? 'bg-[#F2F2F7]' : ''} hover:bg-[#F2F2F7] transition-colors duration-200"
        on:click={() => isStackView = true}
      >
        <span class="material-symbols-outlined text-[24px] {isStackView ? 'text-black' : 'text-[#4D4D4D]'}">photo_prints</span>
      </button>
      <button
        class="w-10 h-10 flex items-center justify-center rounded-full {!isStackView ? 'bg-[#F2F2F7]' : ''} hover:bg-[#F2F2F7] transition-colors duration-200"
        on:click={() => isStackView = false}
      >
        <span class="material-symbols-outlined text-[24px] {!isStackView ? 'text-black' : 'text-[#4D4D4D]'}">grid_view</span>
      </button>
    </div>

    <!-- Navigation -->
    <div class="absolute right-2 sm:right-4 top-[48px] sm:top-4 flex items-center gap-2">
      <button class="px-[10px] py-1 rounded-[40px] hover:bg-[#F2F2F7] hidden sm:block">
        <span class="text-[#3D3D3D] text-base leading-5 font-inter">Print Order</span>
      </button>
      <button class="px-[10px] py-1 rounded-[40px] hover:bg-[#F2F2F7] hidden sm:block">
        <span class="text-[#3D3D3D] text-base leading-5 font-inter">About</span>
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex flex-col items-center justify-center mt-[0px] sm:mt-[33px]">
    {#if isStackView}
      <!-- Stacked Cards View -->
      <div 
        class="relative w-[90vw] sm:w-[499.30px] h-[500px] sm:h-[645.83px] card-stack-perspective"
        bind:this={stackContainer}
      >
        <!-- Background Cards -->
        {#each stackOrder.slice(1, 4) as imageIndex, idx}
          <div
            class="absolute w-[85vw] sm:w-[450px] h-[460px] sm:h-[600px] bg-white transition-transform duration-500 will-change-transform"
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
              src={getImagePath(imageIndex + 1)}
              alt="Background postcard"
              class="w-full h-full object-cover"
            />
          </div>
        {/each}

        <!-- Main Card -->
        <div 
          class="absolute left-0 top-0 bg-white p-4 transition-all duration-500 will-change-transform hover-card"
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
              on:click={() => openModal(stackOrder[0] + 1)}
            >
            <img
                src={getImagePath(stackOrder[0] + 1)}
              alt="Current postcard"
                class="w-[80vw] sm:w-[406px] h-[477.49px] sm:h-[577.49px] object-cover"
            />
            </button>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <div class="flex items-center gap-4 mt-16 absolute bottom-[-60px] sm:bottom-[-80px] left-1/2 -translate-x-1/2">
          <button
            class="p-3 rounded-[32px] hover:bg-[#F2F2F7] overflow-hidden transition-colors duration-200"
            on:click={previousImage}
          >
            <ChevronLeft class="w-5 h-5 text-[#5A5A5A]" strokeWidth={2} />
          </button>
          <button
            class="p-3 rounded-[32px] hover:bg-[#F2F2F7] overflow-hidden transition-colors duration-200"
            on:click={nextImage}
          >
            <ChevronRight class="w-5 h-5 text-[#5A5A5A]" strokeWidth={2} />
          </button>
        </div>
      </div>
    {:else}
      <!-- Grid View -->
      <div class="w-full max-w-[1201px] mx-auto px-4">
        <div class="flex flex-col gap-8 sm:gap-[76px]">
          <!-- First Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-[76px]">
            {#each allImages.slice(0, 3) as imageNum, i}
              <div 
                class="w-full sm:w-[324px] p-4 bg-white transition-all duration-500 will-change-transform hover-card"
                style="box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.1);"
                in:fly={{ y: 200, duration: 600, delay: i * 150 }}
                out:fade={{ duration: 300 }}
              >
                <button
                  class="w-full h-full"
                  on:click={() => openModal(imageNum)}
                >
                  <div class="h-[334px] sm:h-[400px] flex justify-center items-center">
                  <img
                      src={getImagePath(imageNum)}
                    alt="Postcard"
                      class="w-full sm:w-[292.32px] object-cover"
                  />
                </div>
                </button>
              </div>
            {/each}
          </div>
          <!-- Second Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-[76px]">
            {#each allImages.slice(3, 6) as imageNum, i}
              <div 
                class="w-full sm:w-[324px] p-4 bg-white transition-all duration-500 will-change-transform hover-card"
                style="box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.1);"
                in:fly={{ y: 200, duration: 600, delay: (i + 3) * 150 }}
                out:fade={{ duration: 300 }}
              >
                <button
                  class="w-full h-full"
                  on:click={() => openModal(imageNum)}
                >
                  <div class="h-[334px] sm:h-[400px] flex justify-center items-center">
                    <img
                      src={getImagePath(imageNum)}
                      alt="Postcard"
                      class="w-full sm:w-[292.32px] object-cover"
                    />
                  </div>
                </button>
              </div>
            {/each}
          </div>
          <!-- Third Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-[76px]">
            {#each allImages.slice(6, 9) as imageNum, i}
              <div 
                class="w-full sm:w-[324px] p-4 bg-white transition-all duration-500 will-change-transform hover-card"
                style="box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.1);"
                in:fly={{ y: 200, duration: 600, delay: (i + 6) * 150 }}
                out:fade={{ duration: 300 }}
              >
                <button
                  class="w-full h-full"
                  on:click={() => openModal(imageNum)}
                >
                  <div class="h-[334px] sm:h-[400px] flex justify-center items-center">
                  <img
                      src={getImagePath(imageNum)}
                      alt="Postcard"
                      class="w-full sm:w-[292.32px] object-cover"
                    />
                  </div>
                </button>
              </div>
            {/each}
          </div>
          <!-- Fourth Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-[76px]">
            {#each allImages.slice(9, 12) as imageNum, i}
              <div 
                class="w-full sm:w-[324px] p-4 bg-white transition-all duration-500 will-change-transform hover-card"
                style="box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.1);"
                in:fly={{ y: 200, duration: 600, delay: (i + 9) * 150 }}
                out:fade={{ duration: 300 }}
              >
                <button
                  class="w-full h-full"
                  on:click={() => openModal(imageNum)}
                >
                  <div class="h-[334px] sm:h-[400px] flex justify-center items-center">
                    <img
                      src={getImagePath(imageNum)}
                    alt="Postcard"
                      class="w-full sm:w-[292.32px] object-cover"
                  />
                </div>
                </button>
              </div>
            {/each}
          </div>
        </div>
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

  /* Smooth transitions */
  .transition-all {
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .transition-colors {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* Remove button styles */
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

  .hover-card {
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center;
  }

  .hover-card:hover {
    transform: scale(1.02) translateY(-12px) !important;
    box-shadow: 0px 40px 80px rgba(0, 0, 0, 0.15) !important;
  }
</style>
