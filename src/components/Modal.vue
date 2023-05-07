<script setup>
defineProps({
  show: Boolean,
});
</script>

<template>
  <div v-if="show" class="fixed inset-0 pt-20 bg-opacity-20 backdrop-filter backdrop-blur-sm grid place-items-center">
    <div class="bg-slate-100 px-2 py-1 max-w-4xl border rounded-xl">
        <slot name="form"></slot>

      <!-- <footer>
        <button >Submit</button>
      </footer> -->
    </div>
  </div>
</template>

