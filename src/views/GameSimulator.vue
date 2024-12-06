<template>
  <div v-if="state.game.status.gameOver" class="text-2xl font-bold">
    Final Score
    <br />
    {{ state.game.visitorTeam }} {{ state.game.status.visitorScore }}
    -
    {{ state.game.homeTeam }} {{ state.game.status.homeScore }}
  </div>

  <BoxScore class="mt-4" :game="state.game" />

  <div>
    <button
      @click="runSimulator()"
      class="text-xs bg-dodgerblue text-white ml-2 p-0.5 px-3 mt-4 rounded-md"
    >
      Simulate Game Again
    </button>
  </div>

  <div class="mt-4">
    <div v-for="outcome in state.gameOutcomes" :key="outcome[0]" class="text-left">
      <span :class="!OUT_TYPES.includes(outcome[5]) ? 'font-bold': ''">
        {{ outcome[0] }}
      </span>
    </div>
  </div>

  <ScrollSpacer />
</template>

<script setup>
import { reactive } from "vue";
import { newGame } from '../common/game.js';
import { OUT_TYPES } from '../common/simulator.js';
import ScrollSpacer from '@/components/ScrollSpacer.vue';
import BoxScore from '@/components/BoxScore.vue';

const state = reactive({
  game: {},
  gameOutcomes: [],
});

const runSimulator = async () => {
  state.game = newGame();
  state.gameOutcomes = await state.game.simulateGame();
};

runSimulator();
</script>
