<template>
Search...
<input type="text" name="player_search" @change="search()" v-model="state.searchTerm">
</template>


<script setup>
import { reactive } from 'vue';
import { searchPlayers } from '../common/queries.js';

const state = reactive({ searchTerm: "" });

const search = async () => {
  console.log("Searching", state.searchTerm);
  let results = await searchPlayers(state.searchTerm);
  console.log("Results", results);
};
</script>