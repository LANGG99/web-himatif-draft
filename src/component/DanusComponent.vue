<script setup>
import { danusHeader, danusProducts, danusContacts } from "../composables/constants/Danus";
</script>

<template>
  <!-- Ditambah pt-24 agar konten atas tidak tertutup navbar -->
  <div class="w-full max-w-5xl mx-auto px-4 pt-24 pb-10">
    <!-- Title Section -->
    <div class="flex flex-col gap-4 items-center justify-center mb-10">
      <div class="bg-holy w-[150px] h-2 bg-gradient-to-l from-khaki from-56% to-holy"></div>

      <h1 v-motion :initial="{ opacity: 0, y: -20 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 300, duration: 800, ease: 'easeOut' } }" class="font-bold text-3xl lg:text-5xl text-center">
        <span class="text-holy">Mark</span><span class="bg-gradient-to-r from-khaki via-khaki to-cosmos bg-clip-text text-transparent">etplace</span>
      </h1>
      <div class="bg-holy w-[70px] h-1 bg-gradient-to-l from-khaki from-56% to-holy"></div>
    </div>

    <!-- Intro Card -->
    <div v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 500, duration: 800, ease: 'easeOut' } }" class="text-holy mb-20 text-center leading-relaxed max-w-3xl mx-auto">
      <p class="text-base lg:text-lg">
        {{ danusHeader.description }}
      </p>
    </div>

    <!-- Pembungkus Product Grid -->
    <div class="flex flex-wrap justify-center gap-3 sm:gap-6 mb-12 items-stretch">
      <div
        v-for="(product, index) in danusProducts"
        :key="product.id"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 150 * index, duration: 800, ease: 'easeOut' } }"
        :hovered="{ y: -8, transition: { duration: 150, ease: 'easeOut' } }"
        class="bg-cosmos/85 rounded-xl shadow-blacky overflow-hidden flex flex-col transition-all w-[calc(50%-6px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm border border-transparent hover:!border-khaki/70 duration-300"
      >
        <!-- Thumbnail Gambar -->
        <div class="relative w-full h-[140px] sm:h-[220px] lg:h-[250px] overflow-hidden bg-cosmos/90 shrink-0">
          <img :src="product.image" :alt="product.name" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          <span class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-cosmos/90 text-khaki border border-khaki/40 font-bold text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md uppercase">
            {{ product.category }}
          </span>
        </div>

        <!-- Informasi Produk -->
        <div class="p-2.5 sm:p-5 flex flex-col flex-grow">
          <h3 class="text-holy font-bold text-xs sm:text-lg lg:text-xl line-clamp-2">{{ product.name }}</h3>
          <p class="text-holy/80 text-[11px] sm:text-sm leading-tight sm:leading-relaxed mt-1 line-clamp-3 sm:line-clamp-none">{{ product.description }}</p>

          <!-- Harga -->
          <div class="text-khaki font-extrabold text-xs sm:text-xl mt-auto pt-2 sm:pt-3">Rp {{ product.price.toLocaleString("id-ID") }}</div>
        </div>
      </div>
    </div>

    <!-- Contact Info Section -->
    <div v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800, ease: 'easeOut' } }" class="bg-cosmos/85 p-6 rounded-xl shadow-blacky text-holy max-w-xl mx-auto">
      <div class="flex items-center gap-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-khaki shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <h3 class="text-holy font-bold text-lg lg:text-xl">Hubungi Kami Langsung</h3>
      </div>

      <div class="flex flex-col gap-3 text-sm mt-4">
        <!-- WhatsApp -->
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 shrink-0 fill-[#25D366]" viewBox="0 0 24 24">
            <path
              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
            />
          </svg>
          <p><strong>WhatsApp:</strong> {{ danusContacts.phone }}</p>
        </div>

        <!-- Gmail -->
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 48 48">
            <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
            <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
            <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
            <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
            <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
          </svg>
          <p><strong>Email:</strong> {{ danusContacts.email }}</p>
        </div>

        <!-- Instagram -->
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <defs>
              <radialGradient id="igGradientDanus" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stop-color="#fdf497" />
                <stop offset="5%" stop-color="#fdf497" />
                <stop offset="45%" stop-color="#fd5949" />
                <stop offset="60%" stop-color="#d6249f" />
                <stop offset="90%" stop-color="#285AEB" />
              </radialGradient>
            </defs>
            <path
              fill="url(#igGradientDanus)"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            />
          </svg>
          <p><strong>Instagram:</strong> {{ danusContacts.instagram }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
