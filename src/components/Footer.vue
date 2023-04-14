<script setup>
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-start sm:place-items-center gap-5 bg-slate-200 p-8 md:mx-4 md:rounded-t-lg mt-20 font-open-sans">
        <div class="w-60 h-full">
            <h2 class=" text-emerald-800 font-extrabold mb-5"><RouterLink to="/">E-COMMERCE</RouterLink></h2>
            <p>Find all the books you need from all genres in our shop.</p>
        </div>
        <div class="w-60 h-full">
            <h2 class=" text-emerald-800 font-extrabold mb-5">SHOP</h2>
            <p class="pb-1"><RouterLink class="text-black" to="/categories">Categories</RouterLink></p>
            <p class="pb-1"><RouterLink class="text-black" to="/new-items">What's new</RouterLink></p>
            <p class="pb-1">Discounts</p>
        </div>
        <div class="w-60 flex flex-col h-full">
            <h2 class=" text-emerald-800 font-extrabold mb-5">Payment methods</h2>
            <div class="flex flex-row items-center content-start">
                <img class="w-16 pr-2" src="../assets/MpesaLogo.png" alt="">
            <img class="w-16 " src="../assets/paypal.png" alt="">
            </div>
        </div>
    </div>
</template>