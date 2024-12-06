<template>
  <div class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
    Simulate Batting
    <button
      @click="runSimulator()"
      class="text-xs bg-dodgerblue text-white ml-2 p-0.5 px-3 rounded-md"
    >
      Simulate {{ iterations }} PAs
    </button>
  </div>

  <div class="px-3 rounded-md w-full grid grid-cols-8 font-mono font-bold text-sm">
    <div class="w-full text-left col-span-1">BB</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['walk'] / iterations).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">1B</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['single'] / iterations).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">HBP</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['hbp'] / iterations).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">2B</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['double'] / iterations).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">K</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['k'] / iterations).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">3B</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['triple'] / iterations).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">GO</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['go'] / iterations).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">FO</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['fo'] / iterations).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">LO</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['lo'] / iterations).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">HR</div>
    <div class="w-full text-right col-span-2">{{ (100 * state.simulatedOutcomes['hr'] / iterations).toFixed(2) }}%</div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { A_WHOLE_LOT, simulateOutcomes } from '../common/simulator.js';

const iterations = A_WHOLE_LOT;

const props = defineProps({
  outcomes: { type: Object },
});

const state = reactive({
  simulatedOutcomes: {},
});

const runSimulator = () => {
  state.simulatedOutcomes = simulateOutcomes(props.outcomes, 'batting', iterations);
}

runSimulator();
</script>
