<script setup>
import { reactive } from "vue";
import { cards } from "../composables/constants/Vision";
import { Eye, Target } from "lucide-vue-next";

const cardMotionProps = reactive({
  initial: {
    opacity: 0,
    y: -40,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 900,
      ease: "easeOut",
    },
  },
});
</script>

<template>
  <div class="mx-auto mb-12 flex flex-col gap-5 items-center justify-center mt-20">
    <div class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"></div>

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
      <span class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent">&</span>
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
    <!-- Card Visi & Misi -->
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
      class="p-6 min-h-72 cursor-pointer shadow-blacky text-white rounded-xl bg-errie hover:bg-cosmos/85 transition-colors duration-300 will-change-transform flex flex-col justify-start border border-transparent hover:border-khaki/50"
    >
      <!-- Header Kartu: Ikon & Judul Polos (Tanpa Kotak Transparan) -->
      <div class="flex items-center gap-3 mb-5 border-b border-holy/15 pb-4">
        <component :is="index === 0 ? Eye : Target" class="text-khaki" size="32" />
        <h2 class="text-2xl font-bold tracking-wide">
          {{ index === 0 ? "Visi" : "Misi" }}
        </h2>
      </div>

      <!-- Konten Kartu (Rata Kiri & Poin Misi) -->
      <div class="text-sm lg:text-base leading-relaxed text-holy/90 text-left">
        <ol v-if="Array.isArray(card.text)" class="list-decimal list-outside ml-4 space-y-2.5">
          <li v-for="(item, i) in card.text" :key="i" class="pl-1 leading-normal">
            {{ item }}
          </li>
        </ol>
        <p v-else class="leading-relaxed">
          {{ card.text }}
        </p>
      </div>
    </div>

    <!-- Banner Slogan Bawah (Kembali persis seperti semula) -->
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
