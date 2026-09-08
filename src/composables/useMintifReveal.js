// Circle reveal Mintif — port dari pillow-fox (static/js/home.js + home.css)
// ke Vue SPA. Skema sessionStorage disamain persis (mintifOriginX/Y,
// mintifTransitionPhase, mintifBackNavigation) biar gampang debug.
// Beda vs MPA: overlay hidup di App.vue (global, tidak ke-unmount),
// halaman yang TIBA bertugas menyusutkan overlay (tibaDiHalaman).

const DURASI_PENUH = 650;
const NAV_TENGAH = 455; // pindah route di 70% animasi, kayak aslinya

function rootEl() { return document.documentElement; }
function overlayEl() { return document.getElementById("mintifOverlay"); }

function maxRadius(x, y) {
  const dx = Math.max(x, window.innerWidth - x);
  const dy = Math.max(y, window.innerHeight - y);
  return Math.hypot(dx, dy);
}

// Overlay lingkaran 100px yang di-scale GPU (sama kayak sisi Flask):
// s = radius_tutup / 50. Compositor-only → mulus di HP kentang.
function skalaTutup(x, y) {
  return maxRadius(x, y) / 50;
}

// Tandai circle lagi jalan (class di <html>) biar animasi kompetitor
// (FAB float, lih. App.vue) ke-pause dan GPU fokus. Auto-lepas.
function tandaiAnimasi() {
  try {
    rootEl().classList.add("mintif-anim");
    setTimeout(() => { try { rootEl().classList.remove("mintif-anim"); } catch {} }, DURASI_PENUH + 100);
  } catch {}
}

// Samakan dengan sisi Flask (clampOrigin di chatbot.js): clamp titik origin ke
// dalam viewport. Kalau cacat/NaN → tengah viewport, biar animasi tetap main
// dan tidak loncat polos.
function clampOrigin(x, y) {
  const vw = window.innerWidth || 1, vh = window.innerHeight || 1;
  if (isNaN(x) || isNaN(y)) return { x: vw / 2, y: vh / 2 };
  return { x: Math.min(Math.max(x, 0), vw), y: Math.min(Math.max(y, 0), vh) };
}

function ambil(k) { try { return sessionStorage.getItem(k); } catch { return null; } }
function simpan(k, v) { try { sessionStorage.setItem(k, v); } catch { /* abaikan */ } }
function hapus(k) { try { sessionStorage.removeItem(k); } catch { /* abaikan */ } }

export function bersihkanKunciTransisi() {
  hapus("mintifTransitionPhase");
  hapus("mintifBackNavigation");
  hapus("mintifOriginX");
  hapus("mintifOriginY");
}

function mekarDari(x, y) {
  const ov = overlayEl();
  if (!ov) return false;
  // Double rAF (sama kayak playReturnAnimation di home.js Flask): biar browser
  // sempat paint state snap sebelum transisi. Single rAF rawan ke-batch →
  // animasi ke-skip/snap, kelihatan beda dari arah chatbot→home.
  const c = clampOrigin(x, y);
  ov.classList.add("no-transition");
  rootEl().style.setProperty("--ox", c.x + "px");
  rootEl().style.setProperty("--oy", c.y + "px");
  rootEl().style.setProperty("--s", "0");
  ov.getBoundingClientRect(); // paksa reflow biar snap instan
  ov.classList.remove("no-transition");
  tandaiAnimasi();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      rootEl().style.setProperty("--s", skalaTutup(c.x, c.y));
    });
  });
  return true;
}

// Berangkat lintas origin: web HIMATIF -> Flask /chatbot (subdomain/lokal).
// sessionStorage tidak nyebrang origin, jadi titik origin ditempel di query
// (?phase=toChat&ox=&oy=) biar sisi Flask bisa mulai ketutup pre-paint.
export function berangkatKeFlask(x, y, baseUrl) {
  const base = (baseUrl || "").replace(/\/+$/, "");
  const c = clampOrigin(x, y);
  simpan("mintifOriginX", c.x);
  simpan("mintifOriginY", c.y);
  simpan("mintifTransitionPhase", "toChat");
  mekarDari(c.x, c.y);
  const target = base + "/chatbot?phase=toChat&ox=" + Math.round(c.x) + "&oy=" + Math.round(c.y);
  setTimeout(() => { window.location.href = target; }, NAV_TENGAH);
}

function bacaQueryKembali() {
  try {
    const q = new URLSearchParams(window.location.search);
    if (q.get("phase") !== "toHome") return null;
    // phase toHome tapi koordinat cacat → fallback tengah (jangan null) biar
    // reverse tetap main, sama kayak fallback sisi Flask.
    return clampOrigin(parseFloat(q.get("ox")), parseFloat(q.get("oy")));
  } catch { return null; }
}

function bersihkanQueryKembali() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete("phase");
    url.searchParams.delete("ox");
    url.searchParams.delete("oy");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  } catch { /* abaikan */ }
}

// Tiba: dipanggil onMounted tiap halaman yang terlibat (Home).
// Kalau overlay lagi mekar/ketutup, susutkan sampai 0 (reveal halaman).
// Kepulangan lintas origin dari Flask (`?phase=toHome&ox=&oy=`): snap ketutup
// dulu dari titik itu baru susut, biar reverse-nya kelihatan.
export function tibaDiHalaman() {
  const ov = overlayEl();
  if (!ov) {
    bersihkanKunciTransisi();
    return;
  }
  const kembali = bacaQueryKembali();
  if (kembali) {
    simpan("mintifOriginX", kembali.x);
    simpan("mintifOriginY", kembali.y);
    ov.classList.add("no-transition");
    rootEl().style.setProperty("--ox", kembali.x + "px");
    rootEl().style.setProperty("--oy", kembali.y + "px");
    rootEl().style.setProperty("--s", skalaTutup(kembali.x, kembali.y));
    ov.getBoundingClientRect(); // satu reflow sync biar snap konsisten
    ov.classList.remove("no-transition");
    bersihkanQueryKembali();
    tandaiAnimasi();
    // Double rAF biar transisi susut tutup→0 selalu jalan (lih. mekarDari).
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        rootEl().style.setProperty("--s", "0");
      });
    });
  } else {
    ov.classList.remove("no-transition");
    rootEl().style.setProperty("--s", "0");
  }
  setTimeout(bersihkanKunciTransisi, DURASI_PENUH + 50);
}

// BFCache restore: pas back HP dari Flask /chatbot, halaman Vue di-restore
// TANPA re-run onMounted, tapi overlay global (#mintifOverlay) masih ketutup
// full dari berangkatKeFlask -> layar hitam. pageshow.persisted nyusutin lagi.
if (typeof window !== "undefined") {
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    const ov = overlayEl();
    if (!ov) return;
    // Cek apakah overlay lagi ketutup (skala > 0) — kalau iya, susutkan (buka).
    const r = parseFloat(
      getComputedStyle(rootEl()).getPropertyValue("--s") || "0"
    );
    if (r > 0) {
      tibaDiHalaman();
    }
  });
}
