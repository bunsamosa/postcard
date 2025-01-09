<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { X, ArrowLeft, ArrowRight } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { onMount } from 'svelte';

  const MAX_IMAGES = 7; // Update this when adding more images

  function getRandomImageNumbers(count: number): number[] {
    const numbers = Array.from({ length: MAX_IMAGES }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers.slice(0, count);
  }

  const randomImages = getRandomImageNumbers(4);

  function navigateToSelect() {
    goto('/select');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      navigateToSelect();
    } else if (event.key === 'Escape') {
      navigateToSelect();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Jomhuria&family=Inter:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<div class="w-screen h-screen relative bg-white overflow-hidden font-inter">
  <div class="w-full h-full relative">
    <!-- Backdrop overlay -->
    <div class="w-full h-full absolute inset-0 bg-white backdrop-blur-[4px]"></div>

    <!-- Close button -->
    <button
      class="w-[36px] h-[36px] absolute right-4 sm:right-6 top-4 sm:top-6 flex items-center justify-center hover:opacity-80"
      on:click={navigateToSelect}
    >
      <X class="w-[18px] h-[18px] text-[#AEAEB2]" strokeWidth={2} />
    </button>

    <!-- Main content -->
    <div class="absolute left-1/2 top-[15%] sm:top-[20%] -translate-x-1/2 flex flex-col items-center gap-[32px] sm:gap-[56px] w-[min(445px,90%)] px-4 sm:px-0">
      <div class="flex flex-col items-start gap-[24px] sm:gap-[32px] w-full">
        <div class="text-center text-black text-[48px] sm:text-[64px] font-jomhuria font-normal w-full leading-[48px] sm:leading-[64px]">Send a postcard</div>

        <div class="flex flex-col items-start gap-[32px] sm:gap-[42px] w-full">
          <!-- Step 1 -->
          <div class="w-full flex items-center gap-[16px] sm:gap-[20px]">
            <div class="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] px-[14px] sm:px-[17px] py-[10px] sm:py-[12px] bg-[#F2F2F7] rounded-lg overflow-hidden flex-shrink-0 flex flex-col justify-center items-center">
              <div class="text-black text-[20px] sm:text-[24px] leading-[30px] sm:leading-[36px]">🎨</div>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-black text-[16px] sm:text-[20px] leading-[24px] sm:leading-[30px]">Choose a postcard with original artwork from </span>
              <a
                href="https://instagram.com/su.kanye"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#0066CC] hover:text-[#0066CC]/80 text-[16px] sm:text-[20px] leading-[24px] sm:leading-[30px]"
              >@su.kanye</a>
              <span class="text-[rgba(60,60,67,0.60)] text-[16px] sm:text-[20px] leading-[24px] sm:leading-[30px]"> (various artists soon)</span>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="w-full flex items-center gap-[16px] sm:gap-[20px]">
            <div class="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] px-[14px] sm:px-[17px] py-[10px] sm:py-[12px] bg-[#F2F2F7] rounded-lg overflow-hidden flex-shrink-0 flex flex-col justify-center items-center">
              <div class="text-black text-[20px] sm:text-[24px] leading-[30px] sm:leading-[36px]">✍️</div>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-black text-[16px] sm:text-[20px] leading-[24px] sm:leading-[30px]">Write on the postcard the old-fashioned way </span>
              <span class="text-[rgba(60,60,67,0.60)] text-[16px] sm:text-[20px] leading-[24px] sm:leading-[30px]">(with custom settings of course)</span>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="w-full flex items-center gap-[16px] sm:gap-[20px]">
            <div class="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] px-[14px] sm:px-[17px] py-[10px] sm:py-[12px] bg-[#F2F2F7] rounded-lg overflow-hidden flex-shrink-0 flex flex-col justify-center items-center">
              <div class="text-black text-[20px] sm:text-[24px] leading-[30px] sm:leading-[36px]">📬</div>
            </div>
            <div class="flex-1 min-w-0 text-black text-[16px] sm:text-[20px] leading-[24px] sm:leading-[30px]">
              Post it via email. Reaches instantly ✨
            </div>
          </div>
        </div>
      </div>

      <!-- Enter button -->
      <div class="w-full h-[48px] sm:h-[52px] flex flex-col items-center gap-[6px]">
        <button
          type="button"
          on:click={navigateToSelect}
          class="w-full px-[16px] sm:px-[20px] py-[12px] sm:py-[14px] bg-black hover:bg-black/90 rounded-xl flex justify-center items-center gap-2"
        >
          <span class="text-white text-[16px] sm:text-[17px] leading-[20px] sm:leading-[22px]">Enter</span>
          <ArrowRight class="w-[16px] sm:w-[18px] h-[10px] sm:h-[12px] text-white" />
        </button>
      </div>
    </div>

    <!-- Postcards with responsive positioning -->
    <div class="hidden lg:block">
      <!-- Bottom left postcard -->
      <div class="absolute w-[276.77px] h-[369.02px] left-[5%] bottom-[15%] [transform:rotate(3.81deg)] origin-top-left">
        <div class="w-full h-full bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] p-[13.67px]">
          <img src="/images/img{randomImages[0]}.jpg" class="w-full h-full object-cover" alt="Decorative postcard" />
        </div>
      </div>

      <!-- Top left postcard -->
      <div class="absolute w-[264px] h-[352px] left-[2%] top-[20%] [transform:rotate(-6deg)] origin-top-left">
        <div class="w-full h-full bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] p-[13.04px]">
          <img src="/images/img{randomImages[1]}.jpg" class="w-full h-full object-cover" alt="Decorative postcard" />
        </div>
      </div>

      <!-- Top right postcard -->
      <div class="absolute w-[264px] h-[352px] right-[5%] top-[20%] [transform:rotate(6.61deg)] origin-top-right">
        <div class="w-full h-full bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] p-[13.04px]">
          <img src="/images/img{randomImages[2]}.jpg" class="w-full h-full object-cover" alt="Decorative postcard" />
        </div>
      </div>

      <!-- Bottom right postcard -->
      <div class="absolute w-[260px] h-[346.67px] right-[8%] bottom-[12%] [transform:rotate(-5.03deg)] origin-bottom-right">
        <div class="w-full h-full bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] p-[12.04px]">
          <img src="/images/img{randomImages[3]}.jpg" class="w-full h-full object-cover" alt="Decorative postcard" />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .font-jomhuria {
    font-family: 'Jomhuria', cursive;
  }
</style>
