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

    <h1>Update A Story</h1>

    <IftaLabel>
      <InputText id="username" v-model="value" variant="filled" />
      <label for="username">Username</label>
    </IftaLabel>

    <Button
      type="button"
      label="Update"
      size="small"
      :loading="isLoading"
      @click="updateStory()"
    />

    <pre>
      {{ manager.data }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { StoryManager } from '~/models/Stories/StoryManager'

const route = useRoute()
const worldId = route.params.world_id
const storyId = route.params.story_id
const value = ref('')
const isLoading = ref<boolean>(false)

// Create a reactive instance for manager
const manager = reactive(new StoryManager())

const updateStory = async () => {
  isLoading.value = true
  await manager.update().then(() => {
    isLoading.value = false
    console.log(manager.data) // Check if data gets updated
  })
}

const home = ref({
  icon: 'pi pi-home',
  route: '/',
})

const items = ref([
  { label: 'World', route: '/worlds' },
  { label: `${worldId}`, route: `/worlds/${worldId}` },
  { label: 'Stories', route: `/worlds/${worldId}/stories` },
  {
    label: `${manager.data.title}`,
    route: `/worlds/${worldId}/stories/${storyId}`,
  },
])

onMounted(() => {
  manager.load(storyId as string)
})
</script>

<style scoped lang="scss"></style>
