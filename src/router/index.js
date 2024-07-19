import { createRouter, createWebHistory } from 'vue-router';
import Product_View from '@/views/Product_View.vue'
import Product_list from '@/views/Product_list.vue'
import Add_To_Cart from '@/views/Add_To_Cart.vue'
const routes = [
  {
    path: "/",
    component: Product_View,
  },
  {
    path: "/add",
    component: Product_list,
  },
  {
    path: "/addtocart",
    component: Add_To_Cart,
    
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
