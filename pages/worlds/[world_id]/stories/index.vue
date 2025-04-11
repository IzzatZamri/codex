<template>
  <div>
    <h1>Story Lists</h1>
    <div>
      <NuxtLink :to="`/worlds/${worldId}/stories/new`"> + Create </NuxtLink>

      <hr />
      <div>
        <div v-if="loading">Loading stories...</div>
        <div v-if="error">{{ error }}</div>
        <div v-else>
          <div v-for="(context, index) in storiesManager.data" :key="index">
            <NuxtLink :to="`/worlds/${worldId}/stories/${context.data.id}`">
              {{ context.data.title }}
            </NuxtLink>
            <pre>
              {{ context.data }}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const worldId = route.params.world_id

import { onMounted, reactive, ref } from 'vue'
import { StoriesManager } from '~/models/Stories/StoriesManager'

const storiesManager = reactive(new StoriesManager())
const loading = ref(false)
const error = ref<string | null>(null)

const loadStories = async () => {
  loading.value = true
  error.value = null
  try {
    // Use filters if needed: { page: 1, pageSize: 10, search: 'example' }
    await storiesManager.fetchAll()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStories()
})
</script>

<style scoped lang="scss"></style>
