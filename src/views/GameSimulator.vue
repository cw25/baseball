<template>
  <div v-for="outcome in simGame" :key="outcome[0]">
    <span :class="!OUT_TYPES.includes(outcome[5]) ? 'font-bold': ''">
      {{ outcome[0] }}
    </span>
  </div>

  <div class="text-2xl font-bold">
    Final Score
    <br />
    {{ game.visitorTeam }} {{ game.status.visitorScore }}
    -
    {{ game.homeTeam }} {{ game.status.homeScore }}
  </div>

  <ScrollSpacer />
</template>

<script setup>
import { newGame } from '../common/game.js';
import { OUT_TYPES } from '../common/simulator.js';
import ScrollSpacer from '@/components/ScrollSpacer.vue';

let game = newGame();
let simGame = await game.simulateHalfInning();
</script>
