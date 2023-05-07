<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useProductStore } from '../stores/products'
import Modal from './Modal.vue'
import Popup from './Popup.vue'
import axios from 'axios'

const cartStore = useCartStore()
const authStore = useAuthStore()
const productStore = useProductStore()

const showPopUp = ref(false);


function addToCart(customer, id, name, quantity, image, price) {
  cartStore.addToCart(customer, id, name, image, price, quantity)
}

const items = ref([])

async function getProducts() {
  await axios
    .get('https://m-duka.onrender.com/products', {
      headers: {
        Authorization: `Bearer ${authStore.user}`
      }
    })
    .then((response) => {
      items.value.push(response.data)
      console.log(response.data)
    })
    .catch((err) => console.log(err))
}
onMounted(() => {
  getProducts()
})

const props = defineProps({
  searchItem: String
})
const filteredProducts = computed(() => {
  let result = []
  for (let i = 0; i < items.value.length; i++) {
    let innerArray = items.value[i]
    for (let j = 0; j < innerArray.length; j++) {
      let item = innerArray[j]
      if (item.name.toLowerCase().includes(props.searchItem.toLowerCase())) {
        result.push(item)
      }
    }
  }
  return result
})
const productsFound = computed(() => {
  return filteredProducts.value.length > 0
})
async function removeItem(id) {
  await axios
    .delete(`https://m-duka.onrender.com/products/delete/${id}`, {
      headers: { Authorization: `Bearer ${authStore.user}` }
    })
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err))
}

let showModal = ref(false)

function productForm() {
  showModal.value = true
}
function onFileSelected(event) {
  formData.image = event.target.files[0]
}
const formData = reactive({
  name: '',
  description: '',
  quantity: '',
  itemsInStock: '',
  price: '',
  selectedCategory: '',
  image: null
})

const rules = computed(() => {
  return {
    name: { required: helpers.withMessage('Product name is required', required) },
    description: { required: helpers.withMessage('Product description is required', required) },
    quantity: { required: helpers.withMessage('Product quantity is required', required) },
    itemsInStock: { required: helpers.withMessage('Product quantity is required', required) },
    price: { required: helpers.withMessage('Price is required', required) },
    selectedCategory: { required: helpers.withMessage('Please select a category', required) }
  }
})
const v$ = useVuelidate(rules, formData)

const handleModal = () => {
  showModal.value = false
}
async function handleModalSubmit(id) {
  const result = await v$.value.$validate()
  if(result){
  await productStore.editProduct(
    id, formData.name, formData.description, formData.quantity, formData.itemsInStock, formData.selectedCategory, formData.price, formData.image
  )
  showPopUp.value = true;

}
  showModal.value = false
  setTimeout(() => {
    formData.name = "", formData.description = "",
    formData.quantity = "", formData.itemsInStock = "",
    formData.selectedCategory = "", formData.price = "",
    formData.image = ""
  } ,1000)
}
</script>

<template>
  <div
    v-if="productsFound"
    class="flex overflow-auto pb-4 whitespace-nowrap items-end sm:grid sm:gap-5 sm:grid-cols-2 md:grid-cols-4 sm:place-items-center font-open-sans"
    style="::-webkit-scrollbar {display: none;}">
    <div
      v-for="product in filteredProducts"
      :key="product._id"
      class="p-4 rounded-lg sm:w-5/6 w-full h-full flex flex-col items-start mr-6"
    >
      <img class="w-full h-full rounded object-cover" :src="product.image" :alt="product.name" />
      <p
        v-show="product.itemsInStock < 1"
        class="border border-slate-400 pr-2 mb-1 text-xs rounded-xl bg-slate-50 text-red-500 flex flex-row items-center"
      >
        Out of stock!
      </p>
      <h2 class="mt-2 font-bold text-emerald-800">{{ product.name }}</h2>
      <p class="text-sm">{{ product.description }}</p>
      <p class="text-xs sm:text-sm">Price: {{ product.price }}</p>
      <button
        v-if="!authStore.admin "
        @click="
          addToCart(authStore.username, product._id, product.name, product.quantity, product.image, product.price)
        "
        class="bg-emerald-800 text-white rounded-3xl border-2 border-emerald-800 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500"
      >
        Add to cart
      </button>
      <div v-else>
        <button
          @click="productForm()"
          class="bg-emerald-800 text-white rounded-3xl border-2 border-emerald-800 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500"
        >
          Edit
        </button>
        <Modal :show="showModal" @close="handleModal">
          <template #form>
            <div class="flex items-center justify-center w-full sm:w-5/6 m-auto">
              <form @submit.prevent="handleModalSubmit(product._id)" enctype="multipart/form-data"
                class="w-full z-10 flex flex-col items-center mt-4">
                  <h1 class="font-bold text-xl text-emerald-800">Edit product details</h1>
    <Popup v-if="showPopUp" message="Product updated successfully!" />


                <div class="py-4  md:grid md:grid-cols-2 md:place-items-start">
                  <div>
                    <label class="block" for="name">Product name</label>
                    <input type="text" v-model="formData.name"
                      class="text-sm outline-transparent w-full h-8 border px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded"
                    />
                    <br />
                    <label class="mt-1 block" for="name">Product description</label>
                    <textarea v-model="formData.description" type="text"
                      class="text-sm outline-transparent w-full h-24 border py-1 px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded"
                    ></textarea>
                    <label class="block" for="name">Quantity</label>
                    <input placeholder="e.g 6" type="text" v-model="formData.quantity"
                      class="text-sm outline-transparent w-full h-8 border px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded"
                    />
                    <br />
                  </div>
                  <div>
                    <label class="block" for="name">Items in stock</label>
                    <input placeholder="e.g 200" type="text" v-model="formData.itemsInStock"
                      class="text-sm outline-transparent w-full h-8 border px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded"
                    />
                    <br />
                    <label class="mt-1 block" for="name">Price</label>
                    <input placeholder="e.g KES 650" type="text" v-model="formData.price"
                      class="block text-sm outline-transparent w-full h-8 border px-2 focus:outline-slate-500 border-slate-500 bg-slate-200 mt-2 mb-3 rounded"
                    />

                    <label for="category">Select product category</label><br />
                    <div class="w-2/5 px-2 py-1 text-base cursor-pointer mt-2">
                      <select name="category" v-model="formData.selectedCategory"
                        class="border border-slate-500 rounded outline-none w-full px-1 cursor-pointer">
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
                    <input type="file" name="image" @change="onFileSelected" />
                  </div>
                </div>
                <button
                  type="submit"
                  class="w-40 bg-emerald-800 text-white rounded-xl px-2 py-2 mt-4"
                >
                Edit product
                </button>
              </form>
            </div>
          </template>
        </Modal>
        <button
          @click="removeItem(product._id)"
          class="bg-red-500 text-white rounded-3xl border-2 border-red-500 px-3 py-1 mt-2 text-xs cursor-pointer hover:scale-95 transition duration-500 mx-1"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-emerald-800 text-center">The item you have searched is unavailable.</p>
  </div>
</template>
