import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const user = JSON.parse(localStorage.getItem("token"));

  async function addProduct(name, description, quantity, itemsInStock, price, image) {
        const formData = new FormData();
        const boundary = Math.random().toString().substring(2);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('itemsInStock', itemsInStock)
        formData.append('price', price);
        formData.append('category', category)
        formData.append('image', image);

        const config = {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
                Authorization: `Bearer ${user}`,
              },
        }
        
        await axios.post("https://m-duka.onrender.com/products/create", formData, config)
        .then((response) => {
            console.log(response.data)
        }).catch((err) => console.log(err))
    }

    async function editProduct(id, name, description, quantity, itemsInStock, category, price, image) {
        const formData = new FormData();
        const boundary = Math.random().toString().substring(2);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('itemsInStock', itemsInStock)
        formData.append('price', price);
        formData.append('category', category)
        formData.append('image', image);

        const config = {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
                Authorization: `Bearer ${user}`,
              },
        }
        
        await axios.put(`https://m-duka.onrender.com/products/update/${id}`, formData, config)
        .then((response) => {
            console.log(response.data)
        }).catch((err) => console.log(err))
    }
    return { addProduct, editProduct }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}