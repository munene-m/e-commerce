import { defineStore, acceptHMRUpdate } from 'pinia'
import { reactive } from 'vue'
// import { useAuthStore } from './auth'
import axios from 'axios'

// const authStore = useAuthStore()

export const useCartStore = defineStore('cart', () => {
  const STORAGE_KEY = 'cartItems'
  const user = JSON.parse(localStorage.getItem("token"))

  const cart = reactive({
    cartItems: []
  })

  // Load cart items from local storage on initialization
  if (localStorage.getItem(STORAGE_KEY)) {
    cart.cartItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
  }

  const addToCart = async (productId, name, image, price, quantity) => {
    // Check if item already exists in cartItems array
    await axios.post("http://localhost:5500/cart/add", { productId, name, image, price, quantity },
        { headers: { Authorization: `Bearer ${user}` }}
      ).then((response) => {
        console.log(response.data)
        const item = response.data
        const itemInCart = cart.cartItems.find(cartItem => cartItem._id === response.data._id);
            if (itemInCart) {
      // If item already exists, increment quantity
               itemInCart.quantity++;
             } else {
      // Otherwise, add item to cartItems array
             cart.cartItems.push({ ...item, quantity: 1 });
    }
    console.log(cart.cartItems);
      })
      .catch((err) => console.log(err))
  }

  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:5500/cart/delete/${id}`,
    { headers: { Authorization: `Bearer ${user}` }})
    .then(response => {
      console.log(response.data)
      cart.cartItems = cart.cartItems.filter((item) => item._id !== id)
    })
    .catch(err => console.log(err))
    // cart.cartItems = cart.cartItems.filter((item) => item.id !== id)
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.cartItems))
  }

  const incrementQuantity = (id) => {
    const item = cart.cartItems.find((item) => item._id === id)
    if (item) {
      item.quantity++
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.cartItems))
    }
  }
  const decrementQuantity = (id) => {
    const item = cart.cartItems.find((item) => item._id === id)
    if (item.quantity > 1) {
      item.quantity--
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.cartItems))
    }
  }

  return { cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
