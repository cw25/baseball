<template>
  <!-- Play Count: {{ props.playCount }} -->
  Freddie: {{ props.freddie }}

  Expected: {{ [161,637,131,211,59,2,29,102,72,16,121,23,1,.331,.410,.567,.976,6.6] }}
</template>

<script setup>
const props = defineProps({
  playCount: { type: Number, default: 0 },
  freddie: { type: Object, default: null },
});
</script>
