<template>

    <form action="" @submit.prevent="reset" class="p-10 mt-20">
        <label for="email">Email address</label>
        <input class="p-2 border border-slate-500 rounded" v-model="email" type="email" placeholder="Enter your email here">
        <button type="submit">Reset</button>
    </form>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const email = ref("")
async function reset(){
    const response = await axios.post("https://m-duka.onrender.com/auth/reset",{
        email: email.value
    })
    console.log(response.data)
}
</script>