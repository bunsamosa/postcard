<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ChevronLeft, ChevronRight, LayoutGrid, Layers } from "lucide-svelte";

  const MAX_IMAGES = 7; // Update this when adding more images
  let currentIndex = 0;
  let isStackView = true;

  function nextImage() {
    currentIndex = (currentIndex + 1) % MAX_IMAGES;
  }

  function previousImage() {
    currentIndex = (currentIndex - 1 + MAX_IMAGES) % MAX_IMAGES;
  }

  function toggleView() {
    isStackView = !isStackView;
  }

  // Generate array of all image indices
  const allImages = Array.from({ length: MAX_IMAGES }, (_, i) => i + 1);
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Jomhuria&family=Inter:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<div class="w-full min-h-screen bg-white p-4">
  <!-- Header -->
  <header class="max-w-[1201px] mx-auto h-16 px-4 relative">
    <!-- Title -->
    <div class="absolute left-4 top-[6px]">
      <h1 class="text-[56px] font-jomhuria leading-[56px] text-black">Send a postcard</h1>
    </div>

    <!-- View toggles -->
    <div class="absolute left-1/2 -translate-x-1/2 top-[14px] flex items-center gap-2">
      <button
        class="p-[9px] {isStackView ? 'bg-[#EDF2F8]' : ''} rounded-[75px] hover:bg-[#E2E9F2]"
        on:click={() => isStackView = true}
      >
        <div class="w-[18px] h-[18px] relative">
          <div class="absolute left-[1.5px] top-[1.5px] w-[15px] h-[7.5px] border-[1.5px] border-[#4D4D4D]"></div>
          <div class="absolute left-[1.5px] top-[12.75px] w-[15px] h-[3.75px] border-[1.5px] border-[#4D4D4D]"></div>
          <div class="absolute left-[1.5px] top-[9px] w-[15px] h-[3.75px] border-[1.5px] border-[#4D4D4D]"></div>
        </div>
      </button>
      <button
        class="p-[9px] {!isStackView ? 'bg-[#EDF2F8]' : ''} rounded-[75px] hover:bg-[#F2F2F7]"
        on:click={() => isStackView = false}
      >
        <div class="w-[18px] h-[18px] relative">
          <div class="absolute left-[2.25px] top-[2.25px] w-[5.25px] h-[5.25px] border-[1.5px] border-[#4D4D4D]"></div>
          <div class="absolute left-[10.5px] top-[2.25px] w-[5.25px] h-[5.25px] border-[1.5px] border-[#4D4D4D]"></div>
          <div class="absolute left-[10.5px] top-[10.5px] w-[5.25px] h-[5.25px] border-[1.5px] border-[#4D4D4D]"></div>
          <div class="absolute left-[2.25px] top-[10.5px] w-[5.25px] h-[5.25px] border-[1.5px] border-[#4D4D4D]"></div>
        </div>
      </button>
    </div>

    <!-- Navigation -->
    <div class="absolute right-4 top-4 flex items-center gap-2">
      <button class="px-[10px] py-1 rounded-[40px] hover:bg-[#F2F2F7]">
        <span class="text-[#3D3D3D] text-base leading-5 font-inter">Print Order</span>
      </button>
      <button class="px-[10px] py-1 rounded-[40px] hover:bg-[#F2F2F7]">
        <span class="text-[#3D3D3D] text-base leading-5 font-inter">About</span>
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex flex-col items-center justify-center mt-[85px]">
    {#if isStackView}
      <!-- Stacked Cards View -->
      <div class="relative w-[499.30px] h-[645.83px]">
        <!-- Background Cards -->
        {#each allImages.slice(currentIndex + 1, currentIndex + 4) as imageNum, idx}
          <div
            class="absolute w-[450px] h-[600px] bg-white shadow-[18.15px_46.29px_38.12px_rgba(12,12,13,0.10)]"
            style="left: {28.85 + (idx * 12)}px; top: {12.24 + (idx * 12)}px; transform: rotate(1.55deg); transform-origin: top-left;"
          >
            <img
              src="/images/img{imageNum}.jpg"
              alt="Background postcard"
              class="w-full h-full object-cover opacity-50"
            />
          </div>
        {/each}

        <!-- Main Card -->
        <div class="absolute left-0 top-0 bg-white shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] pt-6 pb-[66.51px] px-[22px]">
          <div class="flex justify-center items-center">
            <img
              src="/images/img{allImages[currentIndex]}.jpg"
              alt="Current postcard"
              class="w-[406px] h-[509.49px] object-cover"
            />
          </div>
        </div>

        <!-- Navigation Arrows -->
        <div class="flex items-center gap-4 mt-16 absolute bottom-[-80px] left-1/2 -translate-x-1/2">
          <button
            class="p-3 rounded-[32px] hover:bg-[#F2F2F7] overflow-hidden"
            on:click={previousImage}
          >
            <ChevronLeft class="w-5 h-5 text-[#5A5A5A]" strokeWidth={2} />
          </button>
          <button
            class="p-3 rounded-[32px] hover:bg-[#F2F2F7] overflow-hidden"
            on:click={nextImage}
          >
            <ChevronRight class="w-5 h-5 text-[#5A5A5A]" strokeWidth={2} />
          </button>
        </div>
      </div>
    {:else}
      <!-- Grid View -->
      <div class="max-w-[1201px] mx-auto">
        <div class="flex flex-col gap-[76px]">
          <!-- First Row -->
          <div class="flex justify-center gap-[76px]">
            {#each allImages.slice(0, 3) as imageNum}
              <div class="w-[324px] pt-4 pb-[50px] px-4 bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)]">
                <div class="h-[366px] flex justify-center items-center">
                  <img
                    src="/images/img{imageNum}.jpg"
                    alt="Postcard"
                    class="w-[292.32px] h-[366.83px] object-cover"
                  />
                </div>
              </div>
            {/each}
          </div>
          <!-- Second Row -->
          <div class="flex justify-center gap-[76px]">
            {#each allImages.slice(3, 6) as imageNum}
              <div class="w-[324px] pt-4 pb-[50px] px-4 bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)]">
                <div class="h-[366px] flex justify-center items-center">
                  <img
                    src="/images/img{imageNum}.jpg"
                    alt="Postcard"
                    class="w-[292.32px] h-[366.83px] object-cover"
                  />
                </div>
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
</style>
