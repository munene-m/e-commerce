<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()

function addToCart(item) {
  cartStore.addToCart(item)
  console.log(cartStore.cart.cartItems)
}

const books = ref([
  {
    id: 1,
    name: 'The Great Gatsby',
    description: 'A novel by F. Scott Fitzgerald',
    price: 10.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 2,
    name: 'To Kill a Mockingbird',
    description: 'A novel by Harper Lee',
    price: 12.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 3,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 4,
    name: 'The Great Gatsby',
    description: 'A novel by F. Scott Fitzgerald',
    price: 10.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 5,
    name: 'To Kill a Mockingbird',
    description: 'A novel by Harper Lee',
    price: 12.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 6,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 7,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 8,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 9,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 10,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  },
  {
    id: 11,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150',
    quantity: 0
  }
])
const props = defineProps({
  searchItem: String
})
const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    return book.name.toLowerCase().includes(props.searchItem.toLowerCase())
  })
})
const booksFound = computed(() => {
  return filteredBooks.value.length > 0
})
</script>

<template>
  <div
    v-if="booksFound"
    class="flex overflow-auto pb-4 whitespace-nowrap items-end sm:grid sm:gap-5 sm:grid-cols-2 md:grid-cols-4 sm:place-items-center font-open-sans"
    style="
      ::-webkit-scrollbar {
        display: none;
      }
    "
  >
    <div
      v-for="book in filteredBooks"
      :key="book.id"
      class="p-4 rounded-lg sm:w-5/6 w-full h-full flex flex-col items-start mr-6"
    >
      <img class="w-full h-full rounded object-cover" :src="book.image" :alt="book.name" />
      <h2 class="mt-2 font-bold text-emerald-800">{{ book.name }}</h2>
      <p class="text-sm">{{ book.description }}</p>
      <p class="text-xs sm:text-sm">Price: {{ book.price }}</p>
      <button
        v-if="!authStore.admin"
        @click="addToCart(book)"
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
  <div v-else>
    <p class="text-emerald-800 text-center">The book you have searched is unavailable.</p>
  </div>
</template>
