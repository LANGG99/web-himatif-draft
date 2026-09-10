<script setup>
import { aboutUs } from "../composables/constants/AboutUs";
</script>

<template>
  <!-- Desktop Section -->
  <div class="mx-auto mb-[50px] hidden lg:flex flex-col gap-5 items-center cursor-pointer justify-center mt-20">
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { delay: 600, duration: 900, ease: 'easeOut' },
      }"
      class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"
    ></div>

    <h1
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { delay: 400, duration: 800, ease: 'easeOut' },
      }"
      class="text-holy font-bold lg:text-5xl"
    >
      About
      <span class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki uppercase bg-clip-text text-transparent"> Himatif </span>
    </h1>

    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { delay: 600, duration: 900, ease: 'easeOut' },
      }"
      class="bg-holy w-[70px] h-1 bg-gradient-to-l from-khaki from-56% to-holy"
    ></div>
  </div>

  <div v-for="(about, index) in aboutUs" :key="index" class="hidden lg:flex w-full max-w-5xl justify-center items-center mx-auto rounded-md flex-col lg:flex-row gap-3">
    <div class="h-full overflow-hidden rounded-t-md lg:max-w-md shadow-xl" :class="{ 'order-2': index % 2 !== 0 }">
      <img :src="`/images/${about.image}`" :alt="`Image Preview of ${about.name}`" class="aspect-video rounded-t-md object-cover lg:rounded-md" />
    </div>
    <div>
      <p
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { delay: 500, duration: 1000, ease: 'easeOut' },
        }"
        :hovered="{ y: -8, transition: { duration: 150, ease: 'easeOut' } }"
        class="bg-cosmos/100 text-justify cursor-pointer text-holy py-10 rounded-xl leading-7 p-4 shadow-blacky"
      >
        {{ about.description }}
      </p>
    </div>
  </div>

  <!-- Mobile Section -->
  <section class="lg:hidden mb-20 w-full h-auto flex flex-col">
    <div class="mx-auto flex flex-col gap-4 items-center cursor-pointer justify-center mt-20">
      <div class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"></div>

      <h1
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { delay: 200, duration: 800, ease: 'easeOut' },
        }"
        class="text-holy text-3xl font-bold"
      >
        About
        <span class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki uppercase bg-clip-text text-transparent"> Himatif </span>
      </h1>
      <div
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { delay: 600, duration: 900, ease: 'easeOut' },
        }"
        class="bg-holy w-[100px] mb-5 h-1 bg-gradient-to-l from-khaki from-56% to-holy"
      ></div>

      <div
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visibleOnce="{
          opacity: 1,
          x: 0,
          transition: { delay: 200, duration: 1000, ease: 'easeInOut' },
        }"
        class="w-60 sm:w-[90%] text-holy bg-cosmos/70 shadow-blacky p-10 rounded-xl"
      >
        <p class="text-[10px] sm:text-base">
          <strong class="text-khaki">HIMATIF</strong> adalah wadah pengembangan dan aspirasi Mahasiswa Teknologi Informasi yang tumbuh atas kesadaran dan rasa tanggung jawab sosial dari, oleh, dan untuk mahasiswa, khususnya di Universitas
          Tangerang Raya.
        </p>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visibleOnce="{
          opacity: 1,
          x: 0,
          transition: { delay: 600, duration: 1000, ease: 'easeInOut' },
        }"
        class="w-60 sm:w-[90%] text-holy bg-cosmos/70 shadow-blacky p-10 rounded-xl"
      >
        <p class="text-[10px] sm:text-base">
          <strong class="text-khaki">HIMATIF</strong> adalah organisasi utama untuk mahasiswa di Jurusan Teknologi Informasi. Kehadirannya sangat penting dalam mengatur berbagai kegiatan, program, dan ide-ide yang berhubungan langsung
          dengan kebutuhan serta pengembangan semua mahasiswa di jurusan ini.
        </p>
      </div>
    </div>
  </section>
</template>
