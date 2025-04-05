<template>
  <div class="p-4 bg-gray-100 rounded-lg">
    <div>
      <input v-model="name" placeholder="World Name" />
      <input v-model="slug" placeholder="Your World Slug" />
      <input v-model="tags" placeholder="Your World tags" />
    </div>
    <div>
      <MarkdownEditor
        v-model="description"
        :editMode="isEditMode"
        @update:editMode="isEditMode = $event"
      />
    </div>
    <button
      @click="addData"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
    >
      Add Worlds
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/types/items.types'
import MarkdownEditor from '@/components/common/editor/index.vue' // Adjust path as needed
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const name = ref<string>('')
const slug = ref<string>('')
const tags = ref<string>('')
const description = ref<string>('Describe Your World!')
const isEditMode = ref(true)

// Reactive list to store fetched items
const items = ref<Item[]>([])

const {
  public: { apiBase },
} = useRuntimeConfig()

async function addData() {
  const data = {
    name: name.value,
    description: description.value,
    slug: slug.value,
    tags: tags.value,
  }

  const res = await fetch('/api/worlds', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const newData = await res.json()
  router.push(`/worlds/${newData.slug}`)
}
</script>
