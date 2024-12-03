<template>
  <div v-for="outcome in simGame" :key="outcome[0]">
    {{ outcome[0] }}
  </div>
</template>

<script setup>
import { newGame } from '../common/game.js';

let game = newGame();
let simGame = await game.simulateHalfInning();
</script>