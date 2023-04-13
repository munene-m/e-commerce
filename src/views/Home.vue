<template>
  <div class="md:w-4/5 w-11/12 m-auto mt-24 flex items-center flex-col">
    <img
      class="absolute w-inherit rounded-3xl h-3/4 md:h-2/3 bg-cover"
      src="../assets/booksInShelf.jpg"
      alt=""
    />
    <div class="relative flex items-start justify-center flex-col mt-12 md:mt-24 lg:mt-16 md:mx-4 mx-2 backdrop-blur-sm rounded p-2">
      <h1 class="text-white text-5xl md:text-5xl  font-bold md:w-5/6">
        Find your next book in our store.
      </h1>
      <p class="text-white text-2xl md:text-3xl  font-bold md:w-3/4 mt-5">
        Not sure what to read next? Browse our categories and find options for your next choice.
      </p>
      <button
        class="text-white rounded-xl px-4 py-2 md:px-4 md:py-2 md:text-base  flex items-center mt-3 md:mt-8 bg-emerald-800 outline-transparent"
      >
        Explore now
      </button>
    </div>
  </div>
  <div class="relative mt-32 sm:mt-52 md:mt-40 xl:mt-56">
    <h2 class="text-emerald-800 font-bold text-xl text-center sm:text-center md:text-start sm:ml-auto md:ml-24  ">Shop from our categories</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:mx-4 md:gap-4 gap-4 mt-5 sm:mt-10 place-items-center">
        <div class="w-48 relative">
            <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/booksInShelf.jpg" alt="">
            <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">Fiction</h3>
        </div>
        <div class="w-48 relative">
            <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/booksInShelf.jpg" alt="">
            <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">Comics</h3>
        </div>
        <div class="w-48 relative">
            <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/booksInShelf.jpg" alt="">
            <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">Motivational</h3>
        </div>
        <div class="w-48 relative">
            <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/booksInShelf.jpg" alt="">
            <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">History</h3>
        </div>
        <div class="w-48 relative">
            <img class="w-inherit h-72 rounded-xl scale-100 hover:scale-105 duration-500" src="../assets/booksInShelf.jpg" alt="">
            <h3 class="absolute bottom-4 left-4 right-4 text-center top-5/6 backdrop-blur-sm text-white text-lg font-bold">Philosophy</h3>
        </div>
    </div>
  </div>
</template>
