<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
const authStore = useAuthStore()
const cartStore = useCartStore()

function addToCart(customer, id, name, quantity, image, price) {
  cartStore.addToCart(customer, id, name, quantity, image, price)
  // console.log(cartStore.cart.cartItems)
}
const props = defineProps({
  category: {
    type: String,
    required: true
  }
})
const products = ref([])
async function getProducts() {
  axios.get(`https://m-duka.onrender.com/products/item/${props.category}`)
    .then((response) => {
      // console.log(response.data)
      products.value.push(response.data)
    })
    .catch((err) => console.log(err))
}

onMounted(() => {
  getProducts()
})
const username = JSON.parse(localStorage.getItem('username'))

</script>

<template>
  <main class="relative mt-20 font-open-sans h-screen" v-if="products.length">
    <h2 class="font-bold text-emerald-800 text-xl text-center">{{ category }}</h2>
    <div
      v-for="(items, index) in products"
      :index="index"   
      class="flex overflow-auto pb-4 whitespace-nowrap items-end sm:grid sm:gap-5 sm:grid-cols-2 md:grid-cols-4 sm:place-items-center font-open-sans"
    >
      <div
        v-for="product in items"
        :key="product._id"
        class="p-4 rounded-lg sm:w-5/6 w-full h-full flex flex-col items-start mr-6"
      >
        <img :src="product.image" class="w-full h-full rounded object-cover" alt="" />
        <h2 class="mt-2 font-bold text-emerald-800">{{ product.name }}</h2>
        <p class="text-sm">{{ product.description }}</p>
        <p class="text-xs sm:text-sm">{{ product.price }}</p>
        <button
          v-if="!authStore.admin"
          @click="addToCart(username, product._id, product.name, product.image, product.price, product.quantity)"
          class="bg-emerald-800 text-white rounded-3xl border-2 border-emerald-800 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500"
        >
          Add to cart
        </button>
        <div v-else>
          <button
            class="bg-emerald-800 text-white rounded-3xl border-2 border-emerald-800 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500"
          >
            Edit
          </button>
          <button
            class="bg-red-500 text-white rounded-3xl border-2 border-red-500 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500 mx-1"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </main>
  <div class="relative mt-20 text-center flex items-center justify-center text-xl h-screen" v-else>There are no items in this category</div>
</template>
