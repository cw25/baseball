<template>
  <PlayerHeader :player="player" />

  <div v-if="battingStats" class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
    2023 Batting Stats
  </div>
  <BasicBattingTable :stats="battingStats" />

  <div v-if="outcomes" class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
    Outcome Probabilities
    <span class="text-xs">(approx.)</span>
  </div>
  <BattingOutcomesTable :outcomes="outcomes" />
</template>


<script setup>
import { useRoute } from 'vue-router';
import { playerByID, playerStatsByID, batterOutcomes } from '../common/queries.js';
import PlayerHeader from '../components/PlayerHeader.vue';
import BattingOutcomesTable from '../components/BattingOutcomesTable.vue';
import BasicBattingTable from '../components/BasicBattingTable.vue';

const route = useRoute();
if (!route.params.id) {
  throw "Missing player ID";
}

let player = await playerByID(route.params.id);
player = player?.at(0);

let battingStats = await playerStatsByID(route.params.id)
battingStats = battingStats?.at(0);

let outcomes = await batterOutcomes(route.params.id);
outcomes = outcomes?.at(0);
</script>
