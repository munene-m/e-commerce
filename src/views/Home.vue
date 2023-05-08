<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Books from '../components/Items.vue'
import SearchIcon from '../components/icons/SearchIcon.vue'
import CategoryItem from '../components/CategoryItem.vue'
import sneakers from '../assets/sneakers.jpg'
import clothes from '../assets/clothes.jpg'
import tech from '../assets/tech.jpg'
import furniture from '../assets/furniture.jpg'
import kitchenware from '../assets/kitchenware.jpg'


const router = useRouter()
const searchItem = ref('')
const handleClick = () => {
  router.push({path: "/categories"})
}
const categories = [
  {
    id: 1,
    name: "Sneakers",
    imageSrc: sneakers
  },
  {
    id: 2,
    name: "Clothes",
    imageSrc: clothes
  },
  {
    id: 3,
    name: "Tech",
    imageSrc: tech
  },
  {
    id: 4,
    name: "Furniture",
    imageSrc: furniture
  },
  {
    id: 5,
    name: "Kitchenware",
    imageSrc: kitchenware
  }
]
</script>

<template>
  <div  class="md:w-3/4 w-11/12 m-auto my-24 flex items-center flex-col font-open-sans">
    <img class="absolute w-inherit rounded-3xl h-3/4 md:h-2/3 bg-cover" src="../assets/shopping-cart.jpg" alt=""/>
    <div class="relative flex items-start backdrop-blur-sm backdrop-filter justify-center flex-col mt-14 md:mt-24 lg:mt-16 md:mx-4 mx-2 rounded p-2">
      <h1 class="text-emerald-800 text-5xl md:text-5xl font-bold md:w-5/6">
        Shopping and department store
      </h1>
      <p class="text-emerald-800 text-xl md:text-2xl font-bold md:w-3/4 mt-7">
        Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
      </p>
      <button @click="handleClick()" class="text-white rounded-xl px-4 py-2 md:px-4 md:py-2 md:text-base flex items-center mt-3 md:mt-8 bg-emerald-800 outline-transparent">
        Explore now
      </button>
    </div>
  </div>
  <div class="relative pt-48 xl:pt-56" data-aos="fade-down" data-aos-duration="1000">
    <h2 class="text-emerald-800 font-bold text-xl text-center sm:text-center md:text-start sm:ml-auto md:ml-24">
      Shop from our categories
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:mx-4 md:gap-2 gap-4 mt-5 sm:mt-10 place-items-center">
      <category-item
        v-for="category in categories"
        :key="category.id"
        :categoryName="category.name"
        :imageSrc="category.imageSrc"
        :categoryPath="`/categories/${category.name}`"
      />
    </div>
  </div>
  <hr class="mt-7" />
  <h3
    class="my-5 md:my-5 text-emerald-800 font-bold text-xl text-center md:text-start md:ml-10 font-open-sans"
  >
    Products for you
  </h3>
  <div class="flex w-5/6 md:w-96 m-auto my-8 md:items-center justify-center md:px-4">
    <input
      v-model="searchItem"
      class="font-open-sans w-96 h-10 px-6 md:w-inherit lg:w-72 outline-transparent text-gray-900 bg-slate-300 rounded-l-lg text-sm"
      type="search"
      name="search"
      placeholder="Search items"
      autocomplete="off"
    />
    <SearchIcon
      class="relative bg-emerald-800 text-white border border-slate-700 right-0 left-0 w-7  rounded-r-lg py-1 h-10"
    />
  </div>
  <Books :search-item="searchItem" />
</template>
