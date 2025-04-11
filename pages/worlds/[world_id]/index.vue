<template>
  <div>
    <h1>{{ world?.name || 'World Not Found' }}</h1>
    <div v-if="world !== null">
      <MarkdownEditor
        v-model="world.description"
        :editMode="isEditMode"
        :showToolbar="false"
        @update:editMode="isEditMode = $event"
      />
    </div>

    <ul v-if="world">
      <li>
        <h2>Characters</h2>
        <div>
          <NuxtLink :to="`/worlds/${world.slug}/characters`"
            >Characters List</NuxtLink
          >
        </div>
        <div>
          <NuxtLink :to="`/worlds/${world.slug}/characters/new`"
            >New Characters</NuxtLink
          >
        </div>
      </li>

      <li>
        <h2>Stories</h2>
        <div>
          <NuxtLink :to="`/worlds/${world.slug}/stories`">Story List</NuxtLink>
        </div>
        <div>
          <NuxtLink :to="`/worlds/${world.slug}/stories/new`"
            >New Story</NuxtLink
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { World } from '@/types/worlds.types'
import MarkdownEditor from '@/components/common/editor/index.vue' // Adjust path as needed

const route = useRoute()
const world = ref<World | null>(null)
const isEditMode = ref(false)

const {
  public: { apiBase },
} = useRuntimeConfig()

async function fetchWorld() {
  const id = route.params.world_id
  const res = await fetch(`/api/worlds/${id}`)

  if (res.ok) {
    const val = await res.json()
    world.value = val.data
  } else {
    console.error('Failed to load world')
  }
}

onMounted(fetchWorld)
</script>

<style scoped lang="scss"></style>
