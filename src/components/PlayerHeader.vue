<template>
  <div class="w-full border-b-4 border-dodgerblue pb-1 text-left">
    <div class="leading-6 text-2xl font-bold">
      {{ props.player.first }} {{ props.player.last }}
    </div>
    <div class="w-full text-left text-large font-bold">
      {{ props.player.pos }} - {{ teamNames() }}
    </div>
  </div>
</template>

<script setup>
import { teamName } from '../common/utils.js';

const props = defineProps({
  player: { type: Object },
});

const teamNames = () => {
  let names = [];
  for (const team of props.player.team) {
    names.push(teamName(team));
  }
  return names.join(', ');
};
</script>
