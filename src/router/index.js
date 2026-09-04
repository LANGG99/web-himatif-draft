import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Profile from "../pages/Profile.vue";
import UnderConstruction from "../pages/UnderConstruction.vue";
import About from "../pages/About.vue";
import Danus from "../pages/Danus.vue";
import Advokasi from "../pages/Advokasi.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/About", component: About },
  { path: "/Profile", component: Profile },
  { path: "/Danus", component: Danus },
  { path: "/Advo", component: Advokasi },
  { path: "/under-construction", component: UnderConstruction },

  // Optional: fallback untuk semua rute yang tidak dikenali
  { path: "/:pathMatch(.*)*", name: "NotFound", component: UnderConstruction },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});
