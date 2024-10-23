<template>
  Play Count: {{ props.playCount }}
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  playCount: { type: Number, default: 0 }
});
</script>
