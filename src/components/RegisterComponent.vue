<script setup>
import { reactive, computed, ref, watchEffect } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, minLength, email, helpers } from '@vuelidate/validators'
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
    username:"",
    email: "",
    password: "",
    confirmPassword: "",
})
const rules = computed(() => {
    return{
        username: { required: helpers.withMessage("Username is required", required) },
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength:minLength(6)},
        confirmPassword: { required: helpers.withMessage("The entered passwords do not match", required), sameAs: sameAs(formData.password) }    }
})
const v$ = useVuelidate(rules, formData)
const handleSubmit = async () =>{
    const result = await v$.value.$validate()
    if(result){
        authStore.signup(formData.username, formData.email, formData.password)
    }
        formData.username = "",
        formData.email = "",
        formData.password  = "",
        formData.confirmPassword = ""
   
}
</script>
<template>
  <div class="mt-32">
    <form class="w-full sm:w-96 h-screen  m-auto p-6 font-open-sans" @submit.prevent="handleSubmit">
      <h3 class="text-center font-bold text-emerald-800 m-5 text-2xl">CREATE ACCOUNT</h3>
      <label class="block text-base" for="userName">User name</label><br />
      <input
      class="w-full mb-1 outline-none pb-2 border-b-2 border-b-emerald-800 text-sm"
        type="text"
        v-model="formData.username"
        id="userName"
        name="userName"
      />
      <p class="text-red-500 text-sm" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</p>
      <br />

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
      <label class="block text-base" for="confirmPassword">Confirm Password</label><br />
      <input
      class="w-full mb-1 pb-2 outline-none border-b-2 border-b-emerald-800 text-sm"
        type="password"
        v-model="formData.confirmPassword"
        id="confirmPassword"
        name="confirmPassword"
      />
      <p class="text-red-500 text-sm" v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</p>
      <br />

      <button
      class="w-full bg-emerald-800 text-white rounded-xl px-2 py-3 mt-2 hover:scale-95 duration-500"
      id="signupBtn" type="submit">Create account</button>
      <p class="text-center">
        Have an account? <RouterLink class="text-emerald-800" to="/login">Log in</RouterLink>
      </p>
    </form>
  </div>
</template>
