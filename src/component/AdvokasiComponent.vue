<script setup>
import { advokasiHeader, advokasiServices, advokasiContacts } from "../composables/constants/Advokasi";
</script>

<template>
  <!-- Menambahkan overflow-x-hidden dan max-w-full pada container utama -->
  <div class="w-full max-w-5xl mx-auto px-4 pt-24 pb-10 overflow-x-hidden">
    <!-- Title Section -->
    <div class="flex flex-col gap-4 items-center justify-center mb-12 max-w-full">
      <div class="bg-holy w-[150px] max-w-full h-2 bg-gradient-to-l from-khaki from-56% to-holy"></div>

      <h1 v-motion :initial="{ opacity: 0, y: -20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 300, duration: 800, ease: 'easeOut' } }" class="text-holy font-bold text-3xl lg:text-5xl text-center break-words max-w-full">
        Layanan
        <span class="bg-cosmos bg-gradient-to-l from-cosmos from-56% to-khaki bg-clip-text text-transparent"> Advokasi </span>
      </h1>

      <div class="bg-holy w-[70px] max-w-full h-1 bg-gradient-to-l from-khaki from-56% to-holy"></div>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800, ease: 'easeOut' } }"
        class="text-khaki italic text-lg lg:text-xl font-semibold text-center mt-2 max-w-full break-words"
      >
        "{{ advokasiHeader.subtitle }}"
      </p>
    </div>

    <!-- Intro Card -->
    <div v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 500, duration: 800, ease: 'easeOut' } }" class="text-holy mb-20 text-center leading-relaxed max-w-3xl mx-auto break-words">
      <p class="text-base lg:text-lg">
        {{ advokasiHeader.description }}
      </p>
    </div>

    <!-- Layanan List Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full">
      <div
        v-for="(service, index) in advokasiServices"
        :key="index"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 200 * index, duration: 800, ease: 'easeOut' } }"
        :hovered="{ y: -8, transition: { duration: 150, ease: 'easeOut' } }"
        class="bg-cosmos/85 p-6 rounded-xl shadow-blacky flex flex-row items-start gap-4 border border-transparent hover:!border-khaki/70 transition-all duration-300 w-full overflow-hidden"
      >
        <!-- Ikon SVG berdasarkan urutan index -->
        <div class="text-khaki shrink-0 mt-1">
          <!-- 0: Konsultasi & Pendampingan (Chat Icon) -->
          <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>

          <!-- 1: Penanganan Keluhan (Document/Edit Icon) -->
          <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>

          <!-- 2: Advokasi & Mediasi (Scales/Balance Icon) -->
          <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l9-4 9 4M3 6v14a1 1 0 001 1h16a1 1 0 001-1V6M3 6l9 6 9-6M12 12v9" />
          </svg>

          <!-- 3: Pendampingan Mahasiswa (Shield/User Check Icon) -->
          <svg v-else-if="index === 3" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>

          <!-- 4: Aspirasi & Kebijakan (Megaphone/Speaker Icon) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        </div>

        <!-- Teks Judul & Deskripsi dengan min-w-0 untuk cegah flex overflow -->
        <div class="flex flex-col gap-1 min-w-0">
          <h3 class="text-holy font-bold text-lg lg:text-xl break-words">{{ service.title }}</h3>
          <p class="text-holy/80 text-sm leading-relaxed break-words">{{ service.description }}</p>
        </div>
      </div>
    </div>

    <!-- Form & Contact Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full">
      <!-- Call to Action Google Form (diubah dari animasi x ke sumbu y agar tidak merusak viewport hp) -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800, ease: 'easeOut' } }"
        class="bg-cosmos/85 p-6 rounded-xl shadow-blacky flex flex-col justify-between w-full overflow-hidden"
      >
        <div>
          <div class="flex items-center gap-3 mb-2">
            <!-- SVG Megaphone -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-khaki shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            <h3 class="text-holy font-bold text-lg lg:text-xl break-words">Sampaikan Aspirasimu</h3>
          </div>
          <p class="text-holy text-sm mb-5 leading-relaxed break-words">Punya keluhan, saran, atau kendala seputar perkuliahan? Klik tombol di bawah untuk mengisi formulir laporan aspirasi.</p>
        </div>

        <!-- Tombol -->
        <a
          :href="advokasiHeader.formUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 text-center bg-gradient-to-r from-khaki to-cosmos text-holy font-bold py-2 px-4 text-sm rounded-lg shadow-md hover:opacity-90 transition-all w-fit max-w-full"
        >
          <span>Isi Formulir Laporan</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      <!-- Contact Info (diubah dari animasi x ke sumbu y agar tidak merusak viewport hp) -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 500, duration: 800, ease: 'easeOut' } }"
        class="bg-cosmos/85 p-6 rounded-xl shadow-blacky text-holy flex flex-col justify-between w-full overflow-hidden"
      >
        <div>
          <div class="flex items-center gap-3 mb-3">
            <!-- SVG Phone -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-khaki shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <h3 class="text-holy font-bold text-lg lg:text-xl break-words">Hubungi Kami Langsung</h3>
          </div>

          <div class="flex flex-col gap-3 text-sm mt-4">
            <!-- WhatsApp -->
            <div class="flex items-center gap-3 min-w-0">
              <svg class="w-5 h-5 shrink-0 fill-[#25D366]" viewBox="0 0 24 24">
                <path
                  d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                />
              </svg>
              <p class="break-all"><strong>WhatsApp:</strong> {{ advokasiContacts.phone }}</p>
            </div>

            <!-- Gmail -->
            <div class="flex items-center gap-3 min-w-0">
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
              </svg>
              <p class="break-all"><strong>Email:</strong> {{ advokasiContacts.email }}</p>
            </div>

            <!-- Instagram -->
            <div class="flex items-center gap-3 min-w-0">
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <defs>
                  <radialGradient id="igGradient" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stop-color="#fdf497" />
                    <stop offset="5%" stop-color="#fdf497" />
                    <stop offset="45%" stop-color="#fd5949" />
                    <stop offset="60%" stop-color="#d6249f" />
                    <stop offset="90%" stop-color="#285AEB" />
                  </radialGradient>
                </defs>
                <path
                  fill="url(#igGradient)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
              <p class="break-all"><strong>Instagram:</strong> {{ advokasiContacts.instagram }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Closing Tagline -->
    <div class="mt-12 text-center text-holy italic text-sm lg:text-base font-semibold max-w-full">
      <p class="break-words">"Suaramu berarti, hakmu dilindungi. Bersama kita wujudkan perubahan yang lebih baik!"</p>
    </div>
  </div>
</template>
