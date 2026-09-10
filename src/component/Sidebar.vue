<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

defineProps(["open", "onClose", "navLinks"]);

const activeDropdown = ref(null);

const toggleDropdown = (label) => {
  activeDropdown.value = activeDropdown.value === label ? null : label;
};
</script>

<template>
  <transition name="slide">
    <aside v-if="open" class="fixed top-0 right-0 w-64 h-full bg-errie text-holy z-40 flex flex-col shadow-lg overflow-y-auto">
      <!-- Header -->
      <div class="flex flex-col justify-between p-4 bg-cosmos shrink-0">
        <span class="font-bold text-xl uppercase">Himatif Untara</span>
        <small class="text-sm font-semibold">Kabinet Arthasa</small>
      </div>

      <!-- Navigation Links -->
      <ul class="flex flex-col gap-2 p-4">
        <li v-for="link in navLinks" :key="link.label" class="list-none">
          <!-- Jika Punya Sub-Menu (Dropdown) -->
          <template v-if="link.dropdown && link.dropdown.length > 0">
            <button type="button" @click.stop="toggleDropdown(link.label)" class="w-full flex items-center justify-between px-4 py-2 hover:text-khaki font-semibold transition text-left cursor-pointer">
              <span>{{ link.label }}</span>
              <!-- Icon Panah Dropdown -->
              <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180 text-khaki': activeDropdown === link.label }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Sub-Menu Accordion (Berita, Advokasi, Danus) -->
            <ul v-show="activeDropdown === link.label" class="flex flex-col gap-1 pl-6 mt-1 border-l-2 border-khaki/30 ml-4">
              <li v-for="item in link.dropdown" :key="item.label">
                <RouterLink :to="item.href" class="block px-3 py-2 text-sm text-holy/80 hover:text-khaki transition font-medium" @click="onClose">
                  {{ item.label }}
                </RouterLink>
              </li>
            </ul>
          </template>

          <!-- Jika Link Biasa (Beranda, Karya Mahasiswa, Profil, dll.) -->
          <template v-else>
            <RouterLink :to="link.href" class="block hover:text-khaki px-4 py-2 transition font-semibold" @click="onClose">
              {{ link.label }}
            </RouterLink>
          </template>
        </li>
      </ul>
    </aside>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
