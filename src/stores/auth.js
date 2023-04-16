import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("token"))
  }),
  getters: {},

  actions: {
    async signup(username, email, password) {
      const response = await axios.post(registerUrl, {
        username,
        email,
        password
      });
      this.user = response.data.token;
      localStorage.setItem("token", JSON.stringify(response.data.token));
    },
    async login(email, password) {
      const response = await axios.post(loginUrl, {
        email, password
      })
      this.user = response.data.token
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
  }
})  

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
  }