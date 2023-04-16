<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const handle404 = () => {
    router.push('/')
}
</script>

<template>
  <div class="mt-24 text-center h-screen">
    <h1 class="font-bold text-emerald-800 text-xl mb-8">404 ERROR</h1>
    <p>This page does not exist. Kindly navigate to home</p>
    <button class="bg-emerald-800 text-white px-4 py-1 mt-20 rounded-lg" @click="handle404">Home</button>
  </div>
</template>
<!-- <style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
button {
  padding: 8px 16px;
  color: white;
  background-color: crimson;
  border: 2px solid crimson;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: center;
}
</style> -->
