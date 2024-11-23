<template>
  <ul>
    <li>
      <router-link
          :to="{
            name: 'player_search',
          }"
        >
        Players
      </router-link>
    </li>
    <li>
      <router-link
          :to="{
            name: 'player_search',
          }"
        >
        Teams
      </router-link>
    </li><li>
      <router-link
          :to="{
            name: 'player_search',
          }"
        >
        Today's Games
      </router-link>
    </li>
  </ul>
</template>

<script setup>
</script>
