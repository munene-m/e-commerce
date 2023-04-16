<script setup>
import { onMounted, computed } from "vue";
import { useCartStore } from "../stores/cart"
import DeleteIcon from '../components/icons/DeleteIcon.vue'
import PlusIcon from '../components/icons/PlusIcon.vue'
import MinusIcon from '../components/icons/MinusIcon.vue'
const cartStore = useCartStore()

let cartItems = computed(() => cartStore.cart.cartItems)

function removeItem(id){
    cartStore.removeFromCart(id)
}

function increase(id){
 const item = cartStore.cart.cartItems.find(item => item.id === id)
 if (item) {
  cartStore.incrementQuantity(id)
  }
}
function decrease(id){
  const item = cartStore.cart.cartItems.find(item => item.id === id)
 if (item) {
    cartStore.decrementQuantity(id)
  }
}
onMounted(() => {
  console.log(cartItems.value);
})

const isCart = computed(() => {
  return cartItems.value.length > 0
})

</script>

<template>
    <main v-if="isCart" class="font-open-sans relative mt-28 h-screen">
        <div class="bg-slate-200 rounded p-2 m-auto mb-3 w-5/6 md:w-2/3 flex flex-col items-start justify-center" v-for="item in cartItems" :key="item.id">
            <h1 class="text-emerald-800 font-bold text-lg">{{ item.name }}</h1>
            <p>{{ item.description }}</p>
            <p>Price: {{ item.price }}</p>
          <p class="flex items-center">Quantity: <MinusIcon @click="decrease(item.id)" class="pointer mx-1 bg-slate-400 rounded-full"/> {{ item.quantity }} <PlusIcon @click="increase(item.id)" class=" pointer mx-1 bg-slate-400 rounded-full"/></p>
            <button @click="removeItem(item.id)" class="bg-emerald-800 text-white rounded-lg border-2 border-emerald-800 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500 flex items-center">Remove <DeleteIcon/></button>
        </div>
    </main>
    <div v-else>
      <p class="text-emerald-800 text-center mt-24 h-screen">Cart is empty</p>
    </div>
</template>

<style>

</style>
