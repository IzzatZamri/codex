import { ref } from 'vue'
import type { Item } from '@/types/items.types' // Adjust the path based on your project structure

// Reactive variable to hold items list
const items = ref<Item[]>([])

export function useItems() {
  /**
   * Fetch all items from the API
   */
  async function fetchItems() {
    const res = await fetch('/api/v1/items')
    const data = await res.json()
    items.value = data.items
    return items.value
  }

  /**
   * Add a new item using the API
   * @param newItem - The new item data
   */
  async function addItem(newItem: Omit<Item, 'id'>) {
    const res = await fetch('/api/v1/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
    const createdItem = await res.json()
    // Optionally update local state
    items.value.push(createdItem)
    return createdItem
  }

  /**
   * Update an item by its ID
   * @param id - The item ID
   * @param updatedData - Data to update the item
   */
  async function updateItem(
    id: string,
    updatedData: Partial<Omit<Item, 'id'>>
  ) {
    const res = await fetch(`/api/v1/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    const updatedItem = await res.json()
    // Optionally update local state
    const index = items.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      items.value[index] = updatedItem
    }
    return updatedItem
  }

  /**
   * Delete an item by its ID
   * @param id - The item ID
   */
  async function deleteItem(id: string) {
    const res = await fetch(`/api/v1/items/${id}`, {
      method: 'DELETE',
    })
    const result = await res.json()
    // Optionally update local state
    items.value = items.value.filter((item) => item.id !== id)
    return result
  }

  return {
    items,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  }
}
