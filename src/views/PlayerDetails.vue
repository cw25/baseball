<template>
  <div class="w-full text-left text-2xl font-bold">
    {{ player.first }} {{ player.last }}
  </div>
  <div class="w-full text-left text-xl font-bold">
    {{ player.pos }} - {{ teamNames() }}
  </div>

  <div class="w-full text-lg font-bold mt-6">2023 Stats</div>

  <div class="w-full grid grid-cols-4 mt-2 font-mono">
    <div class="w-full text-left col-span-3">Games Played</div>
    <div class="w-full text-right col-span-1">{{ stats.GP }}</div>

    <div class="w-full text-left col-span-3">At-Bats</div>
    <div class="w-full text-right col-span-1">{{ stats.AB }}</div>

    <div class="w-full text-left col-span-3">Runs</div>
    <div class="w-full text-right col-span-1">{{ stats.R }}</div>

    <div class="w-full text-left col-span-3">Hits</div>
    <div class="w-full text-right col-span-1">{{ stats.H }}</div>

    <div class="w-full text-left col-span-3">Doubles</div>
    <div class="w-full text-right col-span-1">{{ stats['2B'] }}</div>

    <div class="w-full text-left col-span-3">Triples</div>
    <div class="w-full text-right col-span-1">{{ stats['3B'] }}</div>

    <div class="w-full text-left col-span-3">Home Runs</div>
    <div class="w-full text-right col-span-1">{{ stats.HR }}</div>

    <div class="w-full text-left col-span-3">RBI</div>
    <div class="w-full text-right col-span-1">{{ stats.RBI }}</div>

    <div class="w-full text-left col-span-3">Walks</div>
    <div class="w-full text-right col-span-1">{{ stats.BB }}</div>

    <div class="w-full text-left col-span-3">Hit by Pitch</div>
    <div class="w-full text-right col-span-1">{{ stats.HBP }}</div>

    <div class="w-full text-left col-span-3">Strikeouts</div>
    <div class="w-full text-right col-span-1">{{ stats.SO }}</div>

    <div class="w-full text-left col-span-3">Stolen Bases</div>
    <div class="w-full text-right col-span-1">{{ stats.SB }}</div>

    <div class="w-full text-left col-span-3">Caught Stealing</div>
    <div class="w-full text-right col-span-1">{{ stats.CS }}</div>

    <div class="w-full text-left col-span-3">Batting Average</div>
    <div class="w-full text-right col-span-1">{{ stats.AVG }}</div>

    <div class="w-full text-left col-span-3">On-Base Percentage</div>
    <div class="w-full text-right col-span-1">{{ stats.OBP }}</div>

    <div class="w-full text-left col-span-3">Slugging Percentage</div>
    <div class="w-full text-right col-span-1">{{ stats.SLG }}</div>

    <div class="w-full text-left col-span-3">OPS</div>
    <div class="w-full text-right col-span-1">{{ stats.OPS }}</div>

    <div class="w-full text-left col-span-3">WAR</div>
    <div class="w-full text-right col-span-1">{{ stats.WAR }}</div>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';
import { playerByID, playerStatsByID } from '../common/queries.js';
import { teamName } from '../common/utils.js';

const route = useRoute();
if (!route.params.id) {
  throw "Missing player ID";
}

let player = await playerByID(route.params.id);
player = player?.at(0);

let stats = await playerStatsByID(route.params.id)
stats = stats?.at(0);

const teamNames = () => {
  let names = [];
  for (const team of player.team) {
    names.push(teamName(team));
  }
  return names.join(', ');
};
</script>
