<script setup>
import { ref } from 'vue'

const props = defineProps({
  faqs: {
    type: Array,
    required: true,
  },
})

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>


<template>
  <div class="mx-auto mb-12 flex flex-col gap-5 items-center justify-center mt-20">
    <div
      class="bg-holy/30 w-[250px] lg:w-[550px] h-2 bg-gradient-to-l from-holy/40 from-56% to-holy/20"
    ></div>

    <h1
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { delay: 400, duration: 900, ease: 'easeOut' },
      }"
      class="text-holy text-2xl font-bold lg:text-5xl"
    >
      Frequently
      <span class="bg-cosmos bg-gradient-to-l from-cosmos/80 from-56% to-holy/70 bg-clip-text text-transparent"
        >Asked Question</span
      >
    </h1>

    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { delay: 600, duration: 900, ease: 'easeOut' },
      }"
      class="bg-holy/20 w-[100px] h-1 bg-gradient-to-l from-holy/30 from-56% to-holy/10"
    ></div>
  </div>

  <div 
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visibleOnce="{
      opacity: 1,
      y: 0,
      transition: {
        duration: 900,
        ease: 'easeOut',
      }
    }"
    class="max-w-3xl mx-auto p-6 bg-errie rounded-xl shadow-blacky"
  >
    <div
      v-for="(faq, index) in faqs"
      :key="index"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 900,
          delay: 200 * (index + 1),
          ease: 'easeOut'
        }
      }"
      class="border-b border-holy/20 py-4"
    >
      <button
        @click="toggle(index)"
        class="w-full flex justify-between items-start text-left focus:outline-none"
      >
        <div class="flex items-start gap-2">
          <div class="mt-1 w-2 h-2 rounded-full bg-holy/40"></div>
          <span class="text-base font-semibold text-white">
            {{ faq.question }}
          </span>
        </div>
        <svg
          :class="{ 'rotate-180': openIndex === index }"
          class="w-5 h-5 text-holy/50 transition-transform duration-300 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2"
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>

      <transition name="fade-slide">
        <div
          v-if="openIndex === index"
          class="mt-3 ml-6 pl-3 border-l-2 border-holy/30 text-sm text-purple-100/90"
        >
          {{ faq.answer }}
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
