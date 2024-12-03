<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <div>
        <div class="w-full text-sm">
          <component :is="Component"></component>
        </div>
        <BottomNavBar />
      </div>
    </template>
  </RouterView>
</template>

<script setup>
import DatabaseballLogo from "@/components/DatabaseballLogo.vue";
import BottomNavBar from '@/components/BottomNavBar.vue';
import { waitOnDB } from '@/common/queries.js';
await waitOnDB();
</script>