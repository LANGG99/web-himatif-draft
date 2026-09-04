<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Danus from "../component/Danus.vue";
import Footer from "../component/Footer.vue";

const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <section class="overflow-hidden w-full h-[740px] bg-Home bg-no-repeat bg-center bg-scroll lg:bg-fixed bg-cover">
    <div class="bg-black/75 h-full flex flex-col my-auto justify-center">
      <div
        v-motion
        :initial="{ opacity: 0, x: -100 }"
        :visibleOnce="{
          opacity: 1,
          x: 0,
          transition: { duration: 2000, ease: 'easeOut' },
        }"
        :delay="300"
        class="relative mt-28 flex flex-row w-auto lg:mt-36 h-auto mx-auto gap-3 lg:gap-1 z-10 items-center"
      >
        <!-- Animasi kiri -->
        <!-- <div class="max-lg:left-[18px] lg:left-0 top-8 -translate-y-1/2 w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] animate-float bg-cosmos bg-gradient-to-r from-cosmos from-56% to-khaki rounded-2xl -z-10 absolute"></div> -->
        <!-- Animasi kanan dekstop -->
        <!-- <div class="hidden lg:block absolute right-7 top-[44%] -translate-y-1/2 w-[170px] h-[170px] animate-floates bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki rounded-2xl -z-10"></div> -->
        <!-- Animasi kanan mobile -->
        <!-- <div class="block lg:hidden absolute right-[18px] top-[44%] -translate-y-1/2 w-[100px] h-[100px] animate-floates bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki rounded-2xl -z-10"></div> -->
        <!-- Logo Untara -->
        <img src="/public/images/untara.webp" alt="Universitas Tangerang Raya" class="max-lg:ml-4 w-[100px] h-fit lg:w-[170px] lg:mr-10" />
        <!-- Logo Himatif -->
        <img src="/public/images/LogoHimatif.webp" alt="Himatif Untara" class="max-lg:ml-[10px] max-lg:mr-0.5 w-[100px] h-fit lg:w-[170px]" />
        <!-- Logo Specta -->
        <img src="/public/images/Arthasa.webp" alt="Arthasa" class="max-lg:-ml-4 w-[140px] h-fit lg:w-[230px] lg:ml-2" />
      </div>

      <div class="text-holy text-center my-4">
        <h1
          v-motion
          :initial="{ opacity: 0, y: -100 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: { duration: 2000, ease: 'easeOut' },
          }"
          :delay="300"
          class="font-bold text-3xl lg:text-7xl my-7 pb-2 bg-cosmos bg-gradient-to-r from-cosmos from-56% to-khaki bg-clip-text text-transparent"
        >
          Dana & Usaha
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :visibleOnce="{
            opacity: 1,
            x: 0,
            transition: { duration: 2000, ease: 'easeOut' },
          }"
          :delay="700"
          class="text-md"
        >
          Yuk dukung kegiatan HIMATIF lewat produk-produk Dana & Usaha kami!
        </p>
        <div
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: { duration: 2000, ease: 'easeOut' },
          }"
          :delay="500"
          class="mx-auto mt-10 w-fit h-fit bg-cosmos p-2 rounded-full animate-bounce"
        >
          <a href="#danusList"><IconCarbonArrowDown class="lg:w-8 h-auto" /></a>
        </div>
      </div>
    </div>
  </section>

  <section id="danusList" class="w-full h-full pb-[50px] lg:pb-[50px] py-5 bg-gradient-to-r from-errie to-charcoal">
    <Danus />
  </section>

  <!-- Tombol Scroll to Top -->
  <button v-if="showScrollTop" @click="scrollToTop" class="fixed bottom-6 right-6 z-50 bg-cosmos text-white p-3 rounded-full shadow-lg hover:bg-khaki transition-all" aria-label="Scroll to top">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
    </svg>
  </button>

  <!-- Footer -->
  <Footer />
</template>
