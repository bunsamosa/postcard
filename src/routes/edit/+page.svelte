<script lang="ts">
  import { ArrowLeft, Type, RotateCw, Palette, Send } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { page } from "$app/stores";
  import { scale } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { postcardStore } from "$lib/stores/postcard";
  import { onMount } from "svelte";
  
  let isFlipped = false;
  let isFontSelectorOpen = false;
  let isColorSelectorOpen = false;
  let closeTimeout: ReturnType<typeof setTimeout>;
  let colorCloseTimeout: ReturnType<typeof setTimeout>;
  let isStampHovered = false;

  // Initialize local state
  let message = $postcardStore.message;
  let recipientInfo = $postcardStore.recipientInfo;
  let selectedFont = $postcardStore.selectedFont;
  let selectedColor = $postcardStore.selectedColor;

  // Stamps data
  const stamps = [
    { name: "Stamp 1", path: "/images/stamps/stamp1.jpg" },
    { name: "Stamp 2", path: "/images/stamps/stamp2.jpg" },
    { name: "Stamp 3", path: "/images/stamps/stamp3.jpg" },
    { name: "Stamp 4", path: "/images/stamps/stamp4.jpg" },
    { name: "Stamp 5", path: "/images/stamps/stamp5.jpg" },
    { name: "Stamp 6", path: "/images/stamps/stamp6.jpg" },
    { name: "Stamp 7", path: "/images/stamps/stamp7.jpg" },
    { name: "Stamp 8", path: "/images/stamps/stamp8.jpg" },
    { name: "Stamp 9", path: "/images/stamps/stamp9.jpg" },
    { name: "Stamp 10", path: "/images/stamps/stamp10.jpg" },
    { name: "Stamp 11", path: "/images/stamps/stamp11.jpg" },
    { name: "Stamp 12", path: "/images/stamps/stamp12.jpg" },
    { name: "Stamp 13", path: "/images/stamps/stamp13.jpg" },
    { name: "Stamp 14", path: "/images/stamps/stamp14.jpg" }
  ];

  // Get random stamp on page load
  const randomStampIndex = Math.floor(Math.random() * stamps.length) + 1;
  postcardStore.update(store => ({
    ...store,
    selectedStamp: randomStampIndex
  }));

  // Get stamp from store
  let selectedStamp = stamps[$postcardStore.selectedStamp - 1];

  // Update store when values change
  $: {
    postcardStore.set({
      ...($postcardStore),
      message,
      recipientInfo,
      selectedFont,
      selectedColor,
      selectedImage: $page.url.searchParams.get('image') || '1',
    });
  }
  
  const fonts = [
    { name: "Caveat", preview: "Aa", class: "font-caveat" },
    { name: "Courier Prime", preview: "Aa", class: "font-courier-prime" },
    { name: "EB Garamond", preview: "Aa", class: "font-eb-garamond" }
  ];

  const colors = [
    { value: "#FFFFFF", label: "White" },
    { value: "#FFEDB5", label: "Indian yellow" }
  ];
  
  function handleFontSelect(font: string) {
    selectedFont = font;
  }

  function handleColorSelect(color: string) {
    selectedColor = color;
  }

  function handleFlip() {
    isFlipped = !isFlipped;
  }
  
  function handleSend() {
    goto('/post');
  }

  function handleFontMenuEnter() {
    clearTimeout(closeTimeout);
    isFontSelectorOpen = true;
  }

  function handleFontMenuLeave() {
    closeTimeout = setTimeout(() => {
      isFontSelectorOpen = false;
    }, 100);
  }

  function handleColorMenuEnter() {
    clearTimeout(colorCloseTimeout);
    isColorSelectorOpen = true;
  }

  function handleColorMenuLeave() {
    colorCloseTimeout = setTimeout(() => {
      isColorSelectorOpen = false;
    }, 100);
  }

  function handleChangeStamp() {
    const currentIndex = $postcardStore.selectedStamp;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * stamps.length) + 1;
    } while (newIndex === currentIndex);
    
    selectedStamp = stamps[newIndex - 1];
    postcardStore.update(store => ({
      ...store,
      selectedStamp: newIndex
    }));
  }

  // Function to get the correct image extension
  function getImagePath(imageNum: number): string {
    if (imageNum === 9 || imageNum === 10) {
      return `/images/img${imageNum}.png`;
    }
    return `/images/img${imageNum}.jpg`;
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Courier+Prime&family=EB+Garamond&family=Jomhuria&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
</svelte:head>

<div class="w-full h-screen bg-white overflow-hidden">
  <!-- Header -->
  <header class="max-w-[1201px] mx-auto h-[104px] sm:h-[104px] px-4 relative">
    <div class="absolute left-1/2 -translate-x-1/2 top-[30px] flex items-center gap-4">
      <a href="/select" class="flex items-center text-[#3D3D3D] hover:text-black">
        <ArrowLeft class="w-6 h-6" />
      </a>
      <h1 class="text-[40px] sm:text-[56px] font-jomhuria leading-[40px] sm:leading-[56px] text-black">Edit your postcard</h1>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col items-center justify-center px-4 pb-8">
    <!-- Postcard -->
    <div class="relative perspective-1000 pt-[21px]" style="width: {isFlipped ? '600px' : '600px'}; height: {isFlipped ? '450px' : '450px'}; transition: all 0.35s cubic-bezier(0.3, 0, 0.2, 1); transform: {isFlipped ? 'translateY(40px)' : 'translateY(0)'};">
      <div class="w-full h-full transition-all duration-350 transform-style-preserve-3d relative will-change-transform" 
        style="transform: {isFlipped ? 'rotateY(180deg) rotate(90deg)' : 'none'}; transition: transform 0.35s cubic-bezier(0.3, 0, 0.2, 1);"
      >
        <!-- Front Side -->
        <div class="absolute w-full h-full shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg backface-hidden will-change-transform" 
          style="background-color: {selectedColor}; transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);"
        >
          <div class="w-full h-full rounded relative p-6">
            <!-- Stamp -->
            <button 
              type="button"
              class="absolute top-4 right-4 cursor-pointer focus:outline-none"
              on:mouseenter={() => isStampHovered = true}
              on:mouseleave={() => isStampHovered = false}
              on:click={handleChangeStamp}
            >
              <div class="relative">
                <img 
                  src={selectedStamp.path} 
                  alt={`${selectedStamp.name} postage stamp`} 
                  class="w-16 h-20 object-contain rounded-sm transition-opacity duration-200"
                  style="opacity: {isStampHovered ? '0.5' : '1'}"
                />
                {#if isStampHovered}
                  <div 
                    class="absolute inset-0 flex items-center justify-center"
                    transition:scale={{ duration: 200, start: 0.95 }}
                  >
                    <span class="material-symbols-outlined text-white text-[24px]">wand_stars</span>
                  </div>
                {/if}
              </div>
            </button>

            <!-- Main Content Area -->
            <div class="flex h-full">
              <!-- Writing Area -->
              <div class="flex-1 relative">
                <textarea
                  bind:value={message}
                  placeholder="Write here"
                  class="w-full h-full resize-none border-none focus:outline-none focus:ring-0 text-2xl bg-transparent {selectedFont === 'Caveat' ? 'placeholder:text-[26px]' : 'placeholder:text-[20px]'} {selectedFont === 'Caveat' ? 'font-caveat' : selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'}"
                  style="color: #000000; font-size: {selectedFont === 'Caveat' ? '26px' : '20px'}; --placeholder-color: {selectedColor === '#FFFFFF' ? '#CCCCCC' : '#C1AA8E'};"
                ></textarea>
              </div>

              <!-- Right Side with To Section -->
              <div class="w-[256px] flex flex-col relative border-l" style="border-color: {selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">
                <!-- Post Card Text -->
                <div class="absolute right-0 top-0 h-full flex items-center -mr-12">
                  <span class="transform rotate-90 origin-center text-[10px] tracking-[0.2em] font-medium" style="color: {selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">POST CARD</span>
                </div>

                <!-- Copyright Text -->
                <div class="absolute left-[6px] top-[380px]">
                  <span class="block transform -rotate-90 origin-top-left text-[10px] whitespace-nowrap" style="color: {selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">© 2025 Sukanya Basu</span>
                </div>

                <!-- To Section -->
                <div class="pl-8 pr-6 mt-auto mb-16 relative">
                  <p class="text-base mb-4" style="color: {selectedColor === '#FFFFFF' ? '#B7B7B7' : '#C1AA8E'};">To</p>
                  <textarea
                    bind:value={recipientInfo}
                    placeholder="Email"
                    class="w-full resize-none border-none focus:outline-none focus:ring-0 text-2xl bg-transparent {selectedFont === 'Caveat' ? 'placeholder:text-[26px]' : 'placeholder:text-[20px]'} h-[168px] lined-textarea {selectedFont === 'Caveat' ? 'font-caveat' : selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'}"
                    style="color: #000000; font-size: {selectedFont === 'Caveat' ? '26px' : '20px'}; --placeholder-color: {selectedColor === '#FFFFFF' ? '#CCCCCC' : '#C1AA8E'}; --line-color: {selectedColor === '#FFFFFF' ? '#E9E9E9' : '#E4CE9E'};"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Side -->
        <div class="absolute w-full h-full shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg backface-hidden" 
          style="transform: rotateY(180deg); background-color: {selectedColor === '#FFEDB5' ? '#FFFCF2' : '#FFFFFF'};"
        >
          <div class="w-full h-full flex items-center justify-center">
            <div class="w-[406px] h-[509.49px] flex items-center justify-center">
              <img
                src={getImagePath(parseInt($page.url.searchParams.get('image') || '1'))}
                alt="Selected postcard"
                class="w-full h-full object-cover transform rotate-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="fixed bottom-[60px] left-1/2 -translate-x-1/2">
      <div class="inline-flex items-center bg-white rounded-[12px] shadow-[0px_2px_20px_rgba(0,0,0,0.1)] p-1">
        <!-- Font Selector -->
        <div class="relative">
          <button 
            class="w-11 h-11 flex items-center justify-center rounded-[12px] hover:bg-[#F2F2F7] text-[#3D3D3D] transition-colors"
            on:mouseenter={handleFontMenuEnter}
            on:mouseleave={handleFontMenuLeave}
          >
            <span class="{selectedFont === 'Caveat' ? 'font-caveat' : selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'} {selectedFont === 'Caveat' ? 'text-[24px]' : 'text-[20px]'}">Aa</span>
          </button>

          {#if isFontSelectorOpen}
            <div 
              class="font-selector-menu absolute top-0 left-0 -translate-y-full bg-white rounded-[12px] shadow-[0px_2px_20px_rgba(0,0,0,0.1)] overflow-hidden min-w-[120px] transition-all duration-200 ease-out origin-bottom-left mt-[-8px]"
              in:scale={{ duration: 200, start: 0.95, opacity: 0 }}
              out:scale={{ duration: 150, start: 0.95, opacity: 0 }}
              on:mouseenter={handleFontMenuEnter}
              on:mouseleave={handleFontMenuLeave}
            >
              {#each fonts as font}
                <button
                  class="w-full h-11 px-4 flex items-center justify-between hover:bg-[#F2F2F7] transition-colors {selectedFont === font.name ? 'bg-black text-white hover:bg-black' : ''}"
                  on:click={() => handleFontSelect(font.name)}
                >
                  <span class="{font.class} {font.name === 'Caveat' ? 'text-[24px]' : 'text-[20px]'}">{font.preview}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Color Selector -->
        <div class="relative">
          <button 
            class="w-11 h-11 flex items-center justify-center rounded-[12px] hover:bg-[#F2F2F7] transition-colors"
            on:mouseenter={handleColorMenuEnter}
            on:mouseleave={handleColorMenuLeave}
          >
            <div class="w-5 h-5 rounded-full border border-[#E5E5EA]" style="background-color: {selectedColor};"></div>
          </button>

          {#if isColorSelectorOpen}
            <div 
              class="color-selector-menu absolute top-0 left-0 -translate-y-full bg-white rounded-[12px] shadow-[0px_2px_20px_rgba(0,0,0,0.1)] overflow-hidden min-w-[120px] transition-all duration-200 ease-out origin-bottom-left mt-[-8px]"
              in:scale={{ duration: 200, start: 0.95, opacity: 0 }}
              out:scale={{ duration: 150, start: 0.95, opacity: 0 }}
              on:mouseenter={handleColorMenuEnter}
              on:mouseleave={handleColorMenuLeave}
            >
              {#each colors as color}
                <button
                  class="w-full h-11 px-4 flex items-center justify-between hover:bg-[#F2F2F7] transition-colors {selectedColor === color.value ? 'bg-black hover:bg-black' : ''}"
                  on:click={() => handleColorSelect(color.value)}
                >
                  <div class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full border border-[#E5E5EA] flex-shrink-0" style="background-color: {color.value};"></div>
                    <span class="text-sm whitespace-nowrap {selectedColor === color.value ? 'text-white' : 'text-[#3D3D3D]'}">{color.label}</span>
                  </div>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Flip Button -->
        <button class="w-11 h-11 flex items-center justify-center rounded-[12px] hover:bg-[#F2F2F7] text-[#3D3D3D] transition-colors" on:click={handleFlip}>
          <RotateCw class="w-5 h-5" />
        </button>

        <!-- Separator -->
        <div class="w-[1px] h-5 bg-[#E5E5EA] mx-1"></div>

        <!-- Send Button -->
        <button 
          class="h-11 px-3 rounded-[12px] flex items-center gap-2 transition-colors {message.trim() ? 'bg-black text-white hover:bg-[#1A1A1A]' : 'bg-[#F2F2F7] text-[#8E8E93] cursor-not-allowed'}"
          on:click={handleSend}
          disabled={!message.trim()}
        >
          <Send class="w-4 h-4" />
          <span class="text-sm font-medium">Post</span>
        </button>
      </div>
    </div>
  </main>
</div>

<style>
  .perspective-1000 {
    perspective: 1000px;
    transform-origin: center center;
  }

  .transform-style-preserve-3d {
    transform-style: preserve-3d;
    transform-origin: center center;
  }

  .backface-hidden {
    backface-visibility: hidden;
    transform-origin: center center;
  }

  .rotate-y-180 {
    transform: rotateY(180deg) rotate(90deg);
  }

  :global(.font-jomhuria) {
    font-family: 'Jomhuria', cursive;
  }

  :global(.font-caveat) {
    font-family: 'Caveat', cursive;
  }

  :global(.font-courier-prime) {
    font-family: 'Courier Prime', monospace;
  }

  :global(.font-eb-garamond) {
    font-family: 'EB Garamond', serif;
  }

  .lined-textarea {
    background-image: repeating-linear-gradient(transparent, transparent 41px, var(--line-color, #E9E9E9) 41px, var(--line-color, #E9E9E9) 42px);
    line-height: 42px;
    padding: 0;
  }

  textarea::placeholder {
    color: var(--placeholder-color) !important;
  }

  .font-selector-menu::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
  }

  .color-selector-menu::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
  }

  /* Add smooth transitions for all transformations */
  .transition-all {
    transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* Optimize performance */
  .will-change-transform {
    will-change: transform;
  }
</style> 