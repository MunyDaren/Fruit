<template>
  <div class="w-full p-4">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>
    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="bg-white rounded-lg shadow-md overflow-hidden mb-4"
      >
        <div class="p-4 flex items-center">
          <img
            :src="getImageUrl(item.product.image)"
            alt="Product Image"
            class="w-24 h-24 object-cover mr-4"
          />
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ item.product.name }}
            </h3>
            <p class="text-sm text-gray-600">{{ item.product.description }}</p>
            <p class="text-base font-bold text-gray-700">
              {{ item.product.price + "$" }}
            </p>
            <div class="flex items-center mt-2">
              <button
                @click="changeQuantity(item.id, item.quantity - 1)"
                class="px-2 py-1 bg-red-500 text-white rounded"
                :disabled="item.quantity <= 1"
              >
                -
              </button>
              <span class="mx-4 text-lg">{{ item.quantity }}</span>
              <button
                @click="changeQuantity(item.id, item.quantity + 1)"
                class="px-2 py-1 bg-green-500 text-white rounded"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-right font-bold flex items-center justify-between">
        <el-button @click="clearCart" type="danger">Clear Carts</el-button>

        Total: {{ totalAmount + "$" }}
      </div>
       <div class="text-right font-bold flex items-center justify-between mt-4">
        <el-button class="!w-full" @click="submitOrder" type="primary"> Confirm Order</el-button>

      
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const cartItems = ref([]);

    // Fetch cart data from API
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cart");
        cartItems.value = response.data;
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    // Function to get full image URL
    const getImageUrl = (imageName) => {
      return `http://127.0.0.1:8000/storage/${imageName}`;
    };

    const changeQuantity = async (cartItemId, newQuantity) => {
      if (newQuantity < 1) return; // Prevent negative quantity

      try {
        await axios.put(`http://localhost:8000/api/update-cart/${cartItemId}`, {
          quantity: newQuantity,
        });
        fetchCartItems();

        // Refresh the cart items after updating quantity
      } catch (error) {
        console.error("Error updating cart item quantity:", error);
        alert("Failed to update quantity.");
      }
    };
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cart");
        cartItems.value = response.data;
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    // Add more items to the cart
    const addMoreItems = async () => {
      // Example functionality for adding more items
      // You might need to replace this with actual logic
      try {
        const response = await axios.get("http://localhost:8000/api/cart");
        cartItems.value = response.data;
        // Update cart items after adding more
        await fetchCart();
      } catch (error) {
        console.error("Error adding more items:", error);
      }
    };

    // Calculate total amount
    const totalAmount = computed(() => {
      return cartItems.value.reduce(
        (total, item) => total + parseFloat(item.product.price) * item.quantity,
        0
      );
    });
    const removeFromCart = async (cartItemId) => {
      try {
        await axios.delete(
          `http://localhost:8000/api/remove-from-cart/${cartItemId}`
        );

        fetchCartItems();

        // Refresh the cart items after removal
      } catch (error) {
        console.error("Error removing product from cart:", error);
        alert("Failed to remove product from cart.");
      }
    };

    // Using Axios
    const clearCart = async () => {
      try {
        await axios.delete("http://localhost:8000/api/clear-cart");
        fetchCartItems();
      } catch (error) {
        console.error("Error clearing the cart:", error);
        alert("Failed to clear the cart.");
      }
        };

const submitOrder = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/confirm-order', {
      total_amount: totalAmount.value,
    });
    console.log(response);
  } catch (error) {
   console.log('====================================');
   console.log(error);
   console.log('====================================');
  }
};
        onMounted(fetchCart);
    
    return {
      cartItems,
      getImageUrl,
      totalAmount,
      changeQuantity,
      addMoreItems,
      removeFromCart,
        clearCart,
      submitOrder
    };
  },
};
</script>

<style scoped>
/* Add styles specific to Cart page here */
</style>
