<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './Sidebar.vue'
import { navLinks } from '../composables/constants/Navigation'

const route = useRoute()
const router = useRouter()
const activeNav = ref(route.path)

// Update activeNav jika route berubah (navigasi manual/refresh)
watch(route, (val) => {
  activeNav.value = val.path
})
const sidebarOpen = ref(false)

const handleNavClick = (href) => {
  window.scrollTo({ top: 0, behavior: 'auto' }) // scroll langsung ke atas
  activeNav.value = href
  router.push(href)
}
</script>

<template>
    <!-- bg-cosmos bg-gradient-to-r from-cosmos from-56% to-khaki bg-clip-text text-transparent font-bold my-auto -->
<nav class=" z-[999] shadow-blacky fixed w-full flex justify-between h-20 items-center bg-errie">
    <!-- Logo -->
    <div class="flex ml-3 md:ml-10 w-14 h-14 gap-2">
        <img class="w-full h-full object-contain" src="/public/images/LogoHimatif.webp" alt="Himatif">
        <div class="flex flex-col mt-1 sm:mt-0">
            <h1 class="uppercase text-lg sm:text-2xl text-holy font-bold">Himatif</h1>
            <h2 class="text-holy uppercase sm:text-lg font-bold -mt-1.5">Untara</h2>
        </div>
    </div>

    <!-- Desktop Nav -->
    <!-- <ul class="text-holy hidden md:flex md:mr-10 items-center gap-3 md:gap-4 select-none">
        <li v-for="link in navLinks" :key="link.label">
            <a
                class="relative font-semibold transition duration-200 hover:text-khaki px-4 rounded-md"
                :href="link.href"
                style="cursor:pointer; user-select: none;"
                @click.prevent="activeNav= link.href"
            >{{ link.label }}
                <span class="absolute left-4 right-4 -bottom-1 h-[3px] rounded bg-khaki transition-all ease-in-out duration-300"
                :class="activeNav === link.href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"></span>
            </a>
        </li>
    </ul> -->

    <!-- <ul class="text-holy hidden md:flex md:mr-10 items-center gap-3 md:gap-4 select-none">
  <li
    v-for="link in navLinks"
    :key="link.label"
    class="list-none"
  >
    <router-link
      :to="link.href"
      class="relative font-semibold transition duration-200 hover:text-khaki px-4 rounded-md"
      style="cursor:pointer; user-select: none;"
      @click="activeNav = link.href"
    >
      {{ link.label }}
      <span
        class="absolute left-4 right-4 -bottom-1 h-[3px] rounded bg-khaki transition-all ease-in-out duration-300"
        :class="activeNav === link.href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
      ></span>
    </router-link>
  </li>
</ul> -->

<ul class="text-holy hidden md:flex md:mr-10 items-center gap-3 md:gap-4 select-none">
  <li
    v-for="link in navLinks"
    :key="link.label"
    class="list-none"
  >
    <a
      class="relative font-semibold transition duration-200 hover:text-khaki px-4 rounded-md"
      style="cursor:pointer; user-select: none;"
      @click.prevent="handleNavClick(link.href)"
    >
      {{ link.label }}
      <span
        class="absolute left-4 right-4 -bottom-1 h-[3px] rounded bg-khaki transition-all ease-in-out duration-300"
        :class="activeNav === link.href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
      ></span>
    </a>
  </li>
</ul>



    <!-- Hamburger Icon (Mobile) -->
    <button
        v-if="!sidebarOpen"
        class="md:hidden mr-5 z-30"
        @click="sidebarOpen = true"
        aria-label="Open navigation"
    >
    <IconCarbonMenu class="w-8 h-8 text-holy" />
    </button>

    <!-- Overlay -->
    <transition name="fade">
    <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-40 z-30"
        @click="sidebarOpen = false"
    ></div>
    </transition>

    <!-- Sidebar Component -->
    <Sidebar
        :open="sidebarOpen"
        :onClose="() => sidebarOpen = false"
        :navLinks="navLinks"
    />
</nav>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>