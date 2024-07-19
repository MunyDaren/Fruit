<template>
  <div class="w-full relative">
    <!-- Navigation Bar -->
    <div class="w-full h-12 bg-black flex justify-center items-center">
      <div>
        <!-- Logo -->
      </div>
      <div
        class="w-full md:w-1/2 flex justify-between items-center px-4 font-semibold text-white text-xs sm:text-sm md:text-base lg:text-xl"
      >
        <a href="">Home</a>

        <el-dropdown>
          <template #default>
            <span class="el-dropdown-link"> Category </span>
          </template>
          <template #dropdown>
            <el-dropdown-menu class="custom-dropdown-menu">
              <el-dropdown-item @click="filterCategory('Fruit')"
                >Fruit <span class="text-gray-500 text-sm"></span
              ></el-dropdown-item>
              <el-dropdown-item @click="filterCategory('Vegetable')"
                >Vegetable <span class="text-gray-500 text-sm"></span
              ></el-dropdown-item>
              <el-dropdown-item @click="filterCategory('Nut')"
                >Nut <span class="text-gray-500 text-sm"></span
              ></el-dropdown-item>
              <el-dropdown-item @click="filterCategory('All')"
                >All <span class="text-gray-500 text-sm"></span
              ></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <router-link to="/add">Add</router-link>
        <button  @click="handleDrawer">
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
<section class="py-20">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center text-green-700">Featured Products</h2>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         
         
         
        </div>
      </div>
    </section>

    <!-- Product Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 mx-4 p-4"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
        @click="showProductModal(product)"
      >
        <img
          :src="getImageUrl(product.image)"
          alt="Product Image"
          class="w-full h-48 object-cover"
          style="max-height: 200px"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">
            {{ product.name }}
          </h3>
          <p class="text-sm text-gray-600 mb-2">{{ product.category.name }}</p>
          <p class="text-sm text-gray-600 mb-2">{{ product.description }}</p>
          <p class="text-base font-bold text-gray-700">
            {{ product.price + "$" }}
          </p>

          <button
            class="bg-green-500 text-white rounded p-1 align-center"
            @click="addToCart(product.id)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
        <section class="py-20">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold text-green-700">Meet the Team</h2>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
         
          
          <div class="bg-white shadow-lg rounded-lg p-6">
            <img class="w-32 h-32 mx-auto rounded-full" src="https://prod-eurasian-res.popmart.com/default/1_NI0jRK7JpO_1200x1200.jpg?x-oss-process=image/format,webp" alt="Team Member">
            <h3 class="mt-4 text-xl font-bold text-green-700">Daren</h3>
            <p class="mt-2 text-green-600">Writer</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6">
            <img class="w-32 h-32 mx-auto rounded-full" src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lts0jdbljxn1a3" alt="Team Member">
            <h3 class="mt-4 text-xl font-bold text-green-700">Siey</h3>
            <p class="mt-2 text-green-600">Designer</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6">
            <img class="w-32 h-32 mx-auto rounded-full" src="https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FAe5imIQC_eQoEUfbFq8xlQ%2Fmain.jpg&width=743" alt="Team Member">
            <h3 class="mt-4 text-xl font-bold text-green-700">Tra</h3>
            <p class="mt-2 text-green-600">Backend</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6">
            <img class="w-32 h-32 mx-auto rounded-full" src="https://img4.dhresource.com/webp/m/0x0/f3/albu/km/g/12/409a2441-c55b-4cce-93ad-4e8bd124b93d.jpg" alt="Team Member">
            <h3 class="mt-4 text-xl font-bold text-green-700">GPT</h3>
            <p class="mt-2 text-green-600">Suplyer</p>
          </div>
        </div>
      </div>
    </section>

     <section class="bg-green-100 py-20">
      <div class="container mx-auto">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-green-700">Our Values</h2>
        </div>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 class="text-2xl font-bold text-green-700">Quality</h3>
            <p class="mt-4 text-green-600">We are committed to offering only the highest quality fruits, ensuring freshness and taste in every bite.</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 class="text-2xl font-bold text-green-700">Sustainability</h3>
            <p class="mt-4 text-green-600">Our farming practices are environmentally friendly, promoting sustainability and supporting local farmers.</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 class="text-2xl font-bold text-green-700">Customer Satisfaction</h3>
            <p class="mt-4 text-green-600">Your satisfaction is our priority. We strive to provide excellent service and the best fruit shopping experience.</p>
          </div>
        </div>
      </div>
    </section>


    <div
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
      v-if="selectedProduct !== null"
      @click.self="closeProductModal"
    >
      <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {{ selectedProduct.name }}
        </h2>
        <div class="flex justify-between mb-4">
          <p class="text-base font-bold text-gray-700">
            {{ selectedProduct.price + "$" }}
          </p>
          <p class="text-sm text-gray-600">
            {{ selectedProduct.category.name }}
          </p>
        </div>
        <img
          :src="getImageUrl(selectedProduct.image)"
          alt="Product Image"
          class="w-full h-auto mb-4"
        />
        <p class="text-sm text-gray-700">{{ selectedProduct.description }}</p>
        <div class="mt-4 flex justify-end">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            @click="closeProductModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
     
  <el-drawer v-model="drawer" :with-header="false">
  <component :is="currentComponet" ></component>
  </el-drawer>
  </div>
</template>

<script>
import Add_To_Cart from "./Add_To_Cart.vue";
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";

export default {
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,Add_To_Cart
  },
  setup() {
    const currentComponet = ref('')
    const drawer = ref(false)

    const products = ref([]);
    const selectedCategory = ref("All");
    const selectedProduct = ref(null);

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        products.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Function to get full image URL
    const getImageUrl = (imageName) => {
      return `http://127.0.0.1:8000/storage/${imageName}`;
    };

    // Filter products by selected category
    const filteredProducts = computed(() => {
      if (selectedCategory.value === "All") {
        return products.value;
      }
      return products.value.filter(
        (product) => product.category.name === selectedCategory.value
      );
    });

    // Set selected category
    const filterCategory = (category) => {
      selectedCategory.value = category;
    };

    // Show product modal
    const showProductModal = (product) => {
      selectedProduct.value = product;
    };

    // Close product modal
    const closeProductModal = () => {
      selectedProduct.value = null;
    };
    const addToCart = async (productId, quantity = 1) => {
      try {
        // Send POST request to add product to the cart
        const response = await axios.post(
          "http://localhost:8000/api/add-to-cart",
          {
            product_id: productId,
            quantity: quantity,
          }
        );
        
        // Check if the response indicates success
        if (response.status === 200) {
          console.log('====================================');
          console.log("Product added to cart successfully!");
          console.log('====================================');
          fetchCartItems();
          
        } else {
          console.error("Failed to add product to cart:", response.statusText);
          alert("Failed to add product to cart. Please try again.");
        }
      } catch (error) {
        // Handle error and provide feedback
        console.error("Error adding product to cart:", error);
      }
    };
   const  cartItems = ref([])
  const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/cart');
    cartItems.value = response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};
    // Fetch products on component mount
    onMounted(() => {
      fetchProducts();
      addToCart();
      fetchCartItems()
    });
    const handleDrawer = () => {
      drawer.value = true;
      currentComponet.value = 'Add_To_Cart'
    }
    return {
      products,
      filteredProducts,
      getImageUrl,
      filterCategory,
      showProductModal,
      closeProductModal,
      selectedProduct,
      addToCart,
      drawer,handleDrawer, currentComponet
    };
  },
};
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.custom-dropdown-menu {
  font-size: 20px;
  cursor: pointer;
  background-color: rgba(196, 196, 196, 0.783);
  width: 140px;
  text-align: center;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

/* Modal styles */
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
