<script lang="ts">
  import { ArrowLeft } from "lucide-svelte";
  import { page } from "$app/stores";
  import { postcardStore } from "$lib/stores/postcard";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  
  let userName = "";
  let colorCloseTimeout: ReturnType<typeof setTimeout>;
  let isColorSelectorOpen = false;
  let message = "";
  let recipientInfo = "";
  let selectedFont = "";
  let selectedColor = "";
  let selectedImage = 0;
  let copySuccess = false;
  let copyTimeout: ReturnType<typeof setTimeout>;
  
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

  // Get stamp from store
  let selectedStamp = stamps[$postcardStore.selectedStamp - 1];
  
  // Subscribe to the store
  postcardStore.subscribe(store => {
    message = store.message;
    recipientInfo = store.recipientInfo;
    selectedFont = store.selectedFont;
    selectedColor = store.selectedColor;
    selectedImage = Number(store.selectedImage);
    selectedStamp = stamps[store.selectedStamp - 1];
  });
  
  function handleEmailIt() {
    // TODO: Implement email functionality
    console.log("Emailing postcard...");
  }
  
  async function handleCopyLink() {
    // Create an object with all the postcard data
    const postcardData = {
      senderName: userName,
      message,
      recipientInfo,
      selectedFont,
      selectedColor,
      selectedImage
    };

    // Convert the data to a base64 string
    const encodedData = btoa(JSON.stringify(postcardData));
    
    // Generate the shareable URL
    const shareUrl = `${window.location.origin}/share/${encodedData}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      copySuccess = true;
      
      // Reset the success message after 2 seconds
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copySuccess = false;
      }, 1000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  }

  function handleColorMenuLeave() {
    colorCloseTimeout = setTimeout(() => {
      isColorSelectorOpen = false;
    }, 100);
  }

  // Function to get the correct image extension
  function getImagePath(imageNum: number): string {
    if (imageNum === 9 || imageNum === 10) {
      return `/images/img${imageNum}.png`;
    }
    return `/images/img${imageNum}.jpg`;
  }

  onMount(() => {
    return () => {
      clearTimeout(copyTimeout);
      clearTimeout(colorCloseTimeout);
    };
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Courier+Prime&family=EB+Garamond&family=Jomhuria&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
</svelte:head>

<div class="w-full h-screen bg-white flex flex-col">
  <!-- Header -->
  <header class="h-[104px] sm:h-[104px] px-4 relative">
    <div class="absolute left-1/2 -translate-x-1/2 top-[30px] flex items-center gap-4">
      <a href="/edit" class="flex items-center text-[#3D3D3D] hover:text-black">
        <ArrowLeft class="w-6 h-6" />
      </a>
      <h1 class="text-[40px] sm:text-[56px] font-jomhuria leading-[40px] sm:leading-[56px] text-black">Post it!</h1>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col items-center justify-center px-4 pb-8">
    <!-- Postcard Display -->
    <div class="w-[600px] h-[450px] shadow-[0px_30.29px_83.51px_rgba(12,12,13,0.10)] rounded-lg" style="background-color: {selectedColor === '#FFEDB5' ? '#FFEDB5' : '#FFFFFF'};">
      <div class="w-full h-full rounded relative p-6" style="background-color: {selectedColor === '#FFEDB5' ? '#FFEDB5' : '#FFFFFF'};">
        <!-- Stamp -->
        <div class="absolute top-4 right-4">
          <img 
            src={selectedStamp.path} 
            alt={`${selectedStamp.name} postage stamp`} 
            class="w-16 h-20 object-contain rounded-sm"
          />
        </div>

        <!-- Main Content Area -->
        <div class="flex h-full">
          <!-- Writing Area -->
          <div class="flex-1 relative">
            <div class="w-full h-full text-2xl {selectedFont === 'Caveat' ? 'font-caveat' : selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'}"
              style="font-size: {selectedFont === 'Caveat' ? '26px' : '20px'};"
            >
              {message}
            </div>
          </div>

          <!-- Right Side with To Section -->
          <div class="w-[256px] flex flex-col relative border-l" style="border-color: {selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">
            <!-- Post Card Text -->
            <div class="absolute right-0 top-0 h-full flex items-center -mr-12">
              <span class="transform rotate-90 origin-center text-[10px] tracking-[0.2em] font-medium" style="color: {selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">POST CARD</span>
            </div>

            <!-- Copyright Text -->
            <div class="absolute left-[6px] top-[410px]">
              <span class="block transform -rotate-90 origin-top-left text-[10px] whitespace-nowrap" style="color: {selectedColor === '#FFFFFF' ? '#E5E5E5' : '#E4CE9E'};">© 2025 Sukanya Basu</span>
            </div>

            <!-- To Section -->
            <div class="pl-8 pr-6 mt-auto mb-16 relative">
              <p class="text-base mb-4" style="color: {selectedColor === '#FFFFFF' ? '#B7B7B7' : '#C1AA8E'};">To</p>
              <div class="w-full h-[168px] {selectedFont === 'Caveat' ? 'font-caveat' : selectedFont === 'Courier Prime' ? 'font-courier-prime' : 'font-eb-garamond'} lined-textarea"
                style="font-size: {selectedFont === 'Caveat' ? '26px' : '20px'}; --line-color: {selectedColor === '#FFFFFF' ? '#E9E9E9' : '#E4CE9E'};"
              >
                {recipientInfo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Section -->
    <div class="mt-16 flex flex-col items-center">
      <div class="flex items-center justify-center gap-4">
        <!-- Name Input -->
        <div class="flex flex-col">
          <label class="block text-[#3D3D3D] text-sm mb-2">Name*</label>
          <input
            type="text"
            bind:value={userName}
            placeholder="Your name"
            autofocus
            class="w-[260px] h-14 px-4 bg-white border border-[#E5E5EA] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          />
        </div>

        <!-- Action Buttons -->
        <button 
          class="h-14 px-6 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition-colors disabled:bg-[#F2F2F7] disabled:text-[#8E8E93] disabled:cursor-not-allowed mt-8"
          disabled={!userName.trim() || !recipientInfo.trim()}
          on:click={handleEmailIt}
        >
          <span class="material-symbols-outlined !text-[20px] !font-normal !leading-none flex items-center">mail</span>
          <span class="text-sm font-medium">Post it</span>
        </button>

        <button 
          class="h-14 px-6 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition-colors disabled:bg-[#F2F2F7] disabled:text-[#8E8E93] disabled:cursor-not-allowed relative mt-8"
          disabled={!userName.trim()}
          on:click={handleCopyLink}
        >
          <span class="material-symbols-outlined !text-[20px] !font-normal !leading-none flex items-center">link</span>
          <span class="text-sm font-medium">Copy link to share</span>
          {#if copySuccess}
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Link copied!
            </div>
          {/if}
        </button>
      </div>
    </div>
  </main>
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