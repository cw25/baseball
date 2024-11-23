<template>
  <router-link
    :to="{
      name: 'player_details',
      params: { id: props.player.id },
    }"
  >
    <div class="pt-1 w-full grid grid-cols-12 justify-items-start gap-4">
      <div class="col-span-2">
        {{ props.player.first }}
      </div>
      <div class="col-span-2">
        {{ props.player.last }}
      </div>
      <div class="col-span-1">
        {{ props.player.bat }}
      </div>
      <div class="col-span-1">
        {{ props.player.throw }}
      </div>
      <div class="col-span-3">
        {{ props.player.team }}
      </div>
      <div class="col-span-2">
        {{ props.player.pos }}
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  player: { type: Object, required: true }
});
</script>
