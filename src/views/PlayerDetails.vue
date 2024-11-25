<template>
  <PlayerHeader :player="player" />

  <div v-if="battingStats" class="w-full text-lg font-bold mt-6">2023 Batting Stats</div>
  <PlayerBattingStats :stats="battingStats" />
</template>


<script setup>
import { useRoute } from 'vue-router';
import { playerByID, playerStatsByID } from '../common/queries.js';
import PlayerHeader from '../components/PlayerHeader.vue';
import PlayerBattingStats from '../components/PlayerBattingStats.vue';

const route = useRoute();
if (!route.params.id) {
  throw "Missing player ID";
}

let player = await playerByID(route.params.id);
player = player?.at(0);

let battingStats = await playerStatsByID(route.params.id)
battingStats = battingStats?.at(0);
</script>
