import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios"

export const useAuthStore = defineStore('counter', () => {
    const user = JSON.parse(localStorage.getItem("token"))

    async function signup() {

    }

    async function login() { 

    }

    return { user, signup, login }
  })
  

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
  }