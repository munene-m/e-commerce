<script setup>
import { ref } from 'vue'
import Books from '../components/Books.vue'
import SearchIcon from '../components/icons/SearchIcon.vue'

const searchItem = ref('')
</script>

<template>

  <div class="md:w-3/4 w-11/12 m-auto my-24 flex items-center flex-col font-open-sans">
    <img
      class="absolute w-inherit rounded-3xl h-3/4 md:h-2/3 bg-cover"
      src="../assets/shopping-cart.jpg"
      alt=""
    />
    <div class="relative flex items-start justify-center flex-col mt-14 md:mt-24 lg:mt-16 md:mx-4 mx-2 rounded p-2">
      <h1 class="text-emerald-800 text-5xl md:text-5xl font-bold md:w-5/6">Shopping and department store</h1>
      <p class="text-emerald-800 text-xl md:text-2xl font-bold md:w-3/4 mt-7">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
      </p>
      <button class="text-white rounded-xl px-4 py-2 md:px-4 md:py-2 md:text-base flex items-center mt-3 md:mt-8 bg-emerald-800 outline-transparent">
        Explore now
      </button>
    </div>
  </div>
  <div class="relative pt-48  xl:pt-56">
    <h2
      class="text-emerald-800 font-bold text-xl text-center sm:text-center md:text-start sm:ml-auto md:ml-24"
    >
      Shop from our categories
    </h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:mx-4 md:gap-2 gap-4 mt-5 sm:mt-10 place-items-center"
    >
      <div class="w-48 relative">
        <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/sneakers.jpg" alt=""/>
        <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-slate-500 text-lg font-bold">
          Sneakers
        </h3>
      </div>
      <div class="w-48 relative">
        <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/clothes.jpg" alt=""/>
        <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">
          Clothes
        </h3>
      </div>
      <div class="w-48 relative">
        <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/tech.jpg" alt=""/>
        <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">
          Tech
        </h3>
      </div>
      <div class="w-48 relative">
        <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/furniture.jpg" alt=""/>
        <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">
          Furniture
        </h3>
      </div>
      <div class="w-48 relative">
        <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/kitchenware.jpg" alt=""/>
        <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">
          Kitchenware
        </h3>
      </div>
    </div>
  </div>
  <hr class="mt-7" />
  <h3 class="my-5 md:my-5 text-emerald-800 font-bold text-xl text-center md:text-start md:ml-10 font-open-sans">Products for you</h3>
  <div class="flex w-5/6 md:w-96 m-auto my-8 md:items-center justify-center md:px-4">
    <input v-model="searchItem" class="font-open-sans w-96 h-8 px-6 md:w-inherit lg:w-72 outline-transparent text-gray-900 bg-slate-300 rounded-l-lg text-sm"
      type="search" name="search" placeholder="Search books" autocomplete="off" />
    <SearchIcon class="relative bg-emerald-800 text-white border border-slate-700 right-0 left-0 w-7 rounded-r-lg py-1 h-8"/>
  </div>
  <Books :search-item="searchItem" />
</template>
