<!-- src/pages/UnderConstruction.vue -->
<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gray-100 px-4"
  >
    <div class="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
      <div class="text-cosmos mb-4">
        <!-- Icon tanda info -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 12v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">
        Website Sedang Dalam Pengembangan
      </h2>
      <p class="text-gray-600 mb-6">
        Maaf halaman ini belum tersedia. Silakan kembali ke halaman utama.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center bg-cosmos text-white px-4 py-2 rounded hover:bg-errie transition"
      >
        <!-- Icon home -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"
          />
        </svg>
        Kembali ke Beranda
      </router-link>
    </div>
  </section>
</template>
