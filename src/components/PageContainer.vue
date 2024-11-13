<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <div class="h-screen w-screen">
        <div class="h-max">
          <component :is="Component"></component>
        </div>
        <div class="fixed bottom-0 left-0 z-50 w-full h-16 border-t border-gray-200 dark:border-gray-600">
          <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <span class="h-max w-4 mx-4 justify-center text-sm text-gray-500">
              <router-link
                  :to="{
                    name: 'home',
                  }"
                >
                Home
              </router-link>
            </span>
          </button>
          <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <span class="h-max w-4 mx-4 justify-center text-sm text-gray-500">
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
      </div>
    </template>
  </RouterView>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
