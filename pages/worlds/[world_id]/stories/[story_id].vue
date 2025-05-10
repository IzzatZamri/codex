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

    <div style="display: flex; gap: 30px">
      <IftaLabel>
        <InputText id="title" size="small" v-model="manager.data.title" />
        <label for="title">Title</label>
      </IftaLabel>

      <IftaLabel>
        <InputText id="slug" size="small" v-model="manager.data.slug" />
        <label for="slug">Slug</label>
      </IftaLabel>

      <IftaLabel>
        <InputText
          id="description"
          size="small"
          v-model="manager.data.description"
        />
        <label for="description">Description</label>
      </IftaLabel>

      <Tags v-model="manager.data.tags" />
    </div>

    <IftaLabel>
      <Textarea id="content" size="small" v-model="manager.data.content" />
      <label for="content">Content</label>
    </IftaLabel>

    <Button
      type="button"
      label="Update"
      size="small"
      :loading="isLoading"
      @click="updateStory()"
    />

    <Button
      type="button"
      label="Delete"
      size="small"
      :loading="isLoading"
      @click="deleteStory()"
    />

    <pre>
      {{ manager.data }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { StoryManager } from '~/models/Stories/StoryManager'
import { useToast } from 'primevue/usetoast' // Provided by ToastService

const toast = useToast()
const route = useRoute()
const router = useRouter()
const worldId = route.params.world_id
const storyId = route.params.story_id
const isLoading = ref<boolean>(false)

// Create a reactive instance for manager
const manager = reactive(new StoryManager())

const updateStory = async () => {
  isLoading.value = true
  await manager.update().then(() => {
    isLoading.value = false
    toast.add({
      severity: 'contrast',
      summary: 'Updated',
      detail: 'Story updated successfully!',
      life: 3000,
    })
  })
}

const deleteStory = async () => {
  isLoading.value = true
  await manager.delete().then(() => {
    toast.add({
      severity: 'contrast',
      summary: 'Deleted',
      detail: 'Story deleted successfully!',
      life: 3000,
    })
    isLoading.value = false
  })
  router.push(`/worlds/${worldId}/stories`)
}

const home = ref({
  icon: 'pi pi-home',
  route: '/',
})

const items = computed(() => {
  return [
    { label: 'World', route: '/worlds' },
    { label: `${worldId}`, route: `/worlds/${worldId}` },
    { label: 'Stories', route: `/worlds/${worldId}/stories` },
    {
      label: `${manager.data.title}`,
      route: `/worlds/${worldId}/stories/${storyId}`,
    },
  ]
})

onMounted(async () => {
  await manager.load(storyId as string)
  manager.data.worldId = worldId as string
})
</script>

<style scoped lang="scss"></style>
