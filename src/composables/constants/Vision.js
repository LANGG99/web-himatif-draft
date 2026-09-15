import { reactive } from "vue";

export const cards = reactive([
  {
    title: "Our Vision",
    text: "Terwujudnya Organisasi HIMATIF Untara yang menciptakan lingkungan yang terorganisir dan terdidik serta juga aktif di dalam maupun di luar kampus, sehingga penerapan pengabdian kepada masyarakat dapat dijalankan secara baik.",
    hover: true,
  },
  {
    title: "Our Mission",
    // Mengubah text menjadi Array agar menjadi list/poin-poin rapi
    text: [
      "Bertakwa terhadap Tuhan Yang Maha Esa.",
      "Menjalin serta menjaga kerja sama antar organisasi internal maupun eksternal.",
      "Mengadakan kegiatan bersama mahasiswa/i Teknik Informasi untuk menyalurkan aspirasi serta menampung kreativitas mahasiswa/i.",
      "Menjunjung tinggi sikap toleransi, saling menghormati, dan mengedepankan kebhinekaan antar mahasiswa/i maupun masyarakat.",
    ],
    hover: true,
  },
  {
    title: "Komitmen Kami",
    text: "Teknologi Informasi Beda! Teknologi Informasi Satu! Teknologi Informasi Beda Tapi Satu!",
    hover: false,
  },
]);
