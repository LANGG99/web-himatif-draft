import { createApp } from "vue";
import App from "./App.vue";
import "./assets/globals.css";
import router from "./router";
import { MotionPlugin } from '@vueuse/motion';



createApp(App).use(MotionPlugin).use(router).mount("#app");