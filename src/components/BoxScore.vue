<template>
  <div class="grid grid-cols-24 border rounded-md">
    <div class="col-span-6 border bg-gray-100 font-bold"></div>
    <div class="col-span-1 border bg-gray-100 font-bold">1</div>
    <div class="col-span-1 border bg-gray-100 font-bold">2</div>
    <div class="col-span-1 border bg-gray-100 font-bold">3</div>
    <div class="col-span-1 border bg-gray-100 font-bold">4</div>
    <div class="col-span-1 border bg-gray-100 font-bold">5</div>
    <div class="col-span-1 border bg-gray-100 font-bold">6</div>
    <div class="col-span-1 border bg-gray-100 font-bold">7</div>
    <div class="col-span-1 border bg-gray-100 font-bold">8</div>
    <div class="col-span-1 border bg-gray-100 font-bold">9</div>
    <div class="col-span-3 border bg-gray-100 font-bold">R</div>
    <div class="col-span-3 border bg-gray-100 font-bold">H</div>
    <div class="col-span-3 border bg-gray-100 font-bold">E</div>

    <div class="col-span-6 border">{{ props.game.visitorTeam }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[0] }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[1] }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[2] }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[3] }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[4] }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[5] }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[6] }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[7] }}</div>
    <div class="col-span-1 border">{{ props.game.status.visitorScoring[8] }}</div>
    <div class="col-span-3 border">{{ props.game.status.visitorScore }}</div>
    <div class="col-span-3 border"></div>
    <div class="col-span-3 border"></div>

    <div class="col-span-6 border">{{ props.game.homeTeam }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[0] }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[1] }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[2] }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[3] }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[4] }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[5] }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[6] }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[7] }}</div>
    <div class="col-span-1 border">{{ props.game.status.homeScoring[8] }}</div>
    <div class="col-span-3 border">{{ props.game.status.homeScore }}</div>
    <div class="col-span-3 border"></div>
    <div class="col-span-3 border"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: { type: Object, required: true },
});
</script>