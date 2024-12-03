<template>
  <PlayerHeader :player="player" />

  <template v-if="isBatter()">
    <BasicBattingTable v-if="battingStats" :stats="battingStats" />
    <BattingOutcomesTable v-if="battingOutcomes" :outcomes="battingOutcomes" />
    <BattingSimulator v-if="battingOutcomes" :outcomes="battingOutcomes" />
  </template>

  <template v-if="isPitcher()">
    <BasicPitchingTable v-if="pitchingStats" :stats="pitchingStats" />
    <PitchingOutcomesTable v-if="pitchingOutcomes" :outcomes="pitchingOutcomes" />
    <PitchingSimulator v-if="pitchingOutcomes" :outcomes="pitchingOutcomes" />
  </template>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { playerByID, battingStatsByPlayerID, battingOutcomesByPlayerID, pitchingStatsByPlayerID, pitchingOutcomesByPlayerIDs } from '../common/queries.js';
import PlayerHeader from '../components/PlayerHeader.vue';
import BattingOutcomesTable from '../components/BattingOutcomesTable.vue';
import BasicBattingTable from '../components/BasicBattingTable.vue';
import BattingSimulator from '../components/BattingSimulator.vue';
import PitchingOutcomesTable from '../components/PitchingOutcomesTable.vue';
import BasicPitchingTable from '../components/BasicPitchingTable.vue';
import PitchingSimulator from '../components/PitchingSimulator.vue';

const route = useRoute();
if (!route.params.id) {
  throw "Missing player ID";
}

const isBatter = () => {
  return player.is_batter == '1';
}

const isPitcher = () => {
  return player.is_pitcher == '1';
}

let player = await playerByID(route.params.id);

let battingStats;
let battingOutcomes;
if (isBatter()) {
  battingStats = await battingStatsByPlayerID(route.params.id);
  battingOutcomes = await battingOutcomesByPlayerID(route.params.id);
}

let pitchingStats;
let pitchingOutcomes;
if (isPitcher()) {
  pitchingStats = await pitchingStatsByPlayerID(route.params.id);
  pitchingOutcomes = await pitchingOutcomesByPlayerIDs([route.params.id]);
  pitchingOutcomes = pitchingOutcomes[route.params.id];
}
</script>
