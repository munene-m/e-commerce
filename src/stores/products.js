import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const user = JSON.parse(localStorage.getItem("token"));


  async function addProduct(formData) {
    // const user = JSON.parse(localStorage.getItem("token"));
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('quantity', formData.quantity);
    data.append('price', formData.price);
    data.append('image', formData.image);
  
    await axios.post("http://localhost:5500/products/create", data, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    }).then((response) => {
      console.log(response)
    }).catch(err => console.log(err))
  }
    return { addProduct }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}