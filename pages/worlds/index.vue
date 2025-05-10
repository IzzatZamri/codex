<template>
  <div>
    <h1>Worlds</h1>
    <div class="p-4 bg-gray-100 rounded-lg">
      <NuxtLink to="/worlds/new">Create New</NuxtLink>
      <hr />
      <div class="mt-4">
        <NuxtLink
          v-for="(world, index) in data"
          :key="world.id"
          :to="`/worlds/${world.slug}/`"
          class="block py-1"
        >
          {{ index + 1 }} - {{ world.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { World } from '@/types/worlds.types'

const data = ref<World[]>([])

const {
  public: { apiBase },
} = useRuntimeConfig()

// Function to fetch worlds data
async function fetchData() {
  const res = await fetch('/api/worlds')
  const { datas } = await res.json() // Destructure directly for better clarity
  data.value = datas
}

onMounted(fetchData)
</script>
<style scoped lang="scss"></style>
