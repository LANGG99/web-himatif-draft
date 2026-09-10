<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Wrench, Cog, RotateCcw, House } from "lucide-vue-next";
import { tibaDiHalaman, berangkatKeFlask, berangkatKeInternal, cekMintifHidup } from "../composables/useMintifReveal.js";

const router = useRouter();

// Base URL Flask (sama kayak FAB) — dipakai tombol "Coba Lagi".
const FLASK_URL = import.meta.env.VITE_MINTIF_API_URL || "http://localhost:5000";

const mencoba = ref(false);
const pesanRetry = ref("");

onMounted(() => {
  tibaDiHalaman(); // susutkan circle overlay kalau datang dari FAB
});

function titikKlik(e) {
  const vw = window.innerWidth || 1, vh = window.innerHeight || 1;
  if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
    return { x: e.clientX, y: e.clientY };
  }
  return { x: vw / 2, y: vh / 2 };
}

async function cobaLagi(e) {
  if (mencoba.value) return;
  pesanRetry.value = "";
  mencoba.value = true;
  let hidup = false;
  try {
    hidup = await cekMintifHidup(FLASK_URL);
  } finally {
    mencoba.value = false;
  }
  if (hidup) {
    const t = titikKlik(e);
    berangkatKeFlask(t.x, t.y, FLASK_URL);
  } else {
    pesanRetry.value = "Mimin masih ngoprek, coba lagi bentar ya 🛠️";
  }
}

function kembali(e) {
  const t = titikKlik(e);
  berangkatKeInternal(t.x, t.y, "/", (p) => router.push(p));
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-errie px-4 py-10">
    <div class="w-full max-w-md rounded-3xl bg-gradient-to-b from-cosmos to-errie px-6 py-10 text-center text-holy ring-1 ring-khaki/60 shadow-blacky">
      <img src="/images/mintif-fab.png" alt="Mintif" class="mx-auto h-24 w-24 rounded-full object-contain ring-2 ring-khaki/70" />
      <!-- Mimin lagi ngoprek: gear muter + kunci inggris -->
      <div class="mt-4 flex items-center justify-center gap-2 text-khaki" aria-hidden="true">
        <Cog class="h-8 w-8 motion-safe:animate-spin-slow" />
        <Wrench class="h-7 w-7" />
      </div>
      <h1 class="mt-4 text-2xl font-bold">Mimin lagi benerin Mintif 🛠️</h1>
      <p class="mt-2 text-sm text-holy/80">
        Mintif lagi maintenance bentar, mimin lagi ngoprek biar makin pinter. Balik lagi nanti ya!
      </p>
      <div class="mt-6 flex flex-col gap-3">
        <button @click="cobaLagi" :disabled="mencoba" aria-busy="mencoba"
          class="inline-flex items-center justify-center gap-2 rounded-2xl bg-holy px-4 py-2.5 text-sm font-bold text-cosmos transition hover:opacity-90 disabled:opacity-60">
          <RotateCcw class="h-4 w-4" :class="{ 'motion-safe:animate-spin': mencoba }" />
          {{ mencoba ? "Ngecek Mintif..." : "Coba Lagi" }}
        </button>
        <button @click="kembali"
          class="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-holy ring-1 ring-khaki/60 transition hover:bg-khaki/10">
          <House class="h-4 w-4" />
          Kembali ke Beranda
        </button>
      </div>
      <p v-if="pesanRetry" class="mt-4 text-xs text-khaki">{{ pesanRetry }}</p>
    </div>
  </section>
</template>
