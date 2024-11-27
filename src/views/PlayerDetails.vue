<template>
  <PlayerHeader :player="player" />

  <template v-if="isBatter()">
    <BasicBattingTable v-if="battingStats" :stats="battingStats" />
    <BattingOutcomesTable v-if="battingOutcomes" :outcomes="battingOutcomes" />
    <BattingSimulator v-if="battingOutcomes" :outcomes="battingOutcomes" />
  </template>

  <template v-if="isPitcher()">
    <div v-if="pitchingStats" class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
      2023 Pitching Stats
    </div>
    <BasicPitchingTable :stats="pitchingStats" />

    <div v-if="pitchingOutcomes" class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
      Pitching Probabilities
      <span class="text-xs">(approx.)</span>
    </div>
    <PitchingOutcomesTable :outcomes="pitchingOutcomes" />
  </template>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { playerByID, battingStatsByPlayerID, battingOutcomesByPlayerID, pitchingStatsByPlayerID, pitchingOutcomesByPlayerID } from '../common/queries.js';
import PlayerHeader from '../components/PlayerHeader.vue';
import BattingOutcomesTable from '../components/BattingOutcomesTable.vue';
import BasicBattingTable from '../components/BasicBattingTable.vue';
import BattingSimulator from '../components/BattingSimulator.vue';
import PitchingOutcomesTable from '../components/PitchingOutcomesTable.vue';
import BasicPitchingTable from '../components/BasicPitchingTable.vue';

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
player = player?.at(0);

let battingStats;
let battingOutcomes;
if (isBatter()) {
  battingStats = await battingStatsByPlayerID(route.params.id)
  battingStats = battingStats?.at(0);
  battingOutcomes = await battingOutcomesByPlayerID(route.params.id);
  battingOutcomes = battingOutcomes?.at(0);
}

let pitchingStats;
let pitchingOutcomes;
if (isPitcher()) {
  pitchingStats = await pitchingStatsByPlayerID(route.params.id)
  pitchingStats = pitchingStats?.at(0);
  pitchingOutcomes = await pitchingOutcomesByPlayerID(route.params.id);
  pitchingOutcomes = pitchingOutcomes?.at(0);
}
</script>
