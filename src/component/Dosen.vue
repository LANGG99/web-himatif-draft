<script setup>
import { dosenList } from "../composables/constants/Dosen";
import { Phone, Mail } from "lucide-vue-next";
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-cosmos to-errie py-16 px-4">
    <div class="mx-auto mb-[50px] flex flex-col gap-5 items-center cursor-pointer justify-center mt-20">
      <div class="bg-holy w-[300px] lg:w-[600px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"></div>
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
        <span class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent"> Lecturer</span>
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
        Para dosen Teknologi Informasi kami berdedikasi membimbing dan menginspirasi mahasiswa menjadi talenta teknologi unggulan.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      <div v-for="dosen in dosenList" :key="dosen.nama" class="relative bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl group">
        <div class="w-28 h-28 mb-3 rounded-full overflow-hidden border-4 border-khaki shadow-lg transition-all duration-500 group-hover:rotate-6 flex items-center justify-center bg-gray-200">
          <img
            :src="dosen.foto"
            :alt="dosen.nama"
            class="object-cover w-full h-full"
            loading="lazy"
            @error="event.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(dosen.nama) + '&background=E0C97F&color=2E3A4D&size=128'"
          />
        </div>
        <div class="flex flex-col items-center w-full">
          <h2 class="text-lg md:text-xl font-bold text-holy text-center mt-1 mb-0.5">
            {{ dosen.nama }}
          </h2>
          <!-- Bidang Dosen -->
          <p class="text-[#F1D6C2] text-xs md:text-sm mb-1 text-center font-medium">
            {{ dosen.bidang }}
          </p>

          <!-- Tombol Email (Sekarang seragam dengan Tombol Telepon) -->
          <a
            v-if="dosen.kontak"
            :href="`mailto:${dosen.kontak}`"
            class="inline-flex items-center gap-1.5 mt-2 px-4 py-1 rounded-full bg-khaki/10 text-holy font-semibold text-xs md:text-sm shadow border border-holy/20 hover:bg-khaki hover:text-cosmos transition-colors duration-300"
          >
            <Mail class="w-3.5 h-3.5" />
            <span>{{ dosen.kontak }}</span>
          </a>

          <!-- Tombol Nomor Telepon / WhatsApp -->
          <a
            v-if="dosen.telepon"
            :href="`https://wa.me/${dosen.telepon}`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 mt-2 px-4 py-1 rounded-full bg-khaki/10 text-holy font-semibold text-xs md:text-sm shadow border border-holy/20 hover:bg-khaki hover:text-cosmos transition-colors duration-300"
          >
            <Phone class="w-3.5 h-3.5" />
            <span>+{{ dosen.telepon }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
