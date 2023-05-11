<script setup>
import { onMounted, computed, ref, watchEffect, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import DeleteIcon from '../components/icons/DeleteIcon.vue'
import PlusIcon from '../components/icons/PlusIcon.vue'
import MinusIcon from '../components/icons/MinusIcon.vue'
import ArrowIcon from '../components/icons/ArrowIcon.vue'
import axios from 'axios'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

// let cartItems = computed(() => cartStore.cart.cartItems)
const cartItems = ref([])

const cartItem = ref([])


async function getCartItems() {
  await axios.get(`https://m-duka.onrender.com/cart/${authStore.username}`, {
    headers: {
      Authorization: `Bearer ${authStore.user}`
    }
  }).then(response => {
    cartItems.value.push(response.data)
    console.log(response.data);
  }).catch(err => console.log(err))
}

function removeItem(id) {
  cartStore.removeFromCart(id)
}

async function increase(id, quantity) {
    // const item = cartItems.value.flatMap(items => items).find(item => item._id === id)
    // quantity ++
    // await axios.put(`https://m-duka.onrender.com/cart/update/${id}`, {quantity}, {
    //   headers: { Authorization: `Bearer ${authStore.user}`}
    // }).then((response) => {
    //   item.quantity = response.data.quantity
    // })
    // .catch(err => console.log(err))
    cartStore.increaseQuantity(id, quantity)

}
async function decrease(id, quantity) {
    // const item = cartItems.value.flatMap(items => items).find(item => item._id === id)
    // quantity--
    // await axios.put(`https://m-duka.onrender.com/cart/update/${id}`, {quantity}, {
    //   headers: { Authorization: `Bearer ${authStore.user}`}
    // }).then((response) => {
    //   item.quantity = response.data.quantity
    // })
    // .catch(err => console.log(err))
    // if(quantity > 0){

    // }
    cartStore.decreaseQuantity(id, quantity)
}


const isCart = computed(() => {
  return cartItems.value.length > 0
})
const redirectToCheckout = (id) => {
  router.push("/checkout")
}
onMounted(() => {
  getCartItems()
  console.log(cartItems.value)
  cartItems
  cartStore.cart.cartItems.length
  cartItem.value = JSON.parse(localStorage.getItem("cart"))

})
onUpdated(() => {
  cartItem.value = JSON.parse(localStorage.getItem("cart"))
})

</script>

<template>
  <!-- <main v-if="isCart" class="font-open-sans relative mt-28 mb-20">

  <div v-for="item in cartItem" :key="item._id"
  class="bg-slate-200 rounded p-2 m-auto mb-3 w-4/5 sm:w-2/3 md:w-1/2 grid grid-cols-1 sm:grid-cols-2 place-items-evenly"
  >
    <img class="w-full sm:w-full md:w-40" :src="item.image" alt="" />
      <div class="flex flex-col items-start justify-between  sm:items-end sm:justify-between">
        <h1 class="text-emerald-800 font-bold text-lg text-center">{{ item.name }}</h1>
        <p class="font-bold sm:text-sm">{{ item.description }}</p>
        <p>Price: {{ item.price }}</p>
        <p class="flex items-center">
          Quantity:
          <MinusIcon @click="decrease(item._id, item.quantity)" class="cursor-pointer mx-1 bg-slate-400 rounded-full" />
          {{ item.quantity }}
          <PlusIcon @click="increase(item._id, item.quantity)" class="cursor-pointer mx-1 bg-slate-400 rounded-full" />
        </p>
        <button @click="removeItem(item._id)" class="bg-red-600 text-white rounded-lg border-2 border-red-600 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500 flex items-center">
          Remove <DeleteIcon />
        </button>
      </div>
  </div>
  <button v-if="!isCart" @click="redirectToCheckout(item._id)" class="bg-emerald-800 m-auto text-white rounded-lg border-2 border-emerald-800  px-3 py-2 mt-9 text-sm cursor-pointer hover:scale-95 transition duration-500 flex items-center justify-center">Proceed to checkout <ArrowIcon/></button>
  </main>
  <div v-else>
    <p class="font-open-sans text-emerald-800 text-center mt-24 h-screen">Cart is empty</p>
  </div> -->
 <main v-if="isCart" class="font-open-sans relative mt-28 mb-20">
    <div v-for="(cartItem,index) in cartItems" :index="index">
      <div class="bg-slate-200 rounded p-2 m-auto mb-3 w-4/5 sm:w-2/3 md:w-1/2 grid grid-cols-1 sm:grid-cols-2 place-items-evenly"
      v-for="item in cartItem" :key="item._id">
      <img class="w-full sm:w-full md:w-40" :src="item.image" alt="" />
      <div class="flex flex-col items-start justify-between  sm:items-end sm:justify-between">
        <h1 class="text-emerald-800 font-bold text-lg text-center">{{ item.name }}</h1>
        <p class="font-bold sm:text-sm">{{ item.description }}</p>
        <p>Price: {{ item.price }}</p>
        <p class="flex items-center">
          Quantity:
          <MinusIcon @click="decrease(item._id, item.quantity)" class="cursor-pointer mx-1 bg-slate-400 rounded-full" />
          {{ item.quantity }}
          <PlusIcon @click="increase(item._id, item.quantity)" class="cursor-pointer mx-1 bg-slate-400 rounded-full" />
        </p>
        <button @click="removeItem(item._id)" class="bg-red-600 text-white rounded-lg border-2 border-red-600 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500 flex items-center">
          Remove <DeleteIcon />
        </button>
      </div>
    </div>
</div>
  <button v-if="!isCart" @click="redirectToCheckout(item._id)" class="bg-emerald-800 m-auto text-white rounded-lg border-2 border-emerald-800  px-3 py-2 mt-9 text-sm cursor-pointer hover:scale-95 transition duration-500 flex items-center justify-center">Proceed to checkout <ArrowIcon/></button>

  </main>
  <div v-else>
    <p class="font-open-sans text-emerald-800 text-center mt-24 h-screen">Cart is empty</p>
  </div> 
</template>

<style></style>
