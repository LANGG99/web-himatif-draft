<script setup>
import Navigation from './component/Navigation.vue';
</script>

<template>
    <div id="mintifOverlay" class="mintif-overlay" aria-hidden="true"></div>
    <Navigation />
    <router-view />
</template>

<style>
/* Circle reveal Mintif — overlay lingkaran 100px yang di-scale GPU
   (compositor, tanpa repaint tiap frame). Jauh lebih mulus dari clip-path
   di HP kentang. Visual identik: lingkaran yang sama, titik yang sama.
   Background disamakan tema (errie). Overlay hidup global di sini
   supaya tidak ke-unmount pas pindah route (SPA).
   Nutup = --s: radius_tutup/50 | buka = --s: 0. */
.mintif-overlay{
    position: fixed;
    width: 100px;
    height: 100px;
    left: calc(var(--ox, 50vw) - 50px);
    top: calc(var(--oy, 50vh) - 50px);
    border-radius: 50%;
    background: #1C1F23;
    z-index: 9999;
    pointer-events: none;
    transform: scale(var(--s, 0));
    transition: transform .65s cubic-bezier(.65, 0, .35, 1);
    will-change: transform;
}
.mintif-overlay.no-transition{
    transition: none;
}
/* Pause animasi kompetitor (FAB float) selama circle jalan biar GPU fokus. */
html.mintif-anim .fab-float{ animation-play-state: paused; }
@media (prefers-reduced-motion: reduce){
    .mintif-overlay{ transition: none; will-change: auto; }
}
</style>