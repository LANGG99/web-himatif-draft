<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { pulangKeHome, tibaDiHalaman } from "../composables/useMintifReveal.js";

const router = useRouter();
const tombolBack = ref(null);
const input = ref("");
const daftarPesan = ref([
  { dari: "AI", teks: "Halo! Kenalin, aku Mintif, asisten HIMATIF. Mau tanya apa? Coba klik salah satu topik di bawah." },
]);
const chips = ["Visi HIMATIF?", "Apa itu ARTHASA?", "Struktur kabinet?"];
const badanChat = ref(null);
const inputEl = ref(null);
const sibuk = ref(false); // true selama nunggu balasan (cegah spam dobel)

// Tiba dari circle reveal -> susutkan overlay (reveal halaman ini)
onMounted(() => {
  tibaDiHalaman();
  nextTick(() => inputEl.value?.focus());
});

function kembali() {
  const el = tombolBack.value;
  if (!el) {
    pulangKeHome(router);
    return;
  }
  // tutup pakai circle reveal dari titik tombol back
  const r = el.getBoundingClientRect();
  pulangKeHome(router, r.left + r.width / 2, r.top + r.height / 2);
}

function scrollBawah() {
  nextTick(() => { if (badanChat.value) badanChat.value.scrollTop = badanChat.value.scrollHeight; });
}

// Alamat backend Flask (dash heterogen per environment, kodenya tetap).
// Lokal: http://localhost:5000 | demo: URL forwarded codespace | produksi: https://mintif.domain
const API_URL = import.meta.env.VITE_MINTIF_API_URL || "http://localhost:5000";

// user_id stabil per browser (localStorage) biar history nyambung.
// Formatnya huruf-angka 1-64 char sesuai validasi backend (app.py).
function dapatUserId() {
  let id = null;
  try { id = localStorage.getItem("mintifUserId"); } catch { /* abaikan */ }
  if (!id || !/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
    id = "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    try { localStorage.setItem("mintifUserId", id); } catch { /* abaikan */ }
  }
  return id;
}

// Kirim ke backend Flask (FormData = simple request, tanpa preflight CORS).
async function kirim(teks) {
  const bersih = teks.trim();
  if (!bersih || sibuk.value) return;
  sibuk.value = true;
  daftarPesan.value.push({ dari: "User", teks: bersih });
  input.value = "";
  scrollBawah();
  const jempol = daftarPesan.value.push({ dari: "AI", mengetik: true });
  scrollBawah();
  try {
    const form = new FormData();
    form.append("pesan", bersih);
    form.append("user_id", dapatUserId());
    const res = await fetch(`${API_URL}/api/chat`, { method: "POST", body: form });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    daftarPesan.value.splice(jempol - 1, 1, { dari: "AI", teks: data.reply || "(balasan kosong)" });
  } catch (e) {
    daftarPesan.value.splice(jempol - 1, 1, {
      dari: "AI",
      teks: `Yah, Mintif gagal nyambung ke server (${e.message}). Pastiin backend nyala di ${API_URL}, terus coba lagi ya.`,
    });
  } finally {
    sibuk.value = false;
    scrollBawah();
  }
}
</script>

<template>
  <section class="min-h-screen bg-errie text-holy flex flex-col pt-20" aria-label="Chat Mintif">
    <!-- header -->
    <header class="flex items-center gap-3 bg-cosmos px-4 py-3">
      <button ref="tombolBack" @click="kembali" aria-label="Kembali"
        class="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-holy/10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
      </button>
      <img src="/images/mintif-fab.png" alt="Mintif" class="h-9 w-9 rounded-full bg-white object-contain p-0.5" />
      <div class="leading-tight">
        <p class="font-bold">Mintif</p>
        <p class="flex items-center gap-1 text-xs text-holy/70">
          <span class="inline-block h-2 w-2 rounded-full bg-green-400"></span> Online
        </p>
      </div>
    </header>

    <!-- badan chat -->
    <div ref="badanChat" class="flex-1 space-y-3 overflow-y-auto p-4">
      <div v-for="(p, i) in daftarPesan" :key="i" :class="p.dari === 'User' ? 'flex justify-end' : 'flex justify-start'">
        <div v-if="p.mengetik" class="rounded-2xl rounded-bl-md bg-holy/10 px-3 py-2 text-sm">...</div>
        <div v-else :class="p.dari === 'User'
          ? 'max-w-[80%] rounded-2xl rounded-br-md bg-cosmos px-3 py-2 text-sm'
          : 'max-w-[80%] rounded-2xl rounded-bl-md bg-holy/10 px-3 py-2 text-sm'">{{ p.teks }}</div>
      </div>
      <div v-if="daftarPesan.length <= 1" class="flex flex-wrap gap-2 pt-1">
        <button v-for="c in chips" :key="c" @click="kirim(c)"
          class="rounded-full border border-khaki px-3 py-1.5 text-xs font-semibold text-khaki transition hover:bg-khaki hover:text-errie">{{ c }}</button>
      </div>
    </div>

    <!-- footer -->
    <form @submit.prevent="kirim(input)" class="flex items-center gap-2 border-t border-holy/10 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
      <input ref="inputEl" v-model="input" type="text" placeholder="Tanya Mintif..."
        class="flex-1 rounded-full bg-holy/10 px-4 py-2 text-sm outline-none placeholder:text-holy/40 focus:ring-1 focus:ring-khaki" />
      <button type="submit" aria-label="Kirim"
        class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cosmos transition hover:bg-khaki hover:text-errie">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  </section>
</template>
