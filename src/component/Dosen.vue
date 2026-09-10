<script setup>
import { dosenList } from "../composables/constants/Dosen";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-cosmos to-errie py-16 px-4"
  >
    <div
      class="mx-auto mb-[50px] flex flex-col gap-5 items-center cursor-pointer justify-center mt-20"
    >
      <div
        class="bg-holy w-[300px] lg:w-[600px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"
      ></div>
      <h1
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { delay: 400, duration: 800, ease: 'easeOut' },
        }"
        class="text-holy text-center text-3xl font-bold lg:text-5xl"
      >
      Information Technology
        <span
          class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent"
          > Lecturer</span
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
        class="text-center text-holy my-5 mx-auto leading-relaxed tracking-wide text-base md:text-lg max-w-xl md:max-w-2xl"
      >
        <!-- Inilah para dosen Teknologi Informasi kami. Dengan keahlian dan passion mereka,<br class="hidden md:inline" />
        mereka membimbing generasi penerus untuk menjadi talenta teknologi yang unggul. -->
        Para dosen Teknologi Informasi kami berdedikasi membimbing dan menginspirasi mahasiswa menjadi talenta teknologi unggulan.
      </p>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
    >
      <div
        v-for="dosen in dosenList"
        :key="dosen.nama"
        class="relative bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl group"
      >
        <div
          class="w-28 h-28 mb-3 rounded-full overflow-hidden border-4 border-khaki shadow-lg transition-all duration-500 group-hover:rotate-6 flex items-center justify-center bg-gray-200"
        >
          <img
            :src="dosen.foto"
            :alt="dosen.nama"
            class="object-cover w-full h-full"
            loading="lazy"
            @error="
              event.target.src =
                'https://ui-avatars.com/api/?name=' +
                encodeURIComponent(dosen.nama) +
                '&background=E0C97F&color=2E3A4D&size=128'
            "
          />
        </div>
        <div class="flex flex-col items-center w-full">
          <h2 class="text-lg md:text-xl font-bold text-holy text-center mt-1 mb-0.5">
            {{ dosen.nama }}
          </h2>
          <p class="text-cosmos text-xs md:text-sm mb-1 text-center font-medium">
            {{ dosen.bidang }}
          </p>
          <a
            :href="`mailto:${dosen.kontak}`"
            class="inline-block mt-1 px-4 py-1 rounded-full bg-khaki/80 text-cosmos font-semibold text-xs md:text-sm shadow hover:bg-cosmos hover:text-holy transition-colors duration-300"
          >
            {{ dosen.kontak }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>