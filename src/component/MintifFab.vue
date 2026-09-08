<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { berangkatKeFlask } from "../composables/useMintifReveal.js";

const tombol = ref(null);
const showHint = ref(false);
let hintTimer = null;

// Tooltip: nongol tiap halaman dibuka/direfresh, hilang sendiri 3 detik
onMounted(() => {
  showHint.value = true;
  hintTimer = setTimeout(() => { showHint.value = false; }, 3000);
  // Preconnect dinamis ke origin Flask (env-aware, tidak bisa hardcode di
  // index.html karena beda lokal/prod). Motong DNS+TLS lintas origin biar
  // overlay 455ms tidak keburu selesai sebelum halaman chatbot kepaint.
  try {
    const origin = new URL(FLASK_URL).origin;
    if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = origin;
      document.head.appendChild(link);
    }
  } catch { /* abaikan URL invalid */ }
});
onUnmounted(() => { if (hintTimer) clearTimeout(hintTimer); });

function sembunyikanHint() {
  showHint.value = false;
  if (hintTimer) { clearTimeout(hintTimer); hintTimer = null; }
}

// Alamat backend Flask (dash heterogen per environment, kodenya tetap).
// Dipakai sebagai base URL halaman chatbot juga (satu origin).
// Lokal: http://localhost:5000 | produksi: https://chat.himatif.xxx
const FLASK_URL = import.meta.env.VITE_MINTIF_API_URL || "http://localhost:5000";

function klik() {
  sembunyikanHint();
  const el = tombol.value;
  if (!el) {
    window.location.href = FLASK_URL.replace(/\/+$/, "") + "/chatbot";
    return;
  }
  // titik tengah tombol = origin circle reveal (kayak home.js pillow-fox)
  const r = el.getBoundingClientRect();
  berangkatKeFlask(r.left + r.width / 2, r.top + r.height / 2, FLASK_URL);
}
</script>

<template>
  <div class="group fixed z-[1000] left-[calc(1.25rem+env(safe-area-inset-left,0px))] bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
    <!-- tooltip otomatis: tiap buka/refresh, 3 detik, fade-slide -->
    <transition name="fab-hint">
      <div v-if="showHint"
        class="absolute left-[72px] bottom-3 whitespace-nowrap rounded-2xl bg-gradient-to-r from-cosmos to-errie px-4 py-2.5 text-xs font-bold text-holy ring-1 ring-khaki/60 shadow-blacky">
        Tanya Mintif
      </div>
    </transition>
    <!-- tooltip hover khusus desktop: fade-slide via opacity (bukan display) -->
    <div :class="{ 'invisible': showHint }"
      class="pointer-events-none absolute left-[72px] bottom-3 whitespace-nowrap rounded-2xl bg-gradient-to-r from-cosmos to-errie px-4 py-2.5 text-xs font-bold text-holy opacity-0 ring-1 ring-khaki/60 shadow-blacky translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
      Tanya Mintif
    </div>
    <!-- tombol: bulet 60px, putih, logo tengah simetris, shadow timbul + float tipis -->
    <button ref="tombol" @click="klik" aria-label="Buka Mintif"
      class="fab-float grid h-[60px] w-[60px] place-items-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_38%,#FBFBFB_0%,#AF9D80_58%,#5E141B_100%)] outline-none focus-visible:ring-2 focus-visible:ring-khaki focus-visible:ring-offset-2 focus-visible:ring-offset-errie shadow-[0px_6px_20px_#000,0_0_0_2px_#AF9D80,0_0_28px_rgba(94,20,27,.75)]">
      <img src="/images/mintif-fab.png" alt="Mintif" class="h-full w-full -translate-y-1 object-contain p-1" />
    </button>
  </div>
</template>

<style scoped>
/* naik-turun tipis biar hidup (±4px, 3 detik) */
@keyframes fabFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.fab-float { animation: fabFloat 3s ease-in-out infinite; }
/* pause saat circle reveal jalan (class mintif-anim di <html>, lih. App.vue)
   biar GPU fokus ke animasi circle. */
:global(html.mintif-anim .fab-float) { animation-play-state: paused; }
/* tooltip: fade-slide mulus */
.fab-hint-enter-active, .fab-hint-leave-active { transition: all 0.3s ease; }
.fab-hint-enter-from, .fab-hint-leave-to { opacity: 0; transform: translateY(4px); }
@media (prefers-reduced-motion: reduce) {
  .fab-float { animation: none; }
}
</style>
