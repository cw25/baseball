<template>
  <div class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
    Simulate Batting
    <button
      @click="simulateLotsOfOutcomes(ITERATIONS)"
      class="text-xs bg-dodgerblue text-white ml-2 p-0.5 px-3"
    >
      Simulate {{ ITERATIONS }} ABs
    </button>
  </div>

  <div class="px-3 rounded-md w-full grid grid-cols-8 font-mono font-bold text-sm">
    <div class="w-full text-left col-span-1">BB</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['walk'] / ITERATIONS).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">1B</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['single'] / ITERATIONS).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">HBP</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['hbp'] / ITERATIONS).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">2B</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['double'] / ITERATIONS).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">K</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['k'] / ITERATIONS).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">3B</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['triple'] / ITERATIONS).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">OUT</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['out'] / ITERATIONS).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">HR</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['hr'] / ITERATIONS).toFixed(2) }}%</div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { getRandomInt } from '../common/utils.js';

const props = defineProps({
  outcomes: { type: Object },
});

const state = reactive({
  simulatedOutcomes: "",
});

const ITERATIONS = 10000;

const simulateLotsOfOutcomes = () => {
  state.simulatedOutcomes = {};
  for (let i=0; i<ITERATIONS; i++) {
    let o = simulateOutcome();
    if (!state.simulatedOutcomes[o]) {
      state.simulatedOutcomes[o] = 1;
    } else {
      state.simulatedOutcomes[o]++;
    }
  }
};

const simulateOutcome = () => {
  let ceiling = 0;
  ['walk', 'hbp', 'k', 'out', 'single', 'double', 'triple', 'hr'].forEach((x) => {
    ceiling += props.outcomes[`${x}_pcg`] * Math.pow(10,6);
  });

  let o;
  let threshold = 0;
  let rando = getRandomInt(ceiling);
  ['walk', 'hbp', 'k', 'out', 'single', 'double', 'triple', 'hr'].forEach((x) => {
    let upper = props.outcomes[`${x}_pcg`] * Math.pow(10,6);
    if (rando >= threshold && rando < upper + threshold + 1) {
      o = x;
    }
    threshold += upper;
  });

  return o || 'err';
};

simulateLotsOfOutcomes();
</script>
