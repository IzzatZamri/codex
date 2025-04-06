<template>
  <div>
    <h1>Character Lists</h1>

    <div>
      <NuxtLink :to="`/worlds/${worldId}/characters/new`">
        + Create New Character
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const worldId = route.params.world_id
</script>

<style scoped lang="scss"></style>
