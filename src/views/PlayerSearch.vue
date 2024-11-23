<template>
  <div class="">
    <input class="p-1 w-full m-0" type="text" name="player_search" @change="search()" v-model="state.searchTerm">

    <div class="mt-6">
      <div v-for="player in state.results" :key="player.id">
        <PlayerListRow :player="player" />
      </div>
    </div>

    <div v-if="state.results?.length > 0" class="h-24">
    </div>
  </div>
</template>


<script setup>
import { reactive } from 'vue';
import { searchPlayers } from '../common/queries.js';
import PlayerListRow from '@/components/PlayerListRow.vue';

const state = reactive({ searchTerm: "", results: [] });

const search = async () => {
  if (!state.searchTerm || state.searchTerm == "") {
    return [];
  }

  state.results = await searchPlayers(state.searchTerm);
};
</script>
