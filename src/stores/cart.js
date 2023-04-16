import { reactive } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCartStore = defineStore('counter', () => {
  const STORAGE_KEY = "cartItens"

  const cart = reactive({
    cartItems: []
  })

  // Load cart items from local storage on initialization
  if (localStorage.getItem(STORAGE_KEY)) {
    cart.cartItems = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }


  const addToCart = (item) => {
      // Check if item already exists in cartItems array
  const itemInCart = cart.cartItems.find(cartItem => cartItem.id === item.id);
  if (itemInCart) {
    // If item already exists, increment quantity
    itemInCart.quantity++;
  } else {
    // Otherwise, add item to cartItems array
    cart.cartItems.push({ ...item, quantity: 1 });
  }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.cartItems));
  }

  const removeFromCart = (id) => {
    cart.cartItems = cart.cartItems.filter(item => item.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.cartItems));
  }

  const incrementQuantity = (id) => {
    const item = cart.cartItems.find(item => item.id === id)
    if (item) {
      item.quantity++;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.cartItems));
    }
  }
  const decrementQuantity = (id) => {
    const item = cart.cartItems.find(item => item.id === id)
    if (item.quantity > 0) {
      item.quantity--;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.cartItems));
    }
  }

  return { cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}