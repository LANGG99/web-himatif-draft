<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sidebar from "./Sidebar.vue";
import { navLinks } from "../composables/constants/Navigation";

const route = useRoute();
const router = useRouter();
const activeNav = ref(route.path);

// State untuk dropdown
const isDropdownOpen = ref(false);

// Update activeNav jika route berubah
watch(route, (val) => {
  activeNav.value = val.path;
});

const sidebarOpen = ref(false);

const handleNavClick = (href) => {
  window.scrollTo({ top: 0, behavior: "auto" });
  activeNav.value = href;
  isDropdownOpen.value = false;
  router.push(href);
};

// Cek apakah route aktif ada di salah satu item dropdown
const isDropdownActive = (items) => {
  return items.some((item) => item.href === activeNav.value);
};
</script>

<template>
  <nav class="z-[999] shadow-blacky fixed w-full flex justify-between h-20 items-center bg-errie">
    <!-- Logo -->
    <div class="flex ml-3 md:ml-10 w-14 h-14 gap-2 cursor-pointer" @click="handleNavClick('/')">
      <img class="w-full h-full object-contain" src="/public/images/LogoHimatif.webp" alt="Himatif" />
      <div class="flex flex-col mt-1 sm:mt-0">
        <h1 class="uppercase text-lg sm:text-2xl text-holy font-bold">Himatif</h1>
        <h2 class="text-holy uppercase sm:text-lg font-bold -mt-1.5">Untara</h2>
      </div>
    </div>

    <!-- Desktop Nav -->
    <ul class="text-holy hidden md:flex md:mr-10 items-center gap-3 md:gap-4 select-none">
      <li v-for="link in navLinks" :key="link.label" class="list-none relative">
        <!-- Jika Menu Punya Dropdown -->
        <div v-if="link.dropdown" class="relative py-3" @mouseenter="isDropdownOpen = true" @mouseleave="isDropdownOpen = false">
          <button class="relative font-semibold transition duration-200 hover:text-khaki px-4 rounded-md flex items-center gap-1 focus:outline-none" style="cursor: pointer; user-select: none" @click="isDropdownOpen = !isDropdownOpen">
            <span>{{ link.label }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>

            <!-- Indikator Garis Bawah Aktif -->
            <span class="absolute left-4 right-4 -bottom-1 h-[3px] rounded bg-khaki transition-all ease-in-out duration-300" :class="isDropdownActive(link.dropdown) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"></span>
          </button>

          <!-- Wrapper Dropdown + Invisible Padding agar Kursor Tidak Lepas -->
          <transition name="fade">
            <div v-if="isDropdownOpen" class="absolute top-full left-0 pt-2 w-48 z-50">
              <div class="bg-errie border border-holy/10 rounded-xl shadow-blacky py-2 flex flex-col">
                <a v-for="subItem in link.dropdown" :key="subItem.label" class="px-4 py-2.5 text-sm font-medium text-holy hover:bg-khaki/10 hover:text-khaki transition-colors cursor-pointer" @click.prevent="handleNavClick(subItem.href)">
                  {{ subItem.label }}
                </a>
              </div>
            </div>
          </transition>
        </div>

        <!-- Jika Menu Biasa -->
        <a v-else class="relative font-semibold transition duration-200 hover:text-khaki px-4 rounded-md" style="cursor: pointer; user-select: none" @click.prevent="handleNavClick(link.href)">
          {{ link.label }}
          <span class="absolute left-4 right-4 -bottom-1 h-[3px] rounded bg-khaki transition-all ease-in-out duration-300" :class="activeNav === link.href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"></span>
        </a>
      </li>
    </ul>

    <!-- Hamburger Icon (Mobile) -->
    <button v-if="!sidebarOpen" class="md:hidden mr-5 z-30" @click="sidebarOpen = true" aria-label="Open navigation">
      <IconCarbonMenu class="w-8 h-8 text-holy" />
    </button>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="sidebarOpen" class="fixed inset-0 bg-black bg-opacity-40 z-30" @click="sidebarOpen = false"></div>
    </transition>

    <!-- Sidebar Component (Mobile) -->
    <Sidebar :open="sidebarOpen" :onClose="() => (sidebarOpen = false)" :navLinks="navLinks" />
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
