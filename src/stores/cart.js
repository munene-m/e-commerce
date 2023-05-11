import { defineStore, acceptHMRUpdate } from 'pinia'
import { onMounted, reactive } from 'vue'
// import { useAuthStore } from './auth'
import axios from 'axios'

// const authStore = useAuthStore()

export const useCartStore = defineStore('cart', () => {
  const STORAGE_KEY = 'cartItems'
  const user = JSON.parse(localStorage.getItem("token"))
  const username = JSON.parse(localStorage.getItem("username"))
  const cartItem = JSON.parse(localStorage.getItem("cart"))
  const cart = reactive({
    cartItems: []
  })
  // Load cart items from local storage on initialization
  // if (localStorage.getItem(STORAGE_KEY)) {
  //   cart.cartItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
  // }

  async function getCartItems() {
    await axios.get(`https://m-duka.onrender.com/cart/${username}`, {
      headers: {
        Authorization: `Bearer ${user}`
      }
    }).then(response => {
      cart.cartItems.push(response.data)
      console.log(response.data);
    }).catch(err => console.log(err))
  }

  const addToCart = async (customer, productId, name, image, price, quantity) => {
    // Check if item already exists in cartItems array
    const itemInCart = cart.cartItems.find(cartItem => cartItem.productId === productId);
  
    if (itemInCart) {
      // If item already exists, increment quantity
      itemInCart.quantity++;
    } else {
      // Otherwise, add item to cartItems array
      await axios.post("https://m-duka.onrender.com/cart/add", {customer, productId, name, image, price, quantity })
        .then((response) => {
          const item = response.data;
          cart.cartItems.push({ ...item, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart.cartItems));
        })
        .catch((err) => console.log(err))
    }
  
    console.log(cart.cartItems);
  }
  
  const removeFromCart = async (id) => {
    await axios.delete(`https://m-duka.onrender.com/cart/delete/${id}`,
    { headers: { Authorization: `Bearer ${user}` }})
    .then(response => {
      console.log(response.data)
      cart.cartItems = cart.cartItems.filter((item) => item._id !== id)
      localStorage.setItem("cart", JSON.stringify(cart.cartItems))
    })
    .catch(err => console.log(err))
    // cart.cartItems = cart.cartItems.filter((item) => item.id !== id)
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.cartItems))
  }

  const increaseQuantity = async (id, quantity) => {
    const item = cart.cartItems.find((item) => item._id === id)
    console.log(item);
    if (item) {
      item.quantity+=quantity
      localStorage.setItem("cart", JSON.stringify(cart.cartItems))

      await axios.put(`https://m-duka.onrender.com/cart/update/${id}`, {quantity: item.quantity++}, {
        headers: { Authorization: `Bearer ${user}` }
      }).then(response => {
        console.log(response.data);
        // cart.cartItems = cart.cartItems.filter((item) => item._id !== id)
        // cart.cartItems.push(response.data)
      }).catch(err => console.log(err))
    }
  }
  const decreaseQuantity = async (id, quantity) => {
    const item = cart.cartItems.find((item) => item._id === id)
    if (item) {
      // item.quantity-=quantity
      if(item.quantity > 0){
      item.quantity-=quantity
      localStorage.setItem("cart", JSON.stringify(cart.cartItems))
      await axios.put(`https://m-duka.onrender.com/cart/update/${id}`, {quantity:item.quantity}, {
        headers: { Authorization: `Bearer ${user}` }
      }).then(response => {
        console.log(response.data);
        // cart.cartItems = cart.cartItems.filter((item) => item._id !== id)
        // cart.cartItems.push(response.data)
      }).catch(err => console.log(err))
    }
  }

  return { cart, addToCart, getCartItems, removeFromCart, increaseQuantity, decreaseQuantity }
}})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
