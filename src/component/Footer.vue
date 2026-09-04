<template>
  <footer class="bg-errie text-white py-10 px-6 text-center font-sans">
    <div class="max-w-screen-lg mx-auto flex flex-col items-center gap-6 pt-8 relative">

      <!-- Info Kampus -->
      <div class="text-center">
        <h3 class="text-2xl font-bold mb-2.5">UNIVERSITAS TANGERANG RAYA</h3>
        <p class="leading-normal">Komp. Perum. Sudirman Indah</p>
        <p class="leading-normal">
          Jl. KI Mas Laeng No 25 Katomas Tigaraksa Kab. Tangerang
        </p>
      </div>

      <!-- Social Media -->
      <div class="text-center">
        <p class="mb-2.5 text-base">Follow Social Media Kami:</p>
        <div class="flex gap-3 justify-center pt-2.5 flex-wrap">
          <!-- WhatsApp -->
          <!-- <a
            href="https://wa.me/083898348449"
            target="_blank"
            aria-label="WhatsApp"
            class="text-holy text-xl border border-holy rounded-full w-12 h-12 flex justify-center items-center transition duration-300 hover:text-white hover:border-none hover:bg-gradient-to-br from-green-500 to-teal-500"
          >
            <IconSimpleIconsWhatsapp class="w-6 h-6" />
          </a> -->

          <!-- Instagram -->
          <a
            href="https://www.instagram.com/himatif.untara?igsh=MWd0NTMwaW1ueTN4ZA=="
            target="_blank"
            aria-label="Instagram"
            class="text-white text-xl border border-white rounded-full w-12 h-12 flex justify-center items-center transition duration-300 hover:text-white hover:border-none hover:bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"
          >
            <IconSimpleIconsInstagram class="w-6 h-6" />
          </a>

          <!-- YouTube -->
          <a
            href="https://m.youtube.com/@himatif.untara_channel297?fbclid=PAQ0xDSwLtNAhleHRuA2FlbQIxMAABp3Sl2GfFkGntEa89W_YR0kP6blKDcrZ9OYE7CMnhGxwhjx3jU7_-z5tF6wPS_aem_YnYiZK1ZTSqq0ealGz-nWg"
            target="_blank"
            aria-label="YouTube"
            class="text-white text-xl border border-white rounded-full w-12 h-12 flex justify-center items-center transition duration-300 hover:text-white hover:border-none hover:bg-gradient-to-br from-red-600 to-black"
          >
            <IconSimpleIconsYoutube class="w-6 h-6" />
          </a>

          <!-- TikTok -->
          <a
            href="https://www.tiktok.com/@himatif_untara?_t=8pvY7CSLRY8&_r=1&fbclid=PAQ0xDSwLtNB5leHRuA2FlbQIxMQABp1aMlSL_BeM1UVNlWsywJu_a6wQcOPxjTRHZNaF53aqrrIZ7DJ1pdCwUBs50_aem_CKm31MjN9OIhPOVi1GFl0Q"
            target="_blank"
            aria-label="TikTok"
            class="text-white text-xl border border-white rounded-full w-12 h-12 flex justify-center items-center transition duration-300 hover:text-white hover:border-none hover:bg-gradient-to-br from-cyan-400 to-pink-500"
          >
            <IconSimpleIconsTiktok class="w-6 h-6" />
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center mt-4">
        <p class="text-sm uppercase">Copyright © HIMATIF UNTARA {{ currentYear }}</p>
        <p class="text-[10px] uppercase">made by litbang</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
