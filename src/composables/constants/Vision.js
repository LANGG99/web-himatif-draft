import { reactive } from 'vue';

export const cards = reactive([
    {
    title: 'Our Vision',
    text: 'Menjadi organisasi kemahasiswaan yang unggul dalam pengembangan teknologi informasi dan karakter.',
    hover: true,
    },
    {
    title: 'Our Mission',
    text: 'Mendorong inovasi, kolaborasi, dan pengembangan diri mahasiswa melalui berbagai program dan kegiatan.',
    hover: true,
    },
    {
    title: 'Komitmen Kami',
    text: 'Teknologi Informasi Beda!, Teknologi Informasi Satu!, Teknologi Informasi Beda Tapi Satu!',
    hover: false
    }
]);