<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { divisions } from "../composables/constants/StrukturMember";

const selectedDivision = ref(divisions[0]);
const offset = ref(0);
const isHovered = ref(false);

// Responsive image width
const imageWidth = ref(window.innerWidth < 768 ? 160 : 300);
function handleResize() {
  imageWidth.value = window.innerWidth < 768 ? 160 : 300;
}
window.addEventListener("resize", handleResize);

// Duplikat array untuk seamless infinite scroll (10x, agar terasa unlimited dan smooth di semua divisi)
const loopImages = computed(() => {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr = arr.concat(selectedDivision.value.images);
  }
  return arr;
});

let position = 0;
let animationId = null;
const speed = ref(window.innerWidth < 768 ? 0.5 : 0.8); // Lebih pelan di HP

function animate() {
  if (!isHovered.value) {
    position += speed.value;
    // Reset posisi jika sudah lewat setengah panjang array (agar seamless di semua divisi)
    const singleListWidth = selectedDivision.value.images.length * imageWidth.value;
    const totalWidth = loopImages.value.length * imageWidth.value;
    if (position >= totalWidth - singleListWidth) {
      position = 0;
    }
    offset.value = -position;
  }
  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  animationId = requestAnimationFrame(animate);
});
onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener("resize", handleResize);
});
watch(selectedDivision, () => {
  position = 0;
  offset.value = 0;
});
</script>

<template>
  <section class="pb-20">
    <!-- <div class="mx-auto mb-10 flex flex-col gap-5 items-center justify-center mt-20">
    <h1 class="text-holy text-3xl font-bold lg:text-5xl">
        <span class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent">Explore </span>Our Cabinet
    </h1>
    <p class="text-center text-[13px] w-[300px] lg:text-[16px] lg:w-[700px] my-5 text-holy">
        Temukan Individu-Individu Yang Membuat Organisasi Berkembang
    </p>
    </div> -->

    <div
      class="mx-auto mb-[50px] flex flex-col gap-5 items-center cursor-pointer justify-center mt-20"
    >
      <div
        class="bg-holy w-[300px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"
      ></div>
      <h1
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { delay: 400, duration: 800, ease: 'easeOut' },
        }"
        class="text-holy text-3xl font-bold lg:text-5xl"
      >
        <span
          class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent"
          >Explore </span
        >Our Cabinet
      </h1>
      <div
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { delay: 600, duration: 900, ease: 'easeOut' },
        }"
        class="bg-holy w-[100px] h-1 bg-gradient-to-l from-khaki from-56% to-holy"
      ></div>
      <p
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { delay: 700, duration: 1000, ease: 'easeOut' },
        }"
        class="text-center text-[13px] w-[300px] lg:text-[16px] lg:w-[700px] my-5 text-holy"
      >
        Temukan Individu-Individu Yang Membuat Organisasi Berkembang
      </p>
    </div>

    <!-- Tombol Divisi -->
    <div class="flex flex-wrap justify-center gap-3 mb-10">
      <button
        v-for="division in divisions"
        :key="division.name"
        @click="selectedDivision = division"
        class="px-4 py-2 text-holy rounded-lg border transition-all duration-300"
        :class="{
          'bg-khaki text-holy': selectedDivision.name === division.name,
          'hover:bg-khaki hover:text-holy':
            selectedDivision.name !== division.name,
        }"
      >
        {{ division.name }}
      </button>
    </div>

    <!-- Auto Slide Carousel -->
    <div
      class="relative overflow-x-auto overflow-y-hidden max-w-6xl mx-auto px-4 group touch-pan-x"
      style="scrollbar-width: none; -ms-overflow-style: none;"
    >
      <div
        class="flex"
        :style="{ transform: `translateX(${offset}px)` }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        style="min-width: max-content;"
      >
        <template v-for="(img, index) in loopImages" :key="index">
          <div
            class="flex bg-transparent rounded-md flex-col items-center mx-2 flex-shrink-0 hover:scale-105"
            :style="{ width: imageWidth + 'px' }"
          >
            <img
              :src="img.src"
              :alt="img.name"
              :jabatan="img.jabatan"
              :style="{
                width: imageWidth + 'px',
                height: imageWidth + 'px',
                objectFit: 'cover',
                borderRadius: '0.5rem'
              }"
              loading="lazy"
            />
            <div class="flex items-center justify-center gap-2 w-full">
              <div>
                <p class="mt-2 text-center text-sm font-medium text-holy/70">
                  {{ img.name }}
                </p>
                <p
                  v-if="img.jabatan"
                  class="mb-3 text-center text-xs font-normal text-holy/50"
                >
                  {{ img.jabatan }}
                </p>
              </div>
              <a
                v-if="img.instagram"
                :href="img.instagram"
                target="_blank"
                rel="noopener"
                class="ml-2 text-pink-500 hover:text-pink-600 transition-colors"
                title="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    rx="5"
                    stroke-width="2"
                  />
                  <circle cx="12" cy="12" r="5" stroke-width="2" />
                  <circle cx="17" cy="7" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

