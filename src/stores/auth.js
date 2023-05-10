import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("token")),
    admin: JSON.parse(localStorage.getItem("adminEmail")),
    username: JSON.parse(localStorage.getItem("username"))
  }),
  getters: {},

  actions: {
    async signup(username, email, password) {
      const response = await axios.post('https://m-duka.onrender.com/auth/register', {
        username,
        email,
        password
      });
      this.user = response.data.token;
      localStorage.setItem("token", JSON.stringify(response.data.token));
      if(response.data.email === "admin@email.com"){
        this.admin = response.data.email
      }
    },
    async login(email, password) {
      const response = await axios.post('https://m-duka.onrender.com/auth/login', {
        email, password
      })
      this.user = response.data.token
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("username", JSON.stringify(response.data.username))
      if(response.data.email === "admin@email.com"){
        this.admin = response.data.email
        localStorage.setItem("adminEmail", JSON.stringify(response.data.email))
      }
    },
    async logout(){
      this.user = null
      localStorage.removeItem("token")
      localStorage.removeItem("adminEmail")
      localStorage.removeItem("username")
    }
  }
})  

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
  }