<template>
  <ul>
    <li>
      <router-link
          :to="{
            name: 'plays_count',
          }"
        >
        Plays Count (demo)
      </router-link>
    </li>
    <li>
      <router-link
          :to="{
            name: 'player_search',
          }"
        >
        Player Search
      </router-link>
    </li>
  </ul>
</template>

<script setup>
</script>
