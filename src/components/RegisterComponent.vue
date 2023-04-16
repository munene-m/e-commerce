<script setup>
import { reactive, computed, ref, watchEffect } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, minLength, email, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
// watchEffect(() => {
//   if(authStore.user){
//     router.push("/account-settings")
//   }
// })

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
        confirmPassword: { required: helpers.withMessage("The entered passwords do not match", required), sameAs: sameAs(formData.password) },
        role: { required: helpers.withMessage("Category is required", required) }
    }
})
const v$ = useVuelidate(rules, formData)
const handleSubmit = async () =>{
    const result = await v$.value.$validate()
    if(result){
        authStore.signup(formData.username, formData.email, formData.password)
        //router.push("/home-page")
    }
    setTimeout(() => {
        formData.username = "",
        formData.email = "",
        formData.password  = "",
        formData.confirmPassword = ""
    }, 1000)
}
</script>
<template>
  <div class="mt-32">
    <form class="w-96 h-screen  m-auto p-6 font-open-sans" @submit.prevent="handleSubmit">
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
      class="w-full bg-emerald-800 text-white rounded-xl px-2 py-3 mt-2"
      id="signupBtn" type="submit">Create account</button>
      <p class="text-center">
        Have an account? <RouterLink class="text-emerald-800" to="/login">Log in</RouterLink>
      </p>
    </form>
  </div>
</template>


<!-- <style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
  padding-top:8rem;
}
.formBeforeAuth{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
  padding-top: 5rem;
}
.login-image {
  background-color: #f4605b;
  border-radius: 0 4px 4px 0;
}
.login-image img {
  display: flex;
  align-items: center;
  height: 180px;
  padding-top: 180px;
  margin: auto;
}
.login-image p {
  color: white;
  text-align: center;
  margin: auto;
  width:18rem;
}
#signupForm {
  width: 300px;
  margin: 40px auto;
  padding: 14px 28px;
  text-align: left;
  /* border: 1px solid #919191; */
  border-radius: 8px;
  background: #fff;
}

form > h3 {
  text-align: center;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

label {
  display: block;
  font-size: 16px;
}

.radioBtns {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 1rem;
}
#labelRadio1, #labelRadio2{
  display: inline;
  cursor: pointer;
}
#labelRadio1{
  margin-right: 12px;
}
#freelancer, #client{
  accent-color: crimson;
  cursor: pointer;
}
input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  margin-bottom: 8px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-bottom: 2px solid #919191;
  line-height: 1.5em;
  font-family: inherit;
    font-weight: 800;
    font-size: 14px;
}
.errorMsg{
    color: red;
    font-size: 12px; 
    margin:0;
}
button[type="submit"] {
  width: 100%;
  background-color: #f4605b;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  font-size: 17px;
}

button[type="submit"]:hover {
  background-color: rgb(236, 55, 91);
  transform: scale(0.98);
}
.login {
  text-align: center;
}
.login a {
  color: crimson;
  text-decoration: none;
  font-weight: 600;
}
@media only screen and (max-width: 40em) {
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
min-height: 50vh;
  }
  .login-image{
    display: none;
  }
}
</style> -->
