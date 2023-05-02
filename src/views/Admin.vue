<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue';
import { useProductStore } from '../stores/products';

const productStore = useProductStore()
function onFileSelected(event) {
    formData.image = event.target.files[0];
}
const formData = reactive({
    name:"",
    description: "",
    quantity: "",
    price: "",
    selectedCategory,
    image: null
})

const rules = computed(() => {
    return{
        name: { required: helpers.withMessage("Product name is required", required) },
        description: { required: helpers.withMessage("Product description is required", required) },
        quantity: { required: helpers.withMessage("Product quantity is required", required)},
        price: { required: helpers.withMessage("Price is required", required)},
        selectedCategory: {required: helpers.withMessage("Please select a category", required),}
    }
})
const v$ = useVuelidate(rules, formData)
const handleSubmit = async () => {
    const result = await v$.value.$validate()
    if(result) {
        productStore.addProduct(formData.name, formData.description, formData.quantity, formData.price, formData.selectedCategory, formData.image)
    }
    setTimeout(() => {
        formData.name = "",
        formData.description = "",
        formData.quantity  = "",
        formData.price = "",
        formData.selectedCategory = "",
        formData.image = null
    }, 1000)
}
</script>

<template>
    <main class="font-open-sans relative mt-24 mx-4 h-screen">
        <h1 class="font-bold text-2xl text-center">Add new product</h1>
        <div class="flex items-center justify-center w-full sm:w-5/6  m-auto">
            <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="w-full flex flex-col items-center mt-4">
                <div class="p-4 border border-slate-300 rounded-2xl">
                    <label class="block" for="name">Product name</label>
                    <input type="text" v-model="formData.name" class="text-sm outline-transparent w-full  h-8 border px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded">
                    <br>
                    <label class="mt-3" for="name">Product description</label>
                    <textarea v-model="formData.description" type="text" class="text-sm outline-transparent w-full  h-24 border py-1 px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded"></textarea>
                    <label for="category">Select a relevant category so freelancers can find your job</label><br />
            <div class="select">
              <select name="category" v-model="formData.selectedCategory" id="category">
                <option value="" disabled>Select one</option>
                <option value="Clothes">Clothes</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Tech">Tech</option>
                <option value="Furniture">Furniture</option>
                <option value="Kitchenware">Kitchenware</option>
              </select>
            </div>
            <p class="errorMsg" v-if="v$.selectedCategory.$error">
              {{ v$.selectedCategory.$errors[0].$message }}
            </p>
                    <label class="mt-3 mb-1 block" for="name">Product image</label>
                    <input type="file"  name="image" @change="onFileSelected">
                </div>
                <h2 class="font-bold mt-4 text-xl">Inventory</h2>
                <div class="p-4 border border-slate-300 rounded-2xl">
                    <label class="block" for="name">Quantity</label>
                    <input placeholder="e.g 200" type="text" v-model="formData.quantity" class="text-sm outline-transparent w-full  h-8 border px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded">
                    <br>
                    
                    <label class="mt-3" for="name">Price</label>
                    <input placeholder="e.g KES 650" type="text" v-model="formData.price" class="text-sm outline-transparent w-full h-8 border px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded">
                </div>
                <button type="submit" class="w-40  bg-emerald-800 text-white rounded-xl px-2 py-2 mt-2">Add product</button>
            </form>
        </div>
    </main>
</template>