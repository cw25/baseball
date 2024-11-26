<template>
    <div class="px-3 rounded-md w-full grid grid-cols-8 font-mono font-bold text-sm">
    <div class="w-full text-left col-span-1">GP</div>
    <div class="w-full text-right col-span-2">{{ props.stats.GP }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">AB</div>
    <div class="w-full text-right col-span-2">{{ props.stats.AB }}</div>

    <div class="w-full text-left col-span-1">R</div>
    <div class="w-full text-right col-span-2">{{ props.stats.R }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">H</div>
    <div class="w-full text-right col-span-2">{{ props.stats.H }}</div>

    <div class="w-full text-left col-span-1">RBI</div>
    <div class="w-full text-right col-span-2">{{ props.stats.RBI }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">2B</div>
    <div class="w-full text-right col-span-2">{{ stats['2B'] }}</div>

    <div class="w-full text-left col-span-1">BB</div>
    <div class="w-full text-right col-span-2">{{ props.stats.BB }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">3B</div>
    <div class="w-full text-right col-span-2">{{ stats['3B'] }}</div>

    <div class="w-full text-left col-span-1">HBP</div>
    <div class="w-full text-right col-span-2">{{ props.stats.HBP }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">HR</div>
    <div class="w-full text-right col-span-2">{{ props.stats.HR }}</div>

    <div class="w-full text-left col-span-1">K</div>
    <div class="w-full text-right col-span-2">{{ props.stats.SO }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">OBP</div>
    <div class="w-full text-right col-span-2">{{ props.stats.OBP }}</div>

    <div class="w-full text-left col-span-1">SB</div>
    <div class="w-full text-right col-span-2">{{ props.stats.SB }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">AVG</div>
    <div class="w-full text-right col-span-2">{{ props.stats.AVG }}</div>

    <div class="w-full text-left col-span-1">CS</div>
    <div class="w-full text-right col-span-2">{{ props.stats.CS }}</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">SLG</div>
    <div class="w-full text-right col-span-2">{{ props.stats.SLG }}</div>

    <div class="w-full text-left col-span-1"></div>
    <div class="w-full text-right col-span-2"></div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">OPS</div>
    <div class="w-full text-right col-span-2">{{ props.stats.OPS }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: { type: Object },
});
</script>
