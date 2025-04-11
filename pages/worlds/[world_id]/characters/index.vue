<template>
  <div>
    <h1>Character Lists</h1>

    <div>
      <NuxtLink :to="`/worlds/${worldId}/characters/new`"> + Create </NuxtLink>

      <hr />
      <div class="mt-4">
        <NuxtLink
          v-for="(c, index) in data"
          :key="c.id"
          :to="`/worlds/${worldId}/characters/${c.id}`"
          class="block py-1"
        >
          >
          {{ index + 1 }} - {{ c.basicInfo.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const worldId = route.params.world_id

import { onMounted, ref } from 'vue'
import type { Character } from '@/types/characters.types'

const data = ref<Character[]>([])

const {
  public: { apiBase },
} = useRuntimeConfig()

// Function to fetch worlds data
async function fetchData() {
  const res = await fetch('/api/characters')
  const { datas } = await res.json() // Destructure directly for better clarity
  data.value = datas
}

onMounted(fetchData)
</script>

<style scoped lang="scss"></style>
