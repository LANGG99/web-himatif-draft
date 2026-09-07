<script setup>
import Navigation from './component/Navigation.vue';
</script>

<template>
    <div id="mintifOverlay" class="mintif-overlay" aria-hidden="true"></div>
    <Navigation />
    <router-view />
</template>

<style>
/* Circle reveal Mintif — port dari pillow-fox (static/css/home.css).
   Background disamakan tema (errie). Overlay hidup global di sini
   supaya tidak ke-unmount pas pindah route (SPA). */
.mintif-overlay{
    position: fixed;
    inset: 0;
    background: #1C1F23;
    z-index: 9999;
    pointer-events: none;
    clip-path: circle(var(--r, 0px) at var(--ox, 50%) var(--oy, 50%));
    transition: clip-path .65s cubic-bezier(.65, 0, .35, 1);
    will-change: clip-path;
}
.mintif-overlay.no-transition{
    transition: none;
}
@media (prefers-reduced-motion: reduce){
    .mintif-overlay{ transition: none; will-change: auto; }
}
</style>