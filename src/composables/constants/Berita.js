import { reactive } from "vue";

export const beritaList = reactive([
  {
    id: 1,
    slug: "update-jadwal-uas-ganjil-2025-2026",
    kategori: "UAS",
    judul: "Update Jadwal UAS Semester Ganjil 2025/2026",
    tanggal: "2026-08-20",
    ringkasan: "Jadwal Ujian Akhir Semester (UAS) Ganjil Program Studi Teknologi Informasi resmi diperbarui. Cek jadwal terbaru sebelum ujian dimulai.",
    gambar: "", // Kosong jika tidak ada gambar
    linkPendaftaran: "", // Kosong jika hanya informasi biasa
    isi: [
      "Diberitahukan kepada seluruh mahasiswa Program Studi Teknologi Informasi bahwa jadwal Ujian Akhir Semester (UAS) Ganjil Tahun Akademik 2025/2026 telah mengalami pembaruan.",
      "Mahasiswa diharapkan untuk selalu memantau kanal informasi resmi kampus dan prodi guna mendapatkan jadwal terbaru serta menghindari keterlambatan mengikuti ujian.",
      "Apabila terdapat pertanyaan lebih lanjut terkait jadwal UAS, mahasiswa dapat menghubungi pihak akademik prodi.",
    ],
    lampiran: "",
  },
  {
    id: 2,
    slug: "informatika-mengajar-2026",
    kategori: "Kepanitiaan",
    judul: "Informatika Mengajar 2026",
    tanggal: "2026-03-22",
    ringkasan: "Informatika Mengajar merupakan program kerja Divisi Hubungan Masyarakat HIMAIF dalam bidang Pengabdian Masyarakat.",
    gambar: "/images/informatika-mengajar.webp", // Path ke gambar
    linkPendaftaran: "https://forms.gle/example123", // Link Google Form
    isi: [
      "Informatika Mengajar merupakan program kerja Divisi Hubungan Masyarakat HIMAIF dalam bidang Pengabdian Masyarakat yang dilatarbelakangi oleh pesatnya perkembangan era digital yang semakin dekat dengan kehidupan, termasuk pendidikan.",
      "Program ini bertujuan mengenalkan bidang Informatika kepada siswa/i Sekolah Dasar (SD) yang memiliki minat, namun masih terbatas dalam akses pembelajaran, pendampingan, dan kesempatan belajar secara terarah.",
      "Melalui pengenalan seperti pemrograman dasar dan gambaran umum Informatika, diharapkan siswa/i dapat memperoleh wawasan awal mengenai bidang Informatika.",
    ],
    lampiran: "",
  },
  {
    id: 3,
    slug: "kalender-akademik-2025-2026",
    kategori: "Kalender Akademik",
    judul: "Rilis Kalender Akademik Tahun 2025/2026",
    tanggal: "2026-07-15",
    ringkasan: "Kalender akademik lengkap untuk tahun ajaran 2025/2026 telah dirilis, mencakup jadwal perkuliahan, UTS, UAS, dan libur semester.",
    gambar: "",
    linkPendaftaran: "",
    isi: [
      "Universitas Tangerang Raya telah merilis kalender akademik untuk tahun ajaran 2025/2026 yang mencakup jadwal awal perkuliahan, Ujian Tengah Semester (UTS), Ujian Akhir Semester (UAS), serta periode libur semester.",
      "Mahasiswa diimbau untuk mengunduh dan menyimpan kalender akademik ini sebagai acuan dalam merencanakan kegiatan perkuliahan selama satu tahun ke depan.",
    ],
    lampiran: "",
  },
]);

export const getSortedBerita = () => {
  return [...beritaList].sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
};

export const getBeritaBySlug = (slug) => {
  return beritaList.find((item) => item.slug === slug);
};

export const formatTanggalBerita = (tanggalString) => {
  if (!tanggalString) return "";
  const [year, month, day] = tanggalString.split("-");
  const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const monthIndex = parseInt(month, 10) - 1;
  if (isNaN(monthIndex) || !bulan[monthIndex]) return tanggalString;
  return `${parseInt(day, 10)} ${bulan[monthIndex]} ${year}`;
};
