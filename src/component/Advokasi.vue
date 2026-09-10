<script setup>
import { reactive } from "vue";
import { AdvokasiServices } from "../composables/constants/Advokasi";

const cardMotionProps = reactive({
  initial: { opacity: 0, y: 50 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: { duration: 700, ease: "easeOut" },
  },
});

const reactiveServices = reactive(AdvokasiServices);
</script>

<template>
  <!-- Intro -->
  <div class="mx-auto mb-[50px] flex flex-col gap-5 items-center justify-center mt-20 px-4">
    <div class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"></div>
    <h1 v-motion :initial="{ opacity: 0, y: -20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800, ease: 'easeOut' } }" class="text-holy text-3xl font-bold lg:text-5xl">
      Layanan
      <span class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent">Advokasi</span>
      Mahasiswa
    </h1>
    <div v-motion :initial="{ opacity: 0, y: -20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 600, duration: 900, ease: 'easeOut' } }" class="bg-holy w-[100px] h-1 bg-gradient-to-l from-khaki from-56% to-holy"></div>
    <p v-motion :initial="{ opacity: 0, y: -20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 700, duration: 1000, ease: 'easeOut' } }" class="text-center text-[13px] w-[300px] lg:text-[16px] lg:w-[700px] my-5 text-holy">
      Didengar, Didampingi, Diperjuangkan. Kami hadir sebagai jembatan antara mahasiswa dan pihak kampus. Sampaikan keluhan, aspirasi, atau permasalahanmu — kami siap mendengarkan, mendampingi, dan membantu menindaklanjuti kepada pihak
      terkait apabila diperlukan. ✨
    </p>
  </div>

  <!-- List Layanan -->
  <div class="mx-auto my-10 max-w-5xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div
        v-for="(service, index) in reactiveServices"
        :key="service.id"
        v-motion
        :initial="cardMotionProps.initial"
        :visibleOnce="{
          ...cardMotionProps.visibleOnce,
          transition: { ...cardMotionProps.visibleOnce.transition, delay: 100 * index },
        }"
        class="flex gap-4 items-start bg-cosmos/10 rounded-lg p-5 shadow-md shadow-black/30"
      >
        <span class="text-3xl shrink-0">{{ service.icon }}</span>
        <div>
          <h3 class="text-holy font-semibold text-lg mb-1">{{ service.title }}</h3>
          <p class="text-holy/70 text-sm">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA Form -->
  <!-- CTA Form -->
  <div class="max-w-2xl mx-auto mt-16 px-4 text-center">
    <p class="text-holy mb-4">Sampaikan laporan/aspirasimu lewat tautan berikut:</p>
    <a
      href="https://forms.gle/Tv4ixn7HkAA1zXoRA"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block bg-cosmos bg-gradient-to-r from-cosmos from-56% to-khaki text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
    >
      Isi Formulir Aspirasi
    </a>
  </div>

  <!-- Hubungi Kami -->
  <div class="max-w-2xl mx-auto mt-16 px-4 text-center">
    <h2 class="text-holy text-2xl lg:text-3xl font-bold mb-6">
      Hubungi
      <span class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent"> Kami </span>
    </h2>
    <div class="flex flex-col gap-4 items-center max-w-sm mx-auto">
      <a href="https://wa.me/6285716973381" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-holy hover:text-khaki transition-colors w-full justify-center">
        <svg class="w-6 h-6 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
          />
          <path
            d="M12.001 2C6.478 2 2 6.477 2 12c0 1.86.51 3.68 1.478 5.264L2 22l4.879-1.451A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.174a8.16 8.16 0 01-4.166-1.14l-.299-.177-3.104.923.929-3.03-.194-.31A8.16 8.16 0 013.827 12c0-4.516 3.657-8.173 8.174-8.173S20.174 7.484 20.174 12 16.518 20.174 12.001 20.174z"
          />
        </svg>
        <span>0857-1697-3381 (Chandra Elisa)</span>
      </a>
      <a href="mailto:untarahimati@gmail.com" class="flex items-center gap-3 text-holy hover:text-khaki transition-colors w-full justify-center">
        <svg class="w-6 h-6 shrink-0" viewBox="0 0 48 48">
          <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
          <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
          <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
          <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
          <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
        </svg>
        <span>untarahimati@gmail.com</span>
      </a>
    </div>
  </div>
</template>
