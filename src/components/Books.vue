<script setup>
import { ref, reactive } from 'vue'

const books = ref([
  {
    id: 1,
    name: 'The Great Gatsby',
    description: 'A novel by F. Scott Fitzgerald',
    price: 10.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'To Kill a Mockingbird',
    description: 'A novel by Harper Lee',
    price: 12.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'The Great Gatsby',
    description: 'A novel by F. Scott Fitzgerald',
    price: 10.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    name: 'To Kill a Mockingbird',
    description: 'A novel by Harper Lee',
    price: 12.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 6,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 7,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 8,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150'
  },  {
    id: 9,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150'
  },  {
    id: 10,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150'
  },  {
    id: 11,
    name: '1984',
    description: 'A novel by George Orwell',
    price: 9.99,
    image: 'https://via.placeholder.com/150'
  }
])
</script>

<template>
    <h3 class="my-5 md:my-10 text-emerald-800 font-bold text-xl text-center md:text-start md:ml-10 font-open-sans">Books for you</h3>
  <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center font-open-sans">
    <div v-for="book in books" :key="book.id" class="p-4 rounded-lg sm:w-5/6 w-3/4 h-full flex flex-col items-start">
      <img class="w-full rounded" :src="book.image" :alt="book.name" />
      <h2 class="mt-2 font-bold text-emerald-800">{{ book.name }}</h2>
      <p>{{ book.description }}</p>
      <p>Price: {{ book.price }}</p>
      <button class=" bg-emerald-800 text-white rounded-3xl border-2 border-emerald-800 px-3 py-1 mt-2 text-xs cursor-pointer hover:bg-white hover:text-emerald-800 transition duration-500">Add to cart</button>
    </div>
  </div>
</template>
