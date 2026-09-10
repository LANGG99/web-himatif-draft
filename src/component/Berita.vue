<script setup>
import { ref } from "vue";
import { getSortedBerita, formatTanggalBerita } from "../composables/constants/Berita";

const sortedBerita = getSortedBerita();

// Default berita aktif mengambil berita pertama
const selectedBerita = ref(sortedBerita.length > 0 ? sortedBerita[0] : null);

const selectBerita = (berita) => {
  selectedBerita.value = berita;
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 pt-24 pb-10">
    <!-- Title Section -->
    <div class="flex flex-col gap-4 items-center justify-center mb-10">
      <div class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"></div>

      <h1 v-motion :initial="{ opacity: 0, y: -20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 300, duration: 800, ease: 'easeOut' } }" class="font-bold text-3xl lg:text-5xl text-center">
        <span class="text-holy">Berita & </span><span class="bg-gradient-to-r from-khaki via-khaki to-cosmos bg-clip-text text-transparent">Pengumuman</span>
      </h1>

      <div class="bg-holy w-[70px] h-1 bg-gradient-to-l from-khaki from-56% to-holy"></div>
    </div>

    <!-- Intro Card -->
    <div v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 500, duration: 800, ease: 'easeOut' } }" class="text-holy mb-20 text-center leading-relaxed max-w-3xl mx-auto">
      <p class="text-base lg:text-lg">Dapatkan kabar terbaru, pengumuman resmi akademik, serta seluruh rangkaian agenda kegiatan dan event dari HIMATIF di sini.</p>
    </div>

    <!-- Empty State -->
    <div v-if="sortedBerita.length === 0" class="text-holy/70 text-center py-10">Belum ada berita atau pengumuman saat ini.</div>

    <!-- Berita Master-Detail Layout (2 Kolom) -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
      <!-- KOLOM KIRI: List Card Berita Ramping dengan Bayangan Hitam (4 Kolom) -->
      <div class="lg:col-span-4 flex flex-col gap-4 max-h-[85vh] overflow-y-auto px-2 py-3 custom-scrollbar">
        <template v-for="berita in sortedBerita" :key="berita.id">
          <!-- CARD JUDUL BERITA -->
          <div
            class="group cursor-pointer bg-cosmos/35 rounded-xl p-5 transition-all duration-300 border border-transparent flex flex-col justify-between hover:bg-cosmos/40 hover:-translate-y-1 hover:shadow-lg"
            :class="{
              '!bg-cosmos/85 !-translate-y-1 !border-khaki/70 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.8)] z-10': selectedBerita?.id === berita.id,
            }"
            @click="selectBerita(berita)"
          >
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-2.5">
                <span class="bg-khaki/20 text-khaki font-bold text-[11px] px-3 py-1 rounded-md uppercase tracking-wider">
                  {{ berita.kategori }}
                </span>
                <span class="text-holy/60 text-xs">{{ formatTanggalBerita(berita.tanggal) }}</span>
              </div>

              <h3 class="text-holy font-bold text-base lg:text-lg mb-1.5 leading-snug">
                {{ berita.judul }}
              </h3>
              <p class="text-holy/80 text-xs lg:text-sm leading-relaxed line-clamp-2">
                {{ berita.ringkasan }}
              </p>
            </div>

            <div class="mt-3.5 pt-2.5 border-t border-holy/10 flex items-center gap-2 text-khaki text-xs lg:text-sm font-semibold group-hover:translate-x-1 transition-transform">
              <span>{{ selectedBerita?.id === berita.id ? "Sedang dibaca" : "Baca selengkapnya" }}</span>
              <span>&rarr;</span>
            </div>
          </div>

          <!-- DETAIL BERITA KHUSUS MOBILE (DIPISAH DARI CARD & TANPA BACKGROUND) -->
          <div v-if="selectedBerita?.id === berita.id" class="block lg:hidden py-4 px-2 my-1 border-b border-holy/20">
            <!-- Banner Gambar Mobile -->
            <div v-if="berita.gambar" class="w-full h-52 rounded-xl overflow-hidden bg-errie mb-4">
              <img :src="berita.gambar" :alt="berita.judul" class="w-full h-full object-cover" />
            </div>

            <!-- Paragraph Isi Berita Mobile -->
            <div class="flex flex-col gap-3 text-holy/90 text-sm leading-relaxed">
              <p v-for="(paragraf, idx) in berita.isi" :key="idx">
                {{ paragraf }}
              </p>
            </div>

            <!-- Tombol Pendaftaran Mobile -->
            <div v-if="berita.linkPendaftaran" class="mt-4 pt-2">
              <a :href="berita.linkPendaftaran" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-khaki hover:bg-khaki/80 text-cosmos font-bold py-3 px-4 rounded-xl transition-colors text-sm shadow-md">
                Daftar {{ berita.judul }}
              </a>
            </div>
          </div>
        </template>
      </div>

      <!-- KOLOM KANAN: Detail View Berita Desktop Only (8 Kolom) -->
      <div class="hidden lg:block lg:col-span-8 lg:sticky lg:top-24 py-2">
        <div v-if="selectedBerita" class="flex flex-col gap-6">
          <!-- Banner Gambar (Hanya tampil jika ada) -->
          <div v-if="selectedBerita.gambar" class="w-full h-56 lg:h-72 rounded-xl overflow-hidden bg-errie">
            <img :src="selectedBerita.gambar" :alt="selectedBerita.judul" class="w-full h-full object-cover" />
          </div>

          <!-- Header Detail (Kategori & Tanggal) -->
          <div class="flex justify-between items-center text-xs lg:text-sm border-b border-holy/15 pb-4">
            <span class="bg-cosmos/90 text-khaki border border-khaki/40 font-bold px-3.5 py-1 rounded-md uppercase">
              {{ selectedBerita.kategori }}
            </span>
            <span class="text-holy/60 flex items-center gap-1.5 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ formatTanggalBerita(selectedBerita.tanggal) }}
            </span>
          </div>

          <!-- Judul Berita -->
          <h2 class="text-holy font-bold text-2xl lg:text-4xl leading-snug">
            {{ selectedBerita.judul }}
          </h2>

          <!-- Paragraph Isi Berita -->
          <div class="flex flex-col gap-4 text-holy/90 text-sm lg:text-base leading-relaxed">
            <p v-for="(paragraf, idx) in selectedBerita.isi" :key="idx">
              {{ paragraf }}
            </p>
          </div>

          <!-- Tombol Pendaftaran / Volunteer Google Form -->
          <div v-if="selectedBerita.linkPendaftaran" class="mt-4 pt-4 border-t border-holy/15">
            <a :href="selectedBerita.linkPendaftaran" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-khaki hover:bg-khaki/80 text-cosmos font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md">
              Daftar {{ selectedBerita.judul }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar khusus untuk list berita sebelah kiri */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(200, 169, 126, 0.4);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(200, 169, 126, 0.8);
}
</style>
