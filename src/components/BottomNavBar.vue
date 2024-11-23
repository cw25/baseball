<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-20 border-t border-stone-600 bg-stone-900">
    <router-link
            :to="{
              name: 'home',
            }"
          >
      <button type="button" class="h-20 inline-flex flex-col items-center justify-center mx-4 hover:bg-stone-800 group">
        <span class=" w-12 text-sm text-stone-500">
          Home
        </span>
      </button>
    </router-link>

    <router-link
            :to="{
              name: 'player_search',
            }"
          >
      <button type="button" class="h-20 inline-flex flex-col items-center justify-center mx-4 hover:bg-stone-800 group">
        <span class=" w-12 text-sm text-stone-500">
            Search
        </span>
      </button>
    </router-link>
  </div>
</template>

<script setup>
</script>
