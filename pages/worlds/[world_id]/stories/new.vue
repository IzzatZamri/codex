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

    <h1>Create A Story</h1>

    <IftaLabel>
      <InputText id="username" v-model="value" variant="filled" />
      <label for="username">Username</label>
    </IftaLabel>

    <div @click="createStory()">Create</div>
    <pre>
      {{ manager.data }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { StoryManager } from '~/models/Stories/StoryManager'

// Create a reactive instance for manager
const manager = reactive(new StoryManager())
manager.data.title = 'Hello World'

const createStory = async () => {
  await manager.create().then(() => {
    console.log(manager.data) // Check if data gets updated
  })
}

const route = useRoute()
const worldId = route.params.world_id
const value = ref('')

const home = ref({
  icon: 'pi pi-home',
  route: '/',
})

const items = ref([
  { label: 'World', route: '/worlds' },
  { label: `${worldId}`, route: `/worlds/${worldId}` },
  { label: 'Stories', route: `/worlds/${worldId}/stories` },
  { label: 'New', route: `/worlds/${worldId}/stories/new` },
])
</script>

<style scoped lang="scss"></style>
