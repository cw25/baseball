<template>
  <div class="w-full">
    <Suspense>
      <PageContainer />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import PageContainer from "@/components/PageContainer.vue";
</script>
