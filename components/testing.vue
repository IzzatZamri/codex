<template>
  <div class="p-4 bg-gray-100 rounded-lg">
    <CommonDate v-model="dateData" />
    <button
      @click="addItem"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
    >
      Add Item
    </button>
    <button
      @click="fetchItems"
      class="px-4 py-2 bg-green-500 text-white rounded-lg"
    >
      Fetch Items
    </button>

    <div class="mt-4">
      <h2 class="text-lg font-bold">Items:</h2>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} - {{ item.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/types/items.types'
import type { CustomDate } from '@/types/customDate.types'
import CommonDate from '~/components/common/date.vue'
import { ref } from 'vue'

// Reactive list to store fetched items
const items = ref<Item[]>([])
const dateData = ref<CustomDate>({
  year: 0,
  month: 0,
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
})

const {
  public: { apiBase },
} = useRuntimeConfig()

// Function to add a dummy item
async function addItem() {
  const dummyItem = {
    name: 'Test Item',
    description: 'This is a dummy item',
  }

  const res = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dummyItem),
  })

  const newItem = await res.json()
  console.log('Added Item:', newItem)
}

// Function to fetch and log items
async function fetchItems() {
  const res = await fetch('/api/items')
  const data = await res.json()
  items.value = data.items

  console.log('Item List:', items.value)
}
</script>
