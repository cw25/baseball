<template>
  <div class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
    Pitching Probabilities
    <span class="text-xs">(approx.)</span>
  </div>

  <div class="px-3 rounded-md w-full grid grid-cols-8 font-mono font-bold text-sm">
    <div class="w-full text-left col-span-1">GB%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.gb_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">FB%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.fb_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">HBP%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.hbp_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">K%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.k_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">LO%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.lo_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">BB%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.walk_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">HR%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.hr_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">1B%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.single_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">2B%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.double_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">3B%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.triple_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">WP%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.wp_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1">PB%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.pb_pcg).toFixed(2) }}%</div>

    <div class="w-full text-left col-span-1">BALK%</div>
    <div class="w-full text-right col-span-2">{{ (100 * props.outcomes.bk_pcg).toFixed(2) }}%</div>
    <div class="col-span-2"></div>
    <div class="w-full text-left col-span-1"></div>
    <div class="w-full text-right col-span-2"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  outcomes: { type: Object },
});
</script>
