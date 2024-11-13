<template>
  <PlayCount :play-count="state.pCount" />
</template>

<script setup>
import { reactive } from "vue";
import { fetchPlaysCount } from "@/common/queries.js";
import PlayCount from '@/components/PlayCount.vue';

const state = reactive({
  pCount: { type: Number },
});

state.pCount = await fetchPlaysCount();
</script>
