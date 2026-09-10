// export const navLinks = [
//     { label: 'Home', href: '#Home' },
//     { label: 'About Us', href: '#AboutUs' },
//     { label: 'Profile', href: '#Profile' },
//     { label: 'Proker', href: '#Proker' },
//     { label: 'Aspirasi', href: '#Aspirasi' }
// ]

export const navLinks = [
  { label: "Beranda", href: "/" },
  {
    label: "Informasi & Layanan",
    dropdown: [
      { label: "Berita", href: "/Berita" },
      { label: "Advokasi", href: "/Advokasi" },
      { label: "Danus", href: "/Danus" },
    ],
  },
  { label: "Karya Mahasiswa", href: "/Karya" },
  { label: "Profil", href: "/Profile" },
  { label: "Tentang Kami", href: "/About" },
  // { label: "Bengkel IT", href: "/Bengkel" },
];
