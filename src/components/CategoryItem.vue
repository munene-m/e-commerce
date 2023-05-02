<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
    categoryName: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    categoryPath: {
        type: String,
        required: true
    }
})
function navToCategory(){
    router.push({path: props.categoryPath})
}
</script>

<template>
  <div class="w-48 relative cursor-pointer" @click="navToCategory">
    <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" :src="imageSrc" alt=""/>
    <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-slate-400 text-lg font-bold">
      {{ categoryName }}
    </h3>
  </div>
</template>
