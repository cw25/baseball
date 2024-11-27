<template>
  <div class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
    Batting Probabilities
    <span class="text-xs">(approx.)</span>
  </div>

  <div class="px-3 rounded-md w-full grid grid-cols-8 font-mono font-bold text-sm">
    <div class="w-full text-left col-span-1">BB</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.walk_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">1B</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.single_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">HBP</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.hbp_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">2B</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.double_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">K</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.k_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">3B</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.triple_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">OUT</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.out_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">HR</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.hr_pcg).toFixed(2) }}%</div>
  </div>
</template>

<script setup>
const props = defineProps({
  outcomes: { type: Object },
});
</script>
