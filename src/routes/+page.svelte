<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { X, ArrowLeft } from "lucide-svelte";
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Jomhuria&family=Inter:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<div class="w-screen h-screen relative bg-white overflow-hidden font-inter">
  <div class="w-full h-full relative">
    <!-- Backdrop overlay -->
    <div class="w-full h-full absolute inset-0 bg-white backdrop-blur-[4px]"></div>

    <!-- Close button -->
    <button class="w-[36px] h-[36px] absolute right-6 top-6 flex items-center justify-center hover:opacity-80">
      <X class="w-[18px] h-[18px] text-[#AEAEB2]" strokeWidth={2} />
    </button>

    <!-- Main content -->
    <div class="absolute left-1/2 top-[20%] -translate-x-1/2 flex flex-col items-center gap-[56px] w-[min(445px,90%)]">
      <div class="flex flex-col items-start gap-[32px] w-full">
        <div class="text-center text-black text-[64px] font-jomhuria font-normal w-full leading-[64px]">Send a postcard</div>

        <div class="flex flex-col items-start gap-[42px] w-full">
          <!-- Step 1 -->
          <div class="w-full flex items-center gap-[20px]">
            <div class="w-[56px] h-[56px] px-[17px] py-[12px] bg-[#F2F2F7] rounded-lg overflow-hidden flex-shrink-0 flex flex-col justify-center items-center">
              <div class="text-black text-[24px] leading-[36px]">🎨</div>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-black text-[20px] leading-[30px]">Choose a postcard with original artwork from @su.kanye </span>
              <span class="text-[rgba(60,60,67,0.60)] text-[20px] leading-[30px]">(various artists soon)</span>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="w-full flex items-center gap-[20px]">
            <div class="w-[56px] h-[56px] px-[17px] py-[12px] bg-[#F2F2F7] rounded-lg overflow-hidden flex-shrink-0 flex flex-col justify-center items-center">
              <div class="text-black text-[24px] leading-[36px]">✍️</div>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-black text-[20px] leading-[30px]">Write on the postcard the old-fashioned way </span>
              <span class="text-[rgba(60,60,67,0.60)] text-[20px] leading-[30px]">(with custom settings of course)</span>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="w-full flex items-center gap-[20px]">
            <div class="w-[56px] h-[56px] px-[17px] py-[12px] bg-[#F2F2F7] rounded-lg overflow-hidden flex-shrink-0 flex flex-col justify-center items-center">
              <div class="text-black text-[24px] leading-[36px]">📬</div>
            </div>
            <div class="flex-1 min-w-0 text-black text-[20px] leading-[30px]">
              Post it via email. Reaches instantly ✨
            </div>
          </div>
        </div>
      </div>

      <!-- Enter button -->
      <div class="w-full h-[52px] flex flex-col items-center gap-[6px]">
        <Button variant="default" class="w-full px-[20px] py-[14px] bg-black hover:bg-black/90 rounded-xl flex justify-center items-center gap-2">
          <span class="text-white text-[17px] leading-[22px]">Enter</span>
          <ArrowLeft class="w-[18px] h-[12px] text-white" />
        </Button>
      </div>
    </div>

    <!-- Postcards with responsive positioning -->
    <div class="hidden lg:block">
      <!-- Bottom left postcard -->
      <div class="absolute w-[276.77px] h-[369.02px] left-[5%] bottom-[15%] [transform:rotate(3.81deg)] origin-top-left">
        <div class="w-full h-full bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] p-[13.67px]">
          <img src="/images/home/indian.png" class="w-full h-full object-cover" alt="Decorative postcard" />
        </div>
      </div>

      <!-- Top left postcard -->
      <div class="absolute w-[264px] h-[352px] left-[2%] top-[20%] [transform:rotate(-6deg)] origin-top-left">
        <div class="w-full h-full bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] p-[13.04px]">
          <img src="/images/home/weekend.png" class="w-full h-full object-cover" alt="Decorative postcard" />
        </div>
      </div>

      <!-- Top right postcard -->
      <div class="absolute w-[264px] h-[352px] right-[5%] top-[20%] [transform:rotate(6.61deg)] origin-top-right">
        <div class="w-full h-full bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] p-[13.04px]">
          <img src="/images/home/tree.png" class="w-full h-full object-cover" alt="Decorative postcard" />
        </div>
      </div>

      <!-- Bottom right postcard -->
      <div class="absolute w-[260px] h-[346.67px] right-[8%] bottom-[12%] [transform:rotate(-5.03deg)] origin-bottom-right">
        <div class="w-full h-full bg-[#F5E4C8] shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] p-[12.04px]">
          <img src="/images/home/coffee.png" class="w-full h-full object-cover" alt="Decorative postcard" />
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
