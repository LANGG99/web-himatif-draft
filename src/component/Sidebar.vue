<script setup>
import { RouterLink } from "vue-router";
defineProps(["open", "onClose", "navLinks"]);
</script>

<template>
  <transition name="slide">
    <aside v-if="open" class="fixed top-0 right-0 w-64 h-full bg-errie text-holy z-40 flex flex-col shadow-lg">
      <!-- Header -->
      <div class="flex flex-col justify-between p-4 bg-cosmos">
        <span class="font-bold text-xl uppercase">Himatif Untara</span>
        <small class="text-sm font-semibold">Kabinet Arthasa</small>
      </div>

      <!-- Navigation Links -->
      <ul class="flex flex-col gap-2 p-4">
        <li v-for="link in navLinks" :key="link.label" class="list-none">
          <RouterLink :to="link.href" class="block hover:text-khaki px-4 py-2 transition font-semibold" @click="onClose">
            {{ link.label }}
          </RouterLink>
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
