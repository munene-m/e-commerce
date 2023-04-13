<script setup>
import MenuIcon from '../components/icons/MenuIcon.vue'
import SearchIcon from './icons/SearchIcon.vue';
import CartIcon from './icons/CartIcon.vue';
import PersonIcon from './icons/PersonIcon.vue';
import { ref } from 'vue';
  let showMenu = ref(false)
  function toggleNav() {
  return (showMenu.value = !showMenu.value);
  }
</script>

<template>
        <nav class="px-5 py-5 fixed top-0 left-0 right-0 z-10 md:flex md:justify-between md:items-center bg-slate-200 dark:text-gray-200">
        <div class="flex items-center justify-between">
          <RouterLink to="/" class="text-xl flex items-center justify-center gap-1 font-bold text-emerald-800 md:text-2xl ">
            E-commerce
          </RouterLink>
          <!--Mobilemenu button-->
          <div @click="toggleNav" class="flex md:hidden">
            <button type="button" class="text-emerald-800 focus:outline-none focus:text-emerald-900 ">
              <MenuIcon />
            </button>
          </div>
        </div>
        <ul :class="showMenu ? 'flex' : 'hidden'" class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
            <div class="flex  md:items-center justify-start md:px-4">                
                <input class="w-72 h-8 px-6 outline-transparent text-gray-800 rounded-lg" type="search" name="search" placeholder="Search product" id="">
                <SearchIcon class="absolute  text-gray-800 w-5 m-1 py-1"/>
            </div>
          <li><RouterLink class="text-emerald-800 flex items-centers" to="/account"><PersonIcon/> Account</RouterLink></li>
          <li><RouterLink class="text-emerald-800 flex items-center" to="/cart"><CartIcon/> Cart</RouterLink></li>
        </ul>
      </nav>
</template>