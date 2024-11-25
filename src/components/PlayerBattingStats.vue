<template>
  <div class="border border-2 px-2 rounded-md w-full grid grid-cols-4 mt-2 font-mono text-xs">
    <div class="w-full text-left col-span-3">Games Played</div>
    <div class="w-full text-right col-span-1">{{ props.stats.GP }}</div>

    <div class="w-full text-left col-span-3">At-Bats</div>
    <div class="w-full text-right col-span-1">{{ props.stats.AB }}</div>

    <div class="w-full text-left col-span-3">Runs</div>
    <div class="w-full text-right col-span-1">{{ props.stats.R }}</div>

    <div class="w-full text-left col-span-3">Hits</div>
    <div class="w-full text-right col-span-1">{{ props.stats.H }}</div>

    <div class="w-full text-left col-span-3">Doubles</div>
    <div class="w-full text-right col-span-1">{{ stats['2B'] }}</div>

    <div class="w-full text-left col-span-3">Triples</div>
    <div class="w-full text-right col-span-1">{{ stats['3B'] }}</div>

    <div class="w-full text-left col-span-3">Home Runs</div>
    <div class="w-full text-right col-span-1">{{ props.stats.HR }}</div>

    <div class="w-full text-left col-span-3">RBI</div>
    <div class="w-full text-right col-span-1">{{ props.stats.RBI }}</div>

    <div class="w-full text-left col-span-3">Walks</div>
    <div class="w-full text-right col-span-1">{{ props.stats.BB }}</div>

    <div class="w-full text-left col-span-3">Hit by Pitch</div>
    <div class="w-full text-right col-span-1">{{ props.stats.HBP }}</div>

    <div class="w-full text-left col-span-3">Strikeouts</div>
    <div class="w-full text-right col-span-1">{{ props.stats.SO }}</div>

    <div class="w-full text-left col-span-3">Stolen Bases</div>
    <div class="w-full text-right col-span-1">{{ props.stats.SB }}</div>

    <div class="w-full text-left col-span-3">Caught Stealing</div>
    <div class="w-full text-right col-span-1">{{ props.stats.CS }}</div>

    <div class="w-full text-left col-span-3">Batting Average</div>
    <div class="w-full text-right col-span-1">{{ props.stats.AVG }}</div>

    <div class="w-full text-left col-span-3">On-Base Percentage</div>
    <div class="w-full text-right col-span-1">{{ props.stats.OBP }}</div>

    <div class="w-full text-left col-span-3">Slugging Percentage</div>
    <div class="w-full text-right col-span-1">{{ props.stats.SLG }}</div>

    <div class="w-full text-left col-span-3">OPS</div>
    <div class="w-full text-right col-span-1">{{ props.stats.OPS }}</div>

    <div class="w-full text-left col-span-3">WAR</div>
    <div class="w-full text-right col-span-1">{{ props.stats.WAR }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: { type: Object },
});
</script>