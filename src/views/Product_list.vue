<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="form">
      <h2 class="form-title">Add / Update Product</h2>
      
      <div class="form-group">
        <label for="name" class="form-label">Name:</label>
        <input type="text" id="name" v-model="product.name" class="form-input" required>
      </div>
      
      <div class="form-group">
        <label for="description" class="form-label">Description:</label>
        <input type="text" id="description" v-model="product.description" class="form-input">
      </div>
      
      <div class="form-group">
        <label for="price" class="form-label">Price:</label>
        <input type="number" id="price" v-model.number="product.price" class="form-input" required>
      </div>
      
      <div class="form-group">
        <label for="image" class="form-label">Image:</label>
        <input type="file" id="image" accept="image/*" @change="onFileChange" class="form-input">
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Selected Image">
        </div>
        <div v-if="imageError" class="error-message">{{ imageError }}</div>
      </div>
      
      <div class="form-group">
        <label for="category" class="form-label">Category:</label>
        <select id="category" v-model="product.category_id" class="form-input">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      
      <div class="form-buttons">
        <button type="button" @click="goBack" class="form-button">Back</button>
        <button type="button" @click="resetForm" class="form-button">Clear Form</button>
        <button type="submit" v-if="!isUpdating" class="form-button">Add Product</button>
        <button type="button" v-else @click="submitForm" class="form-button">Update Product</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const product = reactive({
      name: '',
      description: '',
      price: null,
      image: null,
      category_id: null,
    });

    const categories = ref([]);
    const isUpdating = ref(false);
    let productIdToUpdate = null;
    const imagePreview = ref(null);
    const imageError = ref('');

    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories');
        categories.value = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Function to handle file input change
    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Client-side validation for image type
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(file.type)) {
          imageError.value = 'Please select a valid image file (jpeg, png, jpg, gif, svg).';
          return;
        }

        // Clear previous errors
        imageError.value = '';

        // Display image preview
        const reader = new FileReader();
        reader.onload = () => {
          imagePreview.value = reader.result;
          product.image = file; // Save file object for submission
        };
        reader.readAsDataURL(file);
      }
    };

    // Function to submit form (add or update product)
    const submitForm = async () => {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('image', product.image);
      formData.append('category_id', product.category_id);

      try {
        if (isUpdating.value) {
          await axios.put(`http://127.0.0.1:8000/api/products/${productIdToUpdate}`, formData);
          alert('Product updated successfully!');
        } else {
          await axios.post('http://127.0.0.1:8000/api/products', formData);
          alert('Product added successfully!');
        }
        resetForm();
      } catch (error) {
        if (error.response) {
          console.error('Server Error:', error.response.data);
          alert('Server Error: ' + error.response.data.message);
        } else if (error.request) {
          console.error('Request Error:', error.request);
          alert('Request Error: No response from server');
        } else {
          console.error('Error:', error.message);
          alert('Error: ' + error.message);
        }
      }
    };

    // Function to update product (for editing)
    const updateProduct = async () => {
      if (productIdToUpdate) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/products/${productIdToUpdate}`);
          const { id, name, description, price, category_id } = response.data;
          console.log(id);
          product.name = name;
          product.description = description;
          product.price = price;
          product.category_id = category_id;
          isUpdating.value = true;
        } catch (error) {
          console.error('Error fetching product details:', error);
          alert('Error fetching product details.');
        }
      }
    };

    // Function to reset form
    const resetForm = () => {
      product.name = '';
      product.description = '';
      product.price = null;
      product.image = null;
      product.category_id = null;
      isUpdating.value = false;
      productIdToUpdate = null;
      imagePreview.value = null;
      imageError.value = '';
    };

    // Function to navigate back
    const goBack = () => {
      history.back();
    };

    // Fetch categories on component mount
    onMounted(fetchCategories);

    return {
      product,
      categories,
      isUpdating,
      submitForm,
      updateProduct,
      resetForm,
      onFileChange,
      imagePreview,
      imageError,
      goBack,
    };
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-input[type="file"] {
  padding: 3px;
}

.image-preview {
  margin-top: 10px;
}

.image-preview img {
  max-width: 100%;
  border-radius: 5px;
}

.error-message {
  color: red;
  font-size: 14px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.form-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.form-button:hover {
  background: #0056b3;
}

.form-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
