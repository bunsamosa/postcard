<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { postcardStore } from "$lib/stores/postcard";
  import { goto } from "$app/navigation";
  
  let postcardData: any = null;
  let error = "";
  let imageOnTop = false;

  onMount(() => {
    try {
      const id = $page.params.id;
      const data = localStorage.getItem(`postcard_${id}`);
      
      if (!data) {
        error = "Postcard not found";
        return;
      }

      postcardData = JSON.parse(data);
      
      // Update the store with the loaded data
      postcardStore.set({
        message: postcardData.message,
        recipientInfo: postcardData.recipientInfo,
        selectedFont: postcardData.selectedFont,
        selectedColor: postcardData.selectedColor,
        selectedImage: postcardData.selectedImage,
        selectedStamp: postcardData.selectedStamp
      });
    } catch (err) {
      console.error('Failed to load postcard:', err);
      error = "Failed to load postcard";
    }
  });

  function toggleCardOrder() {
    imageOnTop = !imageOnTop;
  }

  // Function to get the correct image extension
  function getImagePath(imageNum: number): string {
    if (imageNum === 9 || imageNum === 10) {
      return `/images/img${imageNum}.png`;
    }
    return `/images/img${imageNum}.jpg`;
  }

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
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Courier+Prime&family=EB+Garamond&family=Jomhuria&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
</svelte:head>

<div class="w-full h-screen bg-white flex flex-col">
  <!-- Header -->
  <header class="max-w-[1201px] mx-auto h-[104px] sm:h-[104px] px-4 relative">
    <div class="absolute left-1/2 -translate-x-1/2 top-[30px] flex items-center gap-4">
      <h1 class="text-[40px] sm:text-[56px] font-jomhuria leading-[40px] sm:leading-[56px] text-black whitespace-nowrap">
        {#if error}
          Postcard not found
        {:else if postcardData}
          {postcardData.senderName} sent you a postcard!
        {:else}
          Loading...
        {/if}
      </h1>
    </div>
  </header>

  <!-- Main Content -->
  {#if error}
    <main class="flex-1 flex flex-col items-center justify-center px-4">
      <p class="text-lg text-gray-600 mb-4">{error}</p>
      <a href="/" class="text-black hover:underline">Create your own postcard</a>
    </main>
  {:else if postcardData}
    <main class="flex-1 flex flex-col items-center justify-center px-4 pb-8 relative">
      <!-- Postcard Container -->
      <div class="relative pt-10 scale-[0.89] mt-[92px]" style="width: 600px; height: 600px;">
        <!-- Image Side (Bottom Layer) -->
        <div 
          class="absolute -top-6 left-[72px] w-[450px] h-[600px] shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg overflow-hidden cursor-pointer transition-all duration-300" 
          style="transform: rotate({imageOnTop ? '0deg' : '12deg'}); background-color: {postcardData.selectedColor === '#FFEDB5' ? '#FFFCF2' : '#FFFFFF'}; z-index: {imageOnTop ? 20 : 10};"
          on:click={() => toggleCardOrder()}
        >
          <div class="w-full h-full flex items-center justify-center">
            <div class="w-[406px] h-[509.49px] flex items-center justify-center">
              <img
                src={getImagePath(postcardData.selectedImage)}
                alt="Selected postcard"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Written Side (Top Layer) -->
        <div 
          class="absolute top-0 left-0 w-[600px] h-[450px] shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg p-6 bg-white cursor-pointer transition-all duration-300" 
          style="background-color: {postcardData.selectedColor}; z-index: {imageOnTop ? 10 : 20};"
          on:click={() => toggleCardOrder()}
        >
          <div class="w-full h-full rounded relative">
            <!-- Stamp -->
            <div class="absolute top-0 right-0">
              <img 
                src={stamps[postcardData.selectedStamp - 1].path} 
                alt={`${stamps[postcardData.selectedStamp - 1].name} postage stamp`} 
                class="w-16 h-20 object-contain rounded-sm"
              />
            </div>

            <!-- Main Content Area -->
            <div class="flex h-full">
              <!-- Writing Area -->
              <div class="flex-1 relative">
                <div class="w-full h-full text-2xl {postcardData.selectedFont === 'Caveat' ? 'font-caveat' : postcardData.selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'}"
                  style="font-size: {postcardData.selectedFont === 'Caveat' ? '26px' : '20px'};"
                >
                  {postcardData.message}
                </div>
              </div>

              <!-- Right Side with To Section -->
              <div class="w-[256px] flex flex-col relative border-l" style="border-color: {postcardData.selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">
                <!-- Post Card Text -->
                <div class="absolute right-0 top-0 h-full flex items-center -mr-12">
                  <span class="transform rotate-90 origin-center text-[10px] tracking-[0.2em] font-medium" style="color: {postcardData.selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">POST CARD</span>
                </div>

                <!-- To Section -->
                <div class="pl-8 pr-6 mt-auto mb-16 relative">
                  <p class="text-base mb-4" style="color: {postcardData.selectedColor === '#FFFFFF' ? '#B7B7B7' : '#C1AA8E'};">To</p>
                  <div class="w-full h-[168px] {postcardData.selectedFont === 'Caveat' ? 'font-caveat' : postcardData.selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'} lined-textarea"
                    style="font-size: {postcardData.selectedFont === 'Caveat' ? '26px' : '20px'}; --line-color: {postcardData.selectedColor === '#FFFFFF' ? '#E9E9E9' : '#E4CE9E'};"
                  >
                    {postcardData.recipientInfo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Send Reply Button -->
      <div class="fixed bottom-[42px] right-[42px]">
        <a 
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          class="h-12 px-6 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition-colors"
        >
          <span class="text-sm font-medium">Send a reply</span>
          <span class="material-symbols-outlined text-[24px] font-normal leading-none">arrow_forward</span>
        </a>
      </div>

      <!-- Copyright Text -->
      <div class="fixed bottom-[42px] left-[42px]">
        <span class="text-[#8A8A8E] text-sm">© 2025 Sukanya Basu</span>
      </div>
    </main>
  {:else}
    <main class="flex-1 flex flex-col items-center justify-center px-4">
      <p class="text-lg">Loading...</p>
    </main>
  {/if}
</div>

<style>
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
</style> 