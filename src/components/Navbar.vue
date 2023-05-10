<script setup>
import MenuIcon from '../components/icons/MenuIcon.vue'
import CartIcon from './icons/CartIcon.vue';
import PersonIcon from './icons/PersonIcon.vue';
import axios from 'axios';
import { useCartStore } from '../stores/cart';
import { onMounted, ref, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()

const cartStore = useCartStore()
const authStore = useAuthStore()

const logOut = () => {
  authStore.logout()
  router.push('/')
}
// watchEffect(() => {
//   if(!authStore.user){
//     router.push("/")
//   }
// })

  let showMenu = ref(false)
  function toggleNav() {
  return (showMenu.value = !showMenu.value);
  }
  const cartItems = ref([])
  const cartItemsLength = ref("")

  watchEffect(() => {
    if(cartItems.value > 0) {
      for (let i = 0; i < cartItems.value.length; i++) {
        cartItemsLength.value === cartItems.value.length
      }
    } else {
      cartItemsLength.value = 0
    }
  })
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
onMounted(() => {
  getCartItems()
  cartItems
})
</script>

<template>
        <nav class="px-5 py-5 fixed top-0 left-0 right-0 z-10 md:flex md:justify-between md:items-center bg-slate-200 bg-opacity-40 firefox:bg-opacity-90 dark:text-gray-200 backdrop-filter backdrop-blur-lg">
        <div class="flex items-center justify-between">
          <RouterLink to="/" class="text-xl flex items-center justify-center gap-1 font-bold text-emerald-800 md:text-2xl font-open-sans">
            M-duka
          </RouterLink>
          <!--Mobilemenu button-->
          <div @click="toggleNav" class="flex md:hidden">
            <button type="button" class="text-emerald-800 focus:outline-none focus:text-emerald-900 ">
              <MenuIcon />
            </button>
          </div>
        </div>
        <ul :class="showMenu ? 'flex' : 'hidden'" class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">

          <li><RouterLink class="text-emerald-800 font-open-sans" to="/categories">Categories</RouterLink></li>
          <li><RouterLink v-if="!authStore.user" class="text-emerald-800 flex items-center font-open-sans" to="/account"><PersonIcon/>Account</RouterLink></li>
          <li v-if="authStore.user" class="m-0"><button @click="logOut()" class="px-3 py-1 bg-emerald-800 text-white rounded-2xl">Log out</button></li>
          <li v-if="authStore.admin"><RouterLink class="text-emerald-800 font-open-sans" to="/admin">Admin page</RouterLink></li>
          <!-- <li v-for="(item, index) in cartItems" :index="index"> -->
          <li><RouterLink class="text-emerald-800 flex items-center font-open-sans" to="/cart"><CartIcon/><span class="pl-1 bg-emerald-800 text-white rounded-full w-4 h-4 fixed top-4 right-2 text-xs ">{{ cartItemsLength }}</span></RouterLink></li>
          
          <!-- </li> -->
        </ul>
      </nav>
</template>