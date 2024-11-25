<template>
  <div class="border border-2 px-2 rounded-md w-full text-left">
    <div class="text-2xl font-bold">
      {{ props.player.first }} {{ props.player.last }}
    </div>
    <div class="w-full text-left text-xl font-bold">
      {{ props.player.pos }} - {{ teamNames() }}
    </div>
  </div>
</template>

<script setup>
import { teamName } from '../common/utils.js';

const props = defineProps({
  player: { player: Object },
});

const teamNames = () => {
  let names = [];
  for (const team of props.player.team) {
    names.push(teamName(team));
  }
  return names.join(', ');
};
</script>
