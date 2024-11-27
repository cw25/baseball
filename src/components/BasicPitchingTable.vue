<template>
<!--
SNELL

W	  L	 W%	  WAR	ERA	  WHIP	K/BB SV	HLD	BLSV
14	9	.609	6.0	2.25	1.19	2.4	 0	  0	  0

P	    TBF	P-TBF	     OBA	OOBP	OSLUG	OOPS	2B	3B	TB	RBI	BH	SH	SF	IBB
3168	742	3168/742	.181	.293	.286	.579	22	0	  182	42	3	  0	  3	  0

P/S	  P/I	  K/9	  QS	CG	GSC	  GB	FB	G/F	IR	IRS	WP	BK	SB	CS	RSUP
99.0	17.6	11.7	20	0	  61.4	177	228	0.8	0	  0	  13	2	  25	1	  134.0
-->


  <div class="leading-6 w-full border-b-4 border-dodgerblue pb-1 text-left text-lg font-bold mt-6 mb-2">
    2023 Pitching Stats
  </div>

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
