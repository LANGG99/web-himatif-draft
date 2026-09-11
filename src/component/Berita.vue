<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { getSortedBerita, formatTanggalBerita } from "../composables/constants/Berita";
import BeritaModal from "./BeritaModal.vue";

const sortedBerita = getSortedBerita();

// Hero = berita terbaru, grid = sisanya. Masuk halaman = semua ketutup.
const featured = computed(() => (sortedBerita.length > 0 ? sortedBerita[0] : null));
const beritaLain = computed(() => sortedBerita.slice(1));

// Modal baca: null = ketutup.
const beritaAktif = ref(null);
const bukaBerita = (berita) => {
  beritaAktif.value = berita;
};
const tutupModal = () => {
  beritaAktif.value = null;
};

// Esc nutup modal + kunci scroll body pas modal buka.
const onEsc = (e) => {
  if (e.key === "Escape") tutupModal();
};
watch(beritaAktif, (val) => {
  document.documentElement.style.overflow = val ? "hidden" : "";
  document.body.style.overflow = val ? "hidden" : "";
  if (val) window.addEventListener("keydown", onEsc);
  else window.removeEventListener("keydown", onEsc);
});
onUnmounted(() => {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onEsc);
});
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 pt-24 pb-16">
    <!-- Title Section -->
    <div class="flex flex-col gap-4 items-center justify-center mb-10">
      <div class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"></div>

      <h1 v-motion :initial="{ opacity: 0, y: -20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 300, duration: 800, ease: 'easeOut' } }" class="font-bold text-3xl lg:text-5xl text-center">
        <span class="text-holy">Berita & </span><span class="bg-gradient-to-r from-khaki via-khaki to-cosmos bg-clip-text text-transparent">Pengumuman</span>
      </h1>

      <div class="bg-holy w-[70px] h-1 bg-gradient-to-l from-khaki from-56% to-holy"></div>
    </div>

    <!-- Intro -->
    <div v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 500, duration: 800, ease: 'easeOut' } }" class="text-holy mb-12 text-center leading-relaxed max-w-3xl mx-auto">
      <p class="text-base lg:text-lg">Dapatkan kabar terbaru, pengumuman resmi akademik, serta seluruh rangkaian agenda kegiatan dan event dari HIMATIF di sini.</p>
    </div>

    <!-- Empty State -->
    <div v-if="sortedBerita.length === 0" class="text-holy/70 text-center py-10">Belum ada berita atau pengumuman saat ini.</div>

    <div v-else>
      <!-- HERO: berita terbaru, full-width -->
      <article v-if="featured" @click="bukaBerita(featured)" @keyup.enter="bukaBerita(featured)" tabindex="0"
        class="group cursor-pointer block w-full mb-10 overflow-hidden rounded-2xl ring-1 ring-holy/10 hover:ring-khaki/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]">
        <div class="relative">
          <div v-if="featured.gambar" class="w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-gradient-to-br from-cosmos to-errie">
            <img :src="featured.gambar" :alt="featured.judul" @error="$event.target.style.display='none'" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div v-else class="w-full aspect-[16/9] sm:aspect-[21/9] bg-gradient-to-br from-cosmos via-errie to-charcoal flex items-center justify-center px-6">
            <span class="text-holy/30 font-bold text-3xl sm:text-5xl uppercase tracking-widest text-center">{{ featured.kategori }}</span>
          </div>
          <span class="absolute top-4 left-4 bg-khaki text-cosmos font-bold text-[11px] px-3 py-1 rounded-md uppercase tracking-wider">Terbaru</span>
          <div class="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"></div>
          <div class="p-5 sm:p-8 bg-errie sm:bg-transparent sm:absolute sm:bottom-0 sm:inset-x-0">
            <div class="flex flex-wrap items-center gap-2 mb-2.5">
              <span class="bg-khaki/20 text-khaki font-bold text-[11px] px-3 py-1 rounded-md uppercase tracking-wider">
                {{ featured.kategori }}
              </span>
              <span class="text-holy/60 text-xs">{{ formatTanggalBerita(featured.tanggal) }}</span>
            </div>
            <h2 class="text-holy font-bold text-xl sm:text-3xl leading-snug mb-2">
              {{ featured.judul }}
            </h2>
            <p class="text-holy/80 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-3xl">
              {{ featured.ringkasan }}
            </p>
            <div class="mt-3 flex items-center gap-2 text-khaki text-sm font-semibold">
              <span>Baca selengkapnya</span>
              <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
            </div>
          </div>
        </div>
      </article>

      <!-- GRID: sisanya, lega scroll natural -->
      <div v-if="beritaLain.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <article v-for="berita in beritaLain" :key="berita.id" @click="bukaBerita(berita)" @keyup.enter="bukaBerita(berita)" tabindex="0"
          class="group cursor-pointer overflow-hidden rounded-2xl bg-cosmos/85 ring-1 ring-transparent hover:ring-khaki/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] flex flex-col">
          <div v-if="berita.gambar" class="w-full aspect-video overflow-hidden bg-gradient-to-br from-cosmos to-errie">
            <img :src="berita.gambar" :alt="berita.judul" @error="$event.target.style.display='none'" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          </div>
          <div v-else class="w-full aspect-video bg-gradient-to-br from-cosmos to-errie flex items-center justify-center px-4">
            <span class="text-holy/30 font-bold text-xl uppercase tracking-widest text-center">{{ berita.kategori }}</span>
          </div>
          <div class="flex flex-col gap-2.5 p-5 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="bg-khaki/20 text-khaki font-bold text-[11px] px-3 py-1 rounded-md uppercase tracking-wider">
                {{ berita.kategori }}
              </span>
              <span class="text-holy/60 text-xs">{{ formatTanggalBerita(berita.tanggal) }}</span>
            </div>
            <h3 class="text-holy font-bold text-base lg:text-lg leading-snug">
              {{ berita.judul }}
            </h3>
            <p class="text-holy/80 text-xs lg:text-sm leading-relaxed line-clamp-2">
              {{ berita.ringkasan }}
            </p>
            <div class="mt-auto pt-3 border-t border-holy/10 flex items-center gap-2 text-khaki text-xs lg:text-sm font-semibold">
              <span>Baca selengkapnya</span>
              <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- MODAL BACA -->
    <Transition name="berita-modal">
      <BeritaModal v-if="beritaAktif" :berita="beritaAktif" @tutup="tutupModal" />
    </Transition>
  </div>
</template>

<style>
/* Animasi modal baca (unscoped biar nyentuh DOM komponen anak) */
.berita-modal-enter-active .berita-modal-overlay,
.berita-modal-leave-active .berita-modal-overlay {
  transition: opacity 0.3s ease;
}
.berita-modal-enter-from .berita-modal-overlay,
.berita-modal-leave-to .berita-modal-overlay {
  opacity: 0;
}
.berita-modal-enter-active .berita-panel,
.berita-modal-leave-active .berita-panel {
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease;
}
.berita-modal-enter-from .berita-panel {
  opacity: 0;
  transform: translateY(48px) scale(0.98);
}
.berita-modal-leave-to .berita-panel {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
}
@media (prefers-reduced-motion: reduce) {
  .berita-modal-enter-active .berita-modal-overlay,
  .berita-modal-leave-active .berita-modal-overlay,
  .berita-modal-enter-active .berita-panel,
  .berita-modal-leave-active .berita-panel {
    transition: none;
  }
}
</style>
