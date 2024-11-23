<template>
  <div class="pt-1.5 w-full">
    {{ props.player.id }}
    {{ props.player.first }}
    {{ props.player.last }}
    {{ props.player.bat }}
    {{ props.player.throw }}
    {{ props.player.team }}
    {{ props.player.pos }}
  </div>
</template>

<script setup>
const props = defineProps({
  player: { type: Object, required: true }
});
</script>
