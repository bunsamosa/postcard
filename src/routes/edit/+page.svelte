<script lang="ts">
  import { ArrowLeft, Type, RotateCw, Palette, Send } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { page } from "$app/stores";
  
  let isFlipped = false;
  let selectedColor = "#000000";
  let message = "";
  let recipientInfo = "";
  
  function handleFlip() {
    isFlipped = !isFlipped;
  }
  
  function handleSend() {
    // TODO: Implement send functionality
    console.log("Sending postcard...");
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Jomhuria&family=Caveat:wght@400;500&display=swap" rel="stylesheet">
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
  <main class="flex flex-col items-center justify-start pt-28 pb-16 px-4 h-[calc(100vh-64px)]">
    <!-- Postcard -->
    <div class="relative w-[680px] h-[460px] perspective-1000">
      <div class="w-full h-full transition-transform duration-700 transform-style-preserve-3d relative" class:rotate-y-180={isFlipped}>
        <!-- Front Side -->
        <div class="absolute w-full h-full bg-white shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg p-6 backface-hidden">
          <div class="w-full h-full border border-[#E5E5E5] rounded bg-white relative">
            <!-- Main Content Area -->
            <div class="flex h-full">
              <!-- Writing Area -->
              <div class="flex-1 relative">
                <textarea
                  bind:value={message}
                  placeholder="Write here"
                  class="w-full h-full resize-none border-none focus:outline-none text-2xl bg-transparent font-caveat text-[#3D3D3D] placeholder:text-[#CCCCCC] placeholder:text-2xl placeholder:italic"
                  style="color: {selectedColor};"
                ></textarea>
                
                <!-- Copyright Text (on the right edge of writing area) -->
                <div class="absolute right-[-1px] bottom-4 pb-4 transform -rotate-90 origin-bottom-right">
                  <span class="text-[10px] text-[#B7B7B7] whitespace-nowrap">Woman at a jharokha, © 2023 Sukriya Basu</span>
                </div>
              </div>

              <!-- Right Side with To Section -->
              <div class="w-[240px] flex flex-col relative border-l border-[#E5E5E5]">
          <!-- Post Card Text -->
                <div class="absolute right-0 top-0 h-full flex items-center -mr-6">
                  <span class="transform rotate-90 origin-center text-[#E5E5E5] text-[10px] tracking-[0.2em] font-medium">POST CARD</span>
                </div>

                <!-- Stamp -->
                <div class="absolute top-4 right-4">
                  <img src="/images/india-stamp.png" alt="India postage stamp" class="w-12 h-14 object-contain" />
                </div>

                <!-- To Section -->
                <div class="px-8 mt-auto mb-16">
                  <p class="text-[#6B6B6B] text-sm mb-4">To</p>
                  <div class="space-y-8">
                    <div class="w-full h-[1px] bg-[#E5E5E5]"></div>
                    <div class="w-full h-[1px] bg-[#E5E5E5]"></div>
                    <div class="w-full h-[1px] bg-[#E5E5E5]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Side -->
        <div class="absolute w-full h-full bg-white shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg backface-hidden rotate-y-180">
          <img
            src="/images/img{$page.url.searchParams.get('image') || '1'}.jpg"
            alt="Selected postcard"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white rounded-[32px] shadow-[0px_2px_20px_rgba(0,0,0,0.1)] px-4 py-2">
      <!-- Font Selector -->
      <button class="p-2 rounded-full hover:bg-[#F2F2F7] text-[#3D3D3D]">
        <span class="font-serif text-lg">Aa</span>
      </button>

      <!-- Flip Button -->
      <div class="w-[1px] h-6 bg-[#E5E5E5] mx-2"></div>
      <button class="p-2 rounded-full hover:bg-[#F2F2F7]" on:click={handleFlip}>
        <RotateCw class="w-5 h-5 text-[#3D3D3D]" />
      </button>

      <!-- Color Selector -->
      <div class="w-[1px] h-6 bg-[#E5E5E5] mx-2"></div>
      <button class="p-2 rounded-full hover:bg-[#F2F2F7]">
        <div class="w-5 h-5 rounded-full border border-[#E5E5E5]"></div>
      </button>

      <!-- Send Button -->
      <div class="w-[1px] h-6 bg-[#E5E5E5] mx-2"></div>
      <button 
        class="px-4 py-1.5 bg-black text-white rounded-full flex items-center gap-2 hover:bg-[#1A1A1A] text-sm"
        on:click={handleSend}
      >
        <Send class="w-4 h-4" />
        <span>Send</span>
      </button>
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
    transform: rotateY(180deg);
  }

  :global(.font-jomhuria) {
    font-family: 'Jomhuria', cursive;
  }

  :global(.font-caveat) {
    font-family: 'Caveat', cursive;
  }

  textarea::placeholder {
    font-style: italic;
  }
</style> 