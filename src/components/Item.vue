<script setup>
import {ref, onMounted} from "vue"
import axios from "axios"
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const productDetails = ref([])

onMounted(() => {
axios.get(`https://m-duka.onrender.com/product/${props.id}`)
.then(response => {
    console.log(response.data)
    productDetails.value.push(response.data)
}).catch(err => console.log(err))
})
</script>

<template>

    <main class="relative font-open-sans mt-20">
        <div v-for="product in productDetails" :key="product._id" class="p-4 rounded-lg sm:w-5/6 w-full h-full flex flex-col items-start mr-6">
      <h2 class="border border-slate-400 pr-2 mb-1 text-xs rounded-xl bg-slate-100 text-slate-600 flex flex-row items-center"><TagIcon class="h-4"/>{{ product.category }} </h2>
        <img :src="product.image" class="w-full h-full rounded object-cover" alt="" />
        <h2 class="mt-2 font-bold text-emerald-800">{{ product.name }}</h2>
        <p class="text-sm">{{ product.description }}</p>
        <p class="text-xs sm:text-sm">{{ product.price }}</p>
        <button
          v-if="!authStore.admin"
          @click="addToCart(authStore.username, product._id, product.name, product.quantity, product.image, product.price)"
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
    </main>
</template>