<template>
  <div>
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Breadcrumb>

    <h1>Character Lists</h1>

    <div>
      <NuxtLink :to="`/worlds/${worldId}/characters/new`"> + Create </NuxtLink>

      <hr />
      <div>
        <div v-if="loading">Loading stories...</div>
        <div v-if="error">{{ error }}</div>
        <div v-else>
          <div v-for="(context, index) in charactersManager.data" :key="index">
            <NuxtLink :to="`/worlds/${worldId}/stories/${context.data.id}`">
              {{ context.data.basicInfo.name }}
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
import { CharactersManager } from '~/models/Characters/CharactersManager'

const charactersManager = reactive(new CharactersManager())
const loading = ref(false)
const error = ref<string | null>(null)

const loadCharacters = async () => {
  loading.value = true
  error.value = null
  try {
    // Use filters if needed: { page: 1, pageSize: 10, search: 'example' }
    await charactersManager.fetchAll()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const home = ref({
  icon: 'pi pi-home',
  route: '/',
})
const items = computed(() => {
  return [
    { label: 'World', route: '/worlds' },
    { label: `${worldId}`, route: `/worlds/${worldId}` },
    { label: 'Characters', route: `/worlds/${worldId}/characters` },
  ]
})

onMounted(() => {
  loadCharacters()
})
</script>

<style scoped lang="scss"></style>
