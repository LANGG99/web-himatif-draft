<script setup>
import { formatTanggalBerita } from "../composables/constants/Berita";

defineProps({
  berita: { type: Object, required: true },
});
defineEmits(["tutup"]);
</script>

<template>
  <div class="fixed inset-0 z-[1200] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" :aria-label="berita.judul">
    <!-- Backdrop -->
    <div class="berita-modal-overlay absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('tutup')"></div>

    <!-- Panel baca -->
    <article class="berita-panel relative w-full sm:max-w-3xl bg-errie rounded-t-3xl sm:rounded-3xl max-h-[92vh] max-h-[92dvh] sm:max-h-[88vh] sm:max-h-[88dvh] overflow-y-auto modal-scrollbar ring-1 ring-khaki/40 shadow-blacky">
      <!-- Sticky header: konteks + tombol tutup selalu terjangkau -->
      <div class="sticky top-0 z-10 flex items-center justify-between gap-3 bg-errie/95 backdrop-blur px-5 sm:px-8 py-3.5 border-b border-holy/10">
        <span class="text-holy/60 text-[11px] font-bold uppercase tracking-widest">Berita HIMATIF</span>
        <button @click="$emit('tutup')" aria-label="Tutup"
          class="inline-flex items-center gap-1.5 rounded-full bg-holy/10 hover:bg-holy/20 text-holy text-xs font-bold px-3.5 py-2 ring-1 ring-holy/20 transition">
          <span>Tutup</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Banner -->
      <div v-if="berita.gambar" class="w-full h-52 sm:h-72 overflow-hidden bg-gradient-to-br from-cosmos to-errie">
        <img :src="berita.gambar" :alt="berita.judul" @error="$event.target.style.display='none'" class="w-full h-full object-cover" />
      </div>

      <!-- Isi -->
      <div class="px-5 sm:px-8 py-6 flex flex-col gap-5">
        <div class="flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm border-b border-holy/15 pb-4">
          <span class="bg-cosmos/90 text-khaki border border-khaki/40 font-bold px-3.5 py-1 rounded-md uppercase">
            {{ berita.kategori }}
          </span>
          <span class="text-holy/60 flex items-center gap-1.5 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ formatTanggalBerita(berita.tanggal) }}
          </span>
        </div>

        <h2 class="text-holy font-bold text-2xl sm:text-3xl leading-snug">
          {{ berita.judul }}
        </h2>

        <div class="flex flex-col gap-4 text-holy/90 text-sm sm:text-base leading-relaxed">
          <p v-for="(paragraf, idx) in berita.isi" :key="idx">
            {{ paragraf }}
          </p>
        </div>

        <div v-if="berita.linkPendaftaran" class="mt-2 pt-4 border-t border-holy/15">
          <a :href="berita.linkPendaftaran" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-khaki hover:bg-khaki/80 text-cosmos font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md">
            Daftar {{ berita.judul }}
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
/* Scrollbar panel baca */
.modal-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.modal-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.modal-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(200, 169, 126, 0.4);
  border-radius: 10px;
}
.modal-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(200, 169, 126, 0.8);
}
</style>
