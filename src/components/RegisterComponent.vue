<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter()

const errorMsg = ref("")

const formData = reactive({
    username:"",
    email: "",
    password: "",
    confirmPassword: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: ""
})

watch(formData, (newFormData) => {
  if (newFormData.username !== "") {
    formData.usernameError = "";
  }
  if (newFormData.email !== "") {
    formData.emailError = "";
  }
  if (newFormData.password !== "") {
    formData.passwordError = "";
  }
  if (newFormData.confirmPassword !== "") {
    formData.confirmPasswordError = "";
  }
});

const handleSubmit = async () => {
  formData.username === ""
    ? (formData.usernameError = "Please enter your username")
    : (formData.usernameError = "");

  formData.email === ""
    ? (formData.emailError = "Please enter your email")
    : (formData.emailError = "");

  formData.password === "" || formData.password.length < 6
    ? (formData.passwordError = "Please enter a password with at least 6 characters")
    : formData.password !== formData.confirmPassword
      ? (formData.confirmPasswordError = "Passwords do not match")
      : (formData.confirmPasswordError = "");

  try {
    const response = await axios.post('https://m-duka.onrender.com/auth/register', {
          username: formData.username, email: formData.email, password: formData.password 
        })
        console.log(response.data);

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("username", JSON.stringify(response.data.username))
        response.data.email === "admin@email.com" ? localStorage.setItem("adminEmail", response.data.email) : localStorage.removeItem("adminEmail");

        router.push({name: "cart"})
        return
  } catch (error) {
    errorMsg.value = error
  }
};

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
      <p class="text-red-500 text-sm">{{ formData.usernameError }}</p>
      <br />

      <label class="block text-base" for="email">Email address</label><br />
      <input
      class="w-full mb-1 pb-2 outline-none border-b-2 border-b-emerald-800 text-sm"
       type="email" v-model="formData.email" id="email" name="email" />
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
      <label class="block text-base" for="confirmPassword">Confirm Password</label><br />
      <input
      class="w-full mb-1 pb-2 outline-none border-b-2 border-b-emerald-800 text-sm"
        type="password"
        v-model="formData.confirmPassword"
        id="confirmPassword"
        name="confirmPassword"
      />
      <p class="text-red-500 text-sm" >{{ formData.confirmPasswordError }}</p>
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
