<template>
  <div class="w-full border-b-4 border-dodgerblue pb-1 text-left columns-2">
    <div class="">
      <div class="leading-6 text-2xl font-bold">
        {{ props.pitcher.first }} <br/>
        {{ props.pitcher.last }}
      </div>
      <div class="w-full text-left text-large font-bold">
        {{ teamNames(props.pitcher) }}
      </div>
    </div>

    <div class="">
      <div class="leading-6 text-2xl font-bold">
        {{ props.batter.first }} <br/>
        {{ props.batter.last }}
      </div>
      <div class="w-full text-left text-large font-bold">
        {{ teamNames(props.batter) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { teamName } from '../common/utils.js';

const props = defineProps({
  pitcher: { player: Object },
  batter: { player: Object },
});

const teamNames = (player) => {
  let names = [];
  for (const team of player.team) {
    names.push(teamName(team));
  }
  return names.join(', ');
};
</script>
