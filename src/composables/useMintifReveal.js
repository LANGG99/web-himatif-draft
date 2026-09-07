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
  ov.classList.add("no-transition");
  rootEl().style.setProperty("--ox", x + "px");
  rootEl().style.setProperty("--oy", y + "px");
  rootEl().style.setProperty("--r", "0px");
  ov.getBoundingClientRect(); // paksa reflow biar snap instan
  ov.classList.remove("no-transition");
  requestAnimationFrame(() => {
    rootEl().style.setProperty("--r", maxRadius(x, y) + "px");
  });
  return true;
}

// Berangkat: Home -> /mintif. Dipanggil dari tombol FAB.
export function berangkatKeMintif(x, y, router) {
  simpan("mintifOriginX", x);
  simpan("mintifOriginY", y);
  simpan("mintifTransitionPhase", "toChat");
  mekarDari(x, y);
  setTimeout(() => router.push("/mintif"), NAV_TENGAH);
}

// Pulang: /mintif -> Home. x,y = titik tombol back (kalau null pakai titik asal).
export function pulangKeHome(router, x = null, y = null) {
  const ox = x ?? parseFloat(ambil("mintifOriginX"));
  const oy = y ?? parseFloat(ambil("mintifOriginY"));
  if (isNaN(ox) || isNaN(oy)) {
    bersihkanKunciTransisi();
    router.push("/");
    return;
  }
  simpan("mintifOriginX", ox);
  simpan("mintifOriginY", oy);
  simpan("mintifTransitionPhase", "toHome");
  mekarDari(ox, oy);
  setTimeout(() => router.push("/"), NAV_TENGAH);
}

// Tiba: dipanggil onMounted tiap halaman yang terlibat (Home + Mintif).
// Kalau overlay lagi mekar/ketutup, susutkan sampai 0 (reveal halaman).
export function tibaDiHalaman() {
  const ov = overlayEl();
  if (!ov) {
    bersihkanKunciTransisi();
    return;
  }
  ov.classList.remove("no-transition");
  rootEl().style.setProperty("--r", "0px");
  setTimeout(bersihkanKunciTransisi, DURASI_PENUH + 50);
}
