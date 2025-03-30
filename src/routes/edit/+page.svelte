<script lang="ts">
  import { ArrowLeft, Type, RotateCw, Palette, Send } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { page } from "$app/stores";
  import { scale } from "svelte/transition";
  
  let isFlipped = false;
  let selectedColor = "#FFFFFF";
  let message = "";
  let recipientInfo = "";
  let isFontSelectorOpen = false;
  let isColorSelectorOpen = false;
  let selectedFont = "Caveat";
  
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
    // TODO: Implement send functionality
    console.log("Sending postcard...");
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Courier+Prime&family=EB+Garamond&family=Jomhuria&display=swap" rel="stylesheet">
</svelte:head>

<div class="w-full min-h-screen bg-white">
  <!-- Header -->
  <header class="max-w-[1201px] mx-auto h-16 px-4 relative border-b border-[#F2F2F7]">
    <div class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
      <a href="/select" class="flex items-center gap-2 text-[#3D3D3D] hover:text-black">
        <ArrowLeft class="w-4 h-4" />
        <span class="text-sm">Choose a different one</span>
      </a>
    </div>
    <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <h1 class="text-[56px] font-jomhuria leading-[56px] text-black">Edit your postcard</h1>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex flex-col items-center justify-start px-4 h-[calc(100vh-64px)]" style="padding-top: {isFlipped ? '40px' : '112px'}; padding-bottom: 64px;">
    <!-- Postcard -->
    <div class="relative perspective-1000" style="width: {isFlipped ? '460px' : '680px'}; height: {isFlipped ? '680px' : '460px'}; transition: width 0.7s, height 0.7s;">
      <div class="w-full h-full transition-all duration-700 transform-style-preserve-3d relative" 
        style="transform: {isFlipped ? 'rotateY(180deg)' : 'none'};"
      >
        <!-- Front Side -->
        <div class="absolute w-full h-full shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg p-6 backface-hidden" style="background-color: {selectedColor};">
          <div class="w-full h-full rounded relative">
            <!-- Main Content Area -->
            <div class="flex h-full">
              <!-- Writing Area -->
              <div class="flex-1 relative">
                <textarea
                  bind:value={message}
                  placeholder="Write here"
                  class="w-full h-full resize-none border-none focus:outline-none focus:ring-0 text-2xl bg-transparent {selectedFont === 'Caveat' ? 'placeholder:text-[24px]' : 'placeholder:text-[20px]'} {selectedFont === 'Caveat' ? 'font-caveat' : selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'}"
                  style="color: #000000; font-size: {selectedFont === 'Caveat' ? '24px' : '20px'}; --placeholder-color: {selectedColor === '#FFFFFF' ? '#CCCCCC' : '#C1AA8E'};"
                ></textarea>
              </div>

              <!-- Right Side with To Section -->
              <div class="w-[240px] flex flex-col relative border-l" style="border-color: {selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">
                <!-- Post Card Text -->
                <div class="absolute right-0 top-0 h-full flex items-center -mr-6">
                  <span class="transform rotate-90 origin-center text-[10px] tracking-[0.2em] font-medium" style="color: {selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">POST CARD</span>
                </div>

                <!-- Stamp -->
                <div class="absolute top-4 right-4">
                  <img src="/images/india-stamp.png" alt="India postage stamp" class="w-12 h-14 object-contain" />
                </div>

                <!-- Copyright Text -->
                <div class="absolute left-[0px] top-[70px] transform -rotate-90 origin-bottom-left">
                  <span class="text-[10px] whitespace-nowrap" style="color: {selectedColor === '#FFFFFF' ? '#B7B7B7' : '#C1AA8E'};">Woman at a jharokha, © 2023 Sukriya Basu</span>
                </div>

                <!-- To Section -->
                <div class="px-8 mt-auto mb-16 relative">
                  <p class="text-base mb-4" style="color: {selectedColor === '#FFFFFF' ? '#B7B7B7' : '#C1AA8E'};">To</p>
                  <textarea
                    bind:value={recipientInfo}
                    placeholder="Name and email"
                    class="w-full resize-none border-none focus:outline-none focus:ring-0 text-2xl bg-transparent {selectedFont === 'Caveat' ? 'placeholder:text-[24px]' : 'placeholder:text-[20px]'} h-[168px] lined-textarea {selectedFont === 'Caveat' ? 'font-caveat' : selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'}"
                    style="color: #000000; font-size: {selectedFont === 'Caveat' ? '24px' : '20px'}; --placeholder-color: {selectedColor === '#FFFFFF' ? '#CCCCCC' : '#C1AA8E'}; --line-color: {selectedColor === '#FFFFFF' ? '#E9E9E9' : '#E4CE9E'};"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Side -->
        <div class="absolute w-full h-full bg-white shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg backface-hidden" 
          style="transform: rotateY(180deg);"
        >
          <div class="w-full h-full p-6">
            <img
              src="/images/img{$page.url.searchParams.get('image') || '1'}.jpg"
              alt="Selected postcard"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="fixed bottom-[84px] left-1/2 -translate-x-1/2">
      <div class="inline-flex items-center bg-white rounded-[16px] shadow-[0px_2px_20px_rgba(0,0,0,0.1)] p-1">
        <!-- Font Selector -->
        <div 
          class="relative group"
          on:mouseenter={() => isFontSelectorOpen = true}
          on:mouseleave={() => isFontSelectorOpen = false}
        >
          <button class="w-11 h-11 flex items-center justify-center rounded-[8px] hover:bg-[#F2F2F7] text-[#3D3D3D] transition-colors">
            <span class="{selectedFont === 'Caveat' ? 'font-caveat' : selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'} {selectedFont === 'Caveat' ? 'text-[24px]' : 'text-[20px]'}">Aa</span>
          </button>

          {#if isFontSelectorOpen}
            <div 
              class="font-selector-menu absolute top-0 left-0 -translate-y-full bg-white rounded-[16px] shadow-[0px_2px_20px_rgba(0,0,0,0.1)] overflow-hidden min-w-[120px] transition-all duration-200 ease-out origin-bottom-left mt-[-4px]"
              in:scale={{ duration: 200, start: 0.95, opacity: 0 }}
              out:scale={{ duration: 150, start: 0.95, opacity: 0 }}
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

        <!-- Flip Button -->
        <button class="w-11 h-11 flex items-center justify-center rounded-[8px] hover:bg-[#F2F2F7] text-[#3D3D3D] transition-colors" on:click={handleFlip}>
          <RotateCw class="w-5 h-5" />
        </button>

        <!-- Color Selector -->
        <div 
          class="relative group"
          on:mouseenter={() => isColorSelectorOpen = true}
          on:mouseleave={() => isColorSelectorOpen = false}
        >
          <button class="w-11 h-11 flex items-center justify-center rounded-[8px] hover:bg-[#F2F2F7] transition-colors">
            <div class="w-5 h-5 rounded-full border border-[#E5E5EA]" style="background-color: {selectedColor};"></div>
          </button>

          {#if isColorSelectorOpen}
            <div 
              class="color-selector-menu absolute top-0 left-0 -translate-y-full bg-white rounded-[16px] shadow-[0px_2px_20px_rgba(0,0,0,0.1)] overflow-hidden min-w-[120px] transition-all duration-200 ease-out origin-bottom-left mt-[-4px]"
              in:scale={{ duration: 200, start: 0.95, opacity: 0 }}
              out:scale={{ duration: 150, start: 0.95, opacity: 0 }}
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

        <!-- Separator -->
        <div class="w-[1px] h-5 bg-[#E5E5EA] mx-1"></div>

        <!-- Send Button -->
        <button 
          class="h-11 px-3 bg-black text-white rounded-[8px] flex items-center gap-2 hover:bg-[#1A1A1A] transition-colors"
          on:click={handleSend}
        >
          <Send class="w-4 h-4" />
          <span class="text-sm font-medium">Send</span>
        </button>
      </div>
    </div>
  </main>
</div>

<style>
  .perspective-1000 {
    perspective: 1000px;
  }

  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
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
</style> 