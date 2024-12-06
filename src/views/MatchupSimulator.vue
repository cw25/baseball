<template>
  <PlayerMatchupHeader :pitcher="pitcher" :batter="batter" />

  <button
      @click="runSimulator()"
      class="text-xs bg-dodgerblue text-white ml-2 p-0.5 px-3 mt-4 rounded-md"
    >
      Simulate {{ iterations }} PAs
  </button>

  <div class="mt-2">
    {{ state.simulatedOutcomes }}
  </div>

  <div class="mt-2">
    {{ battingAvg() }}
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { playerByID, battingOutcomesByPlayerIDs, pitchingOutcomesByPlayerIDs } from '../common/queries.js';
import { A_WHOLE_LOT, simulateMatchupOutcomes } from '../common/simulator.js';
import PlayerMatchupHeader from '../components/PlayerMatchupHeader.vue';

const iterations = A_WHOLE_LOT;

const state = reactive({
  simulatedOutcomes: {},
});

const route = useRoute();
if (!route.params.pitcher_id) {
  throw "Missing pitcher ID";
}
if (!route.params.batter_id) {
  throw "Missing batter ID";
}

let pitcher = await playerByID(route.params.pitcher_id);
let pitcherOutcomes = await pitchingOutcomesByPlayerIDs([route.params.pitcher_id]);
pitcherOutcomes = pitcherOutcomes[route.params.pitcher_id];

let batter = await playerByID(route.params.batter_id);
let batterOutcomes = await battingOutcomesByPlayerIDs([route.params.batter_id]);
batterOutcomes = batterOutcomes[route.params.batter_id];

const runSimulator = () => {
  state.simulatedOutcomes = simulateMatchupOutcomes(pitcherOutcomes, batterOutcomes, iterations);
}

const battingAvg = () => {
  return (state.simulatedOutcomes['single'] + state.simulatedOutcomes['double'] + state.simulatedOutcomes['triple'] + state.simulatedOutcomes['hr']) /
    (iterations - state.simulatedOutcomes['walk'] - state.simulatedOutcomes['hbp'])

};

runSimulator();
</script>