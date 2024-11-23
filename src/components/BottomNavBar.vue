<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-20 border-t border-gray-600 bg-slate-800">
    <router-link
            :to="{
              name: 'home',
            }"
          >
    <button type="button" class="inline-flex flex-col items-center justify-center mx-4 hover:bg-gray-800 group">
      <span class="h-10 w-12 text-sm text-gray-500">
        Home
      </span>
    </button>
  </router-link>
    <button type="button" class="inline-flex flex-col items-center justify-center mx-4 hover:bg-gray-800 group">
      <span class="h-10 w-12 text-sm text-gray-500">
        <router-link
            :to="{
              name: 'player_search',
            }"
          >
          Search
        </router-link>
      </span>
    </button>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
