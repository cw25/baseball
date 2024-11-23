<template>
  {{ player }}
</template>


<script setup>
import { useRoute } from 'vue-router';
import { playerStatsByID } from '../common/queries.js';

const route = useRoute();
if (!route.params.id) {
  throw "Missing player ID";
}

const player = await playerStatsByID(route.params.id);
</script>
