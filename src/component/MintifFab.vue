<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { berangkatKeFlask, berangkatKeInternal, cekMintifHidup } from "../composables/useMintifReveal.js";

const tombol = ref(null);
const showHint = ref(false);
const mengecek = ref(false);
// SATU bubble: auto-show + loading dikontrol Vue (tipVisible),
// hover desktop dikontrol CSS group-hover opacity-only (pola lama).
// Anti-dobel: bubble hover invisible pas bubble Vue tampil.
const tipVisible = computed(() => showHint.value || mengecek.value);
let hintTimer = null;
const router = useRouter();

// Tooltip: tiap mount (buka/refresh) nongol 3 detik lalu hilang sendiri.
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

function titikTombol() {
  const el = tombol.value;
  if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  // titik tengah tombol = origin circle reveal (kayak home.js pillow-fox)
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

async function klik() {
  sembunyikanHint();
  if (mengecek.value) return; // cegah double-klik pas health-check jalan
  // Saklar otomatis: Flask hidup -> /chatbot, mati/timeout (max 4 dtk) ->
  // /mintif-maintenance. Sehat = kelar milidetik, delay cuma pas kondisi MT.
  mengecek.value = true;
  let hidup = false;
  try {
    hidup = await cekMintifHidup(FLASK_URL);
  } finally {
    mengecek.value = false;
  }
  const t = titikTombol();
  if (hidup) {
    berangkatKeFlask(t.x, t.y, FLASK_URL);
  } else {
    berangkatKeInternal(t.x, t.y, "/mintif-maintenance", (p) => router.push(p));
  }
}
</script>

<template>
  <div class="group fixed z-[1000] left-[calc(1.25rem+env(safe-area-inset-left,0px))] bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
    <!-- SEMUA state tooltip dalam 1 <transition>: v-if yang sama dipakai
         auto-show + loading (Vue). Hover desktop = bubble visual terpisah
         pola group-hover opacity-only (yang dulu terbukti bisa). -->
    <transition name="fab-hint">
      <div v-if="tipVisible" id="mintif-tip" role="tooltip"
        class="fab-tip absolute left-[70px] top-[12px] whitespace-nowrap rounded-2xl bg-[#1C1F23]/95 px-4 py-2.5 text-xs font-bold text-holy ring-1 ring-[rgba(20,216,255,.35)] shadow-blacky">
        <span class="fab-tip-tail" aria-hidden="true"></span>
        <span class="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" aria-hidden="true"
          style="background:linear-gradient(90deg,#14D8FF,#4E7BFF 50%,#8A3DFF)"></span><span>{{ mengecek ? "Sebentar, mimin dicek dulu..." : "Tanya Mintif" }}</span>
      </div>
    </transition>
    <!-- hover desktop: opacity-only via group-hover (pola lama yang bisa).
         Anti-dobel: invisible pas bubble Vue (auto/loading) tampil.
         pointer-events-none + aria-hidden = cuma visual. -->
    <div :class="{ 'invisible': tipVisible }" aria-hidden="true"
      class="pointer-events-none absolute left-[70px] top-[12px] whitespace-nowrap rounded-2xl bg-[#1C1F23]/95 px-4 py-2.5 text-xs font-bold text-holy opacity-0 ring-1 ring-[rgba(20,216,255,.35)] shadow-blacky translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
      <span class="fab-tip-tail" aria-hidden="true"></span>
      <span class="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" aria-hidden="true"
        style="background:linear-gradient(90deg,#14D8FF,#4E7BFF 50%,#8A3DFF)"></span><span>Tanya Mintif</span>
    </div>
    <!-- tombol: logo full-bleed center (file webp sudah di-crop ke bbox),
         tidak perlu scale/translate kompensasi lagi. -->
    <div class="fab-ground" aria-hidden="true"></div>
    <button ref="tombol" @click="klik" aria-label="Buka Mintif" aria-describedby="mintif-tip" :aria-busy="mengecek"
      class="fab-float grid h-[60px] w-[60px] place-items-center rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-khaki focus-visible:ring-offset-2 focus-visible:ring-offset-errie">
      <img draggable="false" src="/images/mintif-fab.webp" alt="Mintif" class="fab-logo h-full w-full object-contain" />
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
   biar GPU fokus ke animasi circle. Ground ikut pause biar sinkron. */
:global(html.mintif-anim .fab-float) { animation-play-state: paused; }
:global(html.mintif-anim) .fab-ground { animation-play-state: paused; }
:global(html.mintif-anim) .fab-tip { animation-play-state: paused; }
/* 3D ngambang: shadow berlapis ngikutin bentuk logo (drop-shadow, bukan
   box-shadow biar nurut siluet transparan, bukan kotak tombol).
   Lapis 1 kontak rapat, lapis 2 ambient sebar, lapis 3 glow cyan-ungu
   ngikutin gradasi logo. */
.fab-logo{
  filter:
    drop-shadow(0 3px 3px rgba(0,0,0,.65))
    drop-shadow(0 10px 14px rgba(0,0,0,.35))
    drop-shadow(0 0 10px rgba(20,216,255,.22))
    drop-shadow(0 0 18px rgba(138,61,255,.16));
}
/* bayangan tanah: elips di bawah tombol, napas sinkron TERBALIK sama float
   (logo naik -> bayangan melebar + memudar, logo turun -> merapat + menajam).
   Durasi + easing SAMA kayak fabFloat biar gerakannya satu kesatuan. */
.fab-ground{
  position:absolute;
  left:50%;
  bottom:-7px;
  width:44px;
  height:10px;
  transform:translateX(-50%);
  border-radius:9999px;
  background:radial-gradient(ellipse at center, rgba(0,0,0,.55) 0%, transparent 70%);
  filter:blur(1px);
  pointer-events:none;
  animation:fabGround 3s ease-in-out infinite;
}
@keyframes fabGround{
  0%, 100%{ transform:translateX(-50%) scaleX(1); opacity:.85; }
  50%{ transform:translateX(-50%) scaleX(1.35); opacity:.45; }
}
/* tooltip: fade-slide mulus (entrance 0.3s), lalu float bareng FAB
   (durasi + easing + fase SAMA kayak fabFloat) biar gerak satu unit.
   translateY di keyframes = posisi anchor, JANGAN tambah class translate
   Tailwind di .fab-tip (ketimpa animation transform). */
.fab-tip{ animation: fabTipFloat 3s ease-in-out infinite; }
@keyframes fabTipFloat{
  0%, 100%{ transform:translateY(0); }
  50%{ transform:translateY(-4px); }
}
.fab-hint-enter-active, .fab-hint-leave-active { transition: all 0.3s ease; }
.fab-hint-enter-from, .fab-hint-leave-to { opacity: 0; transform: translateY(4px); }
/* ekor segitiga kiri: nunjuk ke tengah FAB (anchor vertikal tengah tombol) */
.fab-tip-tail{
  position:absolute;
  left:-5px;
  top:50%;
  width:10px;
  height:10px;
  transform:translateY(-50%) rotate(45deg);
  background:inherit;
  border-left:1px solid rgba(20,216,255,.35);
  border-bottom:1px solid rgba(20,216,255,.35);
  border-top-right-radius:2px;
}
@media (prefers-reduced-motion: reduce) {
  .fab-float, .fab-ground, .fab-tip { animation: none; }
  .fab-ground { display:none; }
}
</style>
