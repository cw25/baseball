<template>
  <PlayCount :play-count="state.pCount" :freddie="state.freddie" />
</template>

<script setup>
import { reactive } from "vue";
import { fetchPlaysCount, playerStatsByID } from "@/common/queries.js";
import PlayCount from '@/components/PlayCount.vue';

const state = reactive({
  pCount: { type: Number },
});

state.pCount = await fetchPlaysCount();
state.freddie = await playerStatsByID('freef001');
</script>
