<template>
  <div class="relative">
    <input class="p-1 pr-2 pl-8 w-full m-0 rounded border border-stone-300" type="text" name="player_search" @change="search()" v-model="state.searchTerm" placeholder="Search by player name..." />
    <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
      <MagnifyingGlassIcon class="w-5 stroke-stone-300" />
    </div>
  </div>

  <div>
    <div class="mt-6 text-xs">
      <div v-for="player in state.results" :key="player.id">
        <PlayerListRow :player="player" />
      </div>
    </div>

    <div v-if="state.results?.length > 0">
      <ScrollSpacer />
    </div>
  </div>
</template>


<script setup>
import { reactive } from 'vue';
import { searchPlayers } from '../common/queries.js';
import PlayerListRow from '@/components/PlayerListRow.vue';
import ScrollSpacer from '@/components/ScrollSpacer.vue';
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const state = reactive({ searchTerm: "", results: [] });

const search = async () => {
  if (!state.searchTerm || state.searchTerm == "") {
    return [];
  }

  state.results = await searchPlayers(state.searchTerm);
};
</script>
