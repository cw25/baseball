<template>
  <router-link
    :to="{
      name: 'player_details',
      params: { id: props.player.id },
    }"
  >
    <div class="pt-1 w-full grid grid-cols-12 border-b border-b-dodgerblue">
      <div class="col-span-3 text-left text-nowrap">
        {{ props.player.first }}
      </div>
      <div class="col-span-3 text-left text-nowrap overflow-hidden">
        {{ props.player.last }}
      </div>
      <div class="col-span-1 text-left text-right">
        {{ props.player.bat }}
      </div>
      <div class="col-span-1 text-left text-center">
        {{ props.player.throw }}
      </div>
      <div class="col-span-2 text-left text-nowrap">
        {{ props.player.team }}
      </div>
      <div class="col-span-2 text-center">
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
