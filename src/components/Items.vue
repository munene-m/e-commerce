<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import axios from 'axios';

const cartStore = useCartStore()
const authStore = useAuthStore()

function addToCart(id, name, quantity, image, price) {

  cartStore.addToCart(id,name,image, price,quantity )
}

const items = ref([])

async function getProducts() {
  await axios.get("http://localhost:5500/products", {
    headers: {
      Authorization: `Bearer ${authStore.user}`
    }
  })
  .then(response => {
    items.value.push(response.data)
    console.log(response.data)
  }).catch(err => console.log(err))
}
onMounted(() => {
  getProducts()
})

const props = defineProps({
  searchItem: String
})
const filteredProducts = computed(() => {
  let result = []
  for (let i = 0; i < items.value.length; i++) {
    let innerArray = items.value[i]
    for (let j = 0; j < innerArray.length; j++) {
      let item = innerArray[j]
      if (item.name.toLowerCase().includes(props.searchItem.toLowerCase())) {
        result.push(item)
      }
    }
  }
  return result
})
const productsFound = computed(() => {
  return filteredProducts.value.length > 0
})
async function removeItem (id) {
  await axios.delete(`http://localhost:5500/products/delete/${id}`, {
      headers: { Authorization: `Bearer ${authStore.user}` }
    })
  .then(response => console.log(response.data))
  .catch(err => console.log(err))
}
async function editItem(id) {
  
}
</script>

<template>
  <div v-if="productsFound" class="flex overflow-auto pb-4 whitespace-nowrap items-end sm:grid sm:gap-5 sm:grid-cols-2 md:grid-cols-4 sm:place-items-center font-open-sans"
    style="::-webkit-scrollbar { display: none; }">
    <div v-for="product in filteredProducts" :key="product._id" class="p-4 rounded-lg sm:w-5/6 w-full h-full flex flex-col items-start mr-6">
      <img class="w-full h-full rounded object-cover" :src="product.image" :alt="product.name" />
      <h2 class="mt-2 font-bold text-emerald-800">{{ product.name }}</h2>
      <p class="text-sm">{{ product.description }}</p>
      <p class="text-xs sm:text-sm">Price: {{ product.price }}</p>
      <button v-if="!authStore.admin" @click="addToCart(product._id, product.name, product.quantity, product.image, product.price)"
        class="bg-emerald-800 text-white rounded-3xl border-2 border-emerald-800 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500">
        Add to cart
      </button>
      <div v-else>
        <button @click="editItem(product._id)" class="bg-emerald-800 text-white rounded-3xl border-2 border-emerald-800 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500">
          Edit
        </button>
        <button @click="removeItem(product._id)" class="bg-red-500 text-white rounded-3xl border-2 border-red-500 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500 mx-1">
          Remove
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-emerald-800 text-center">The item you have searched is unavailable.</p>
  </div>
</template>
