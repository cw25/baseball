<template>
  <div class="w-full">
    <Suspense>
      <RouterView />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
