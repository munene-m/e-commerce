<script setup>
import { reactive, computed, watchEffect } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

watchEffect(() => {
  if(authStore.user){
    router.push("/cart")
  }

})

const formData = reactive({
    email: "",
    password: "",
})
const rules = computed(() => {
    return{
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength:minLength(6)},
    }
})
const v$ = useVuelidate(rules, formData)
const handleSubmit = async () =>{
    const result = await v$.value.$validate()
    if(result){
        authStore.login(formData.email, formData.password)
    }
    setTimeout(() => {
        formData.email = "",
        formData.password  = ""
    }, 900)
}
</script>
<template>
  <div class="mt-40">
    <form class="w-full sm:w-96 h-screen m-auto p-6 font-open-sans" @submit.prevent="handleSubmit">
      <h3 class="text-center font-bold text-emerald-800 m-5 text-2xl">LOG IN</h3>
      <label class="block text-base" for="email">Email address</label><br />
      <input
      class="w-full mb-1 pb-2 outline-none border-b-2 border-b-emerald-800 text-sm"
       type="email" v-model="formData.email" id="email" name="email" />
      <p class="text-red-500 text-sm" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
      <br />

      <label class="block text-base" for="password">Password</label><br />
      <input
      class="w-full mb-1 pb-2 outline-none border-b-2 border-b-emerald-800 text-sm"
        type="password"
        v-model="formData.password"
        id="password"
        name="password"
      />
      <p class="text-red-500 text-sm" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
      <br />

      <button
      class="w-full bg-emerald-800 text-white rounded-xl px-2 py-3 mt-2 hover:scale-105 duration-500"
      id="signupBtn" type="submit">Log in</button>
      <p class="text-center">
        Don't have an account?
        <RouterLink class="text-emerald-800" to="/account">Create account</RouterLink>
      </p>
    </form>
  </div>
</template>

