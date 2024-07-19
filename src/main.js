import { createApp } from 'vue';
import "./assets/app.css"; 
import App from './App.vue'
import router from './router'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
const app = createApp(App);
app.use(router).use(ElementPlus).mount("#app");
