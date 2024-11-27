<template>
  <div class="px-3 rounded-md w-full grid grid-cols-8 font-mono font-bold text-sm">
    <div class="w-full text-left col-span-1">GP</div>
    <div class="w-full text-right col-span-2">{{ props.stats.GP }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">GS</div>
    <div class="w-full text-right col-span-2">{{ props.stats.GS }}</div>

    <div class="w-full text-left col-span-1">SHO</div>
    <div class="w-full text-right col-span-2">{{ props.stats.SHO }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">IP</div>
    <div class="w-full text-right col-span-2">{{ props.stats.IP }}</div>

    <div class="w-full text-left col-span-1">H</div>
    <div class="w-full text-right col-span-2">{{ props.stats.H }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">R</div>
    <div class="w-full text-right col-span-2">{{ props.stats.R }}</div>

    <div class="w-full text-left col-span-1">ER</div>
    <div class="w-full text-right col-span-2">{{ props.stats.ER }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">HR</div>
    <div class="w-full text-right col-span-2">{{ props.stats.HR }}</div>

    <div class="w-full text-left col-span-1">BB</div>
    <div class="w-full text-right col-span-2">{{ props.stats.BB }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">K</div>
    <div class="w-full text-right col-span-2">{{ props.stats.K }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: { type: Object },
});
</script>
