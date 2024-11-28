<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-10 border-t border-stone-200 bg-stone-50 text-xs">
    <router-link :to="{ name: 'home' }">
      <button type="button" class="active:outline-none focus:outline-none hover:outline-none border-none color-transparent bg-transparent inline-flex flex-col items-center justify-center mx-1 group stroke-stone-600 text-stone-600">
        <HomeIcon v-if="route.name === 'home'" class="w-6" />
        <HomeIconOutline v-else class="w-6" />
      </button>
    </router-link>

    <router-link :to="{ name: 'player_search' }">
      <button type="button" class="active:outline-none focus:outline-none hover:outline-none border-none color-transparent bg-transparent inline-flex flex-col items-center justify-center mx-1 group stroke-stone-600 text-stone-600">
        <MagnifyingGlassCircleIcon v-if="route.name === 'player_search'" class="w-6" />
        <MagnifyingGlassCircleIconOutline v-else class="w-6" />
      </button>
    </router-link>

    <router-link :to="{ name: 'matchup_simulator', params: { pitcher_id: 'snelb001', batter_id: 'hernt002' }}">
      <button type="button" class="active:outline-none focus:outline-none hover:outline-none border-none color-transparent bg-transparent inline-flex flex-col items-center justify-center mx-1 group stroke-stone-600 text-stone-600">
        <UserGroupIcon v-if="route.name === 'matchup_simulator'" class="w-6" />
        <UserGroupIconOutline v-else class="w-6" />
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { HomeIcon } from "@heroicons/vue/24/solid";
import { HomeIcon as HomeIconOutline } from "@heroicons/vue/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/solid";
import { MagnifyingGlassCircleIcon as MagnifyingGlassCircleIconOutline } from "@heroicons/vue/24/outline";
import { UserGroupIcon } from "@heroicons/vue/24/solid";
import { UserGroupIcon as UserGroupIconOutline } from "@heroicons/vue/24/outline";

const route = useRoute();
</script>
