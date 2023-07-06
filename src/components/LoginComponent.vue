<script setup>
import { reactive} from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

const authStore = useAuthStore()
const router = useRouter()


const formData = reactive({
  email: '',
  password: '',
  emailError: '',
  passwordError: ''
})

const handleSubmit = async () => {
  formData.password === ''
    ? (formData.passwordError = 'Please enter your password')
    : (formData.passwordError = '')

  formData.email === ''
    ? (formData.emailError = 'Please enter your email')
    : (formData.emailError = '')
  try {
    const response = await axios.post('https://m-duka.onrender.com/auth/login', {
      email: formData.email,
      password: formData.password
    })
    console.log(response.data)

    localStorage.setItem('token', JSON.stringify(response.data.token))
    localStorage.setItem('username', JSON.stringify(response.data.username))
    response.data.email === 'admin@email.com'
      ? localStorage.setItem('adminEmail', response.data.email)
      : localStorage.removeItem('adminEmail')
    
    router.push({name: "cart"})
    
    return
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div class="mt-40">
    <form class="w-full sm:w-96 h-screen m-auto p-6 font-open-sans" @submit.prevent="handleSubmit">
      <h3 class="text-center font-bold text-emerald-800 m-5 text-2xl">LOG IN</h3>
      <label class="block text-base" for="email">Email address</label><br />
      <input
        class="w-full mb-1 pb-2 outline-none border-b-2 border-b-emerald-800 text-sm"
        type="email"
        v-model="formData.email"
        id="email"
        name="email"
      />
      <p class="text-red-500 text-sm">{{ formData.emailError }}</p>
      <br />

      <label class="block text-base" for="password">Password</label><br />
      <input
        class="w-full mb-1 pb-2 outline-none border-b-2 border-b-emerald-800 text-sm"
        type="password"
        v-model="formData.password"
        id="password"
        name="password"
      />
      <p class="text-red-500 text-sm">{{ formData.passwordError }}</p>
      <br />

      <button
        class="w-full bg-emerald-800 text-white rounded-xl px-2 py-3 mt-2 hover:scale-105 duration-500"
        id="signupBtn"
        type="submit"
      >
        Log in
      </button>
      <p class="text-center">
        Don't have an account?
        <RouterLink class="text-emerald-800" to="/account">Create account</RouterLink>
      </p>
      <!-- <button @click="reset">Reset password</button> -->
    </form>
  </div>
</template>
