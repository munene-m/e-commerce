<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <div class="">
      <Navbar/>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
