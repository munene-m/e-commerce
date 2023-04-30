import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const user = JSON.parse(localStorage.getItem("token"));

  async function addProduct(name, description, quantity, price, image) {
        const formData = new FormData();
        const boundary = Math.random().toString().substring(2);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('image', image);
        console.log(name, description, quantity, price, image);

        const config = {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
                Authorization: `Bearer ${user}`,
              },
        }
        console.log(config);
        await axios.post("http://localhost:5500/products/create", formData, config)
        .then((response) => {
            console.log(response.data)
        }).catch((err) => console.log(err))
    }
    return { addProduct }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}