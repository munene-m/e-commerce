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
    async logout(){
      this.user = null
      localStorage.removeItem("token")
      localStorage.removeItem("adminEmail")
      localStorage.removeItem("username")
      location.reload()
    }
  }
})  

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
  }