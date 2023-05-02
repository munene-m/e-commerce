<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import TagIcon from '../components/icons/TagIcon.vue'
const authStore = useAuthStore()
const categories = ['Clothes', 'Tech', 'Kitchenware', 'Furniture', 'Sneakers']

const products = ref([])


onMounted(() => {
    categories.forEach((category) => {
  axios
    .get(`http://localhost:5500/products/product/${category}`, {
      headers: {
        Authorization: `Bearer ${authStore.user}`
      }
    })
    .then((response) => {
      products.value.push(response.data)
    })
    .catch((err) => console.log(err))
})
})
</script>

<template>
    <main class=" relative font-open-sans mt-20">
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
      <h2 class="border border-slate-400 pr-2 mb-1 text-xs rounded-xl bg-slate-100 text-slate-600 flex flex-row items-center"><TagIcon class="h-4"/>{{ product.category }} </h2>
        <img :src="product.image" class="w-full h-full rounded object-cover" alt="" />
        <h2 class="mt-2 font-bold text-emerald-800">{{ product.name }}</h2>
        <p class="text-sm">{{ product.description }}</p>
        <p class="text-xs sm:text-sm">{{ product.price }}</p>
        <button
          v-if="!authStore.admin"
          @click="addToCart(product)"
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

</template>
