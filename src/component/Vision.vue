<script setup>
import { reactive } from "vue";
import { cards } from "../composables/constants/Vision";
import { Eye, Target } from 'lucide-vue-next';


const cardMotionProps = reactive({
  initial: {
    opacity: 0,
    y: -40, // dari atas
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 900, // lebih lambat dari sebelumnya
      ease: "easeOut",
    },
  },
});
</script>

<!-- <template>
  <div
    class="mx-auto mb-12 flex flex-col gap-5 items-center justify-center mt-20"
  >
    <div
      class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"
    ></div>

    <h1
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { delay: 400, duration: 900, ease: 'easeOut' },
      }"
      class="text-holy text-3xl font-bold lg:text-5xl"
    >
      Vision
      <span
        class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent"
        >&</span
      >
      Mision
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
  </div>

  <div class="max-w-3xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div
      v-for="(card, index) in cards.slice(0, 2)"
      :key="index"
      v-motion
      :initial="cardMotionProps.initial"
      :visibleOnce="{
        ...cardMotionProps.visibleOnce,
        transition: {
          ...cardMotionProps.visibleOnce.transition,
          delay: 300 * index, // Tambah jeda antar kartu
        },
      }"
      class="p-6 h-72 cursor-pointer shadow-blacky text-white rounded-xl bg-errie hover:bg-cosmos transition-colors duration-300 will-change-transform"
    >
      <h2 class="text-2xl font-bold mb-2">{{ card.title }}</h2>
      <p class="text-base leading-relaxed">{{ card.text }}</p>
    </div>

    <div
      v-motion
      :initial="cardMotionProps.initial"
      :visibleOnce="{
        ...cardMotionProps.visibleOnce,
        transition: {
          ...cardMotionProps.visibleOnce.transition,
          delay: 600,
        },
      }"
      class="mb-[120px] cursor-pointer lg:col-span-2 p-6 rounded-xl bg-gradient-to-r from-cosmos 30% to-errie text-white shadow-blacky text-sm lg:text-lg text-center will-change-transform"
    >
      <p>{{ cards[2].text }}</p>
    </div>
  </div>
</template> -->

<template>
  <div
    class="mx-auto mb-12 flex flex-col gap-5 items-center justify-center mt-20"
  >
    <div
      class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"
    ></div>

    <h1
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { delay: 400, duration: 900, ease: 'easeOut' },
      }"
      class="text-holy text-3xl font-bold lg:text-5xl"
    >
      Vision
      <span
        class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent"
        >&</span
      >
      Mision
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
  </div>

  <div class="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
    <div
      v-for="(card, index) in cards.slice(0, 2)"
      :key="index"
      v-motion
      :initial="cardMotionProps.initial"
      :visibleOnce="{
        ...cardMotionProps.visibleOnce,
        transition: {
          ...cardMotionProps.visibleOnce.transition,
          delay: 300 * index,
        },
      }"
      class="p-6 h-72 cursor-pointer shadow-blacky text-white rounded-xl bg-errie hover:bg-cosmos transition-colors duration-300 will-change-transform flex flex-col"
    >
      <div class="flex-1 flex flex-col">
        <p class="text-base leading-relaxed text-center flex-1 pt-4">{{ card.text }}</p>
        <div class="flex justify-center items-center py-4">
          <component
            :is="index === 0 ? Eye : Target"
            class="text-khaki"
            size="40"
          />
        </div>
      </div>

      <h2 class="text-2xl font-bold text-center pt-4">
        {{ index === 0 ? 'Visi' : 'Misi' }}
      </h2>
    </div>

    <div
      v-motion
      :initial="cardMotionProps.initial"
      :visibleOnce="{
        ...cardMotionProps.visibleOnce,
        transition: {
          ...cardMotionProps.visibleOnce.transition,
          delay: 600,
        },
      }"
      class="mb-[120px] font-bold uppercase cursor-pointer lg:col-span-2 p-6 rounded-xl bg-gradient-to-r from-cosmos 30% to-errie text-white shadow-blacky text-sm lg:text-lg text-center will-change-transform"
    >
      <p>{{ cards[2].text }}</p>
    </div>
  </div>
</template>