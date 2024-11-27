<template>
  <div class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
    Simulate Batting
    <button
      @click="runSimulator()"
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
import { ITERATIONS, simulateLotsOfOutcomes } from '../common/simulator.js';

const props = defineProps({
  outcomes: { type: Object },
});

const state = reactive({
  simulatedOutcomes: {},
});

const runSimulator = () => {
  state.simulatedOutcomes = simulateLotsOfOutcomes(props.outcomes);
}

runSimulator();
</script>
