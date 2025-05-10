// ~/composables/useFuseSearch.ts
import Fuse from 'fuse.js'
import { ref, computed } from 'vue'

// Generic composable for fuzzy searching an array of items
export function useFuseSearch<T>(data: T[], keys: (keyof T)[]) {
  // Initialize Fuse.js with your data and search keys
  const fuse = new Fuse(data, {
    keys: keys as string[], // Fuse expects keys as string array
    threshold: 0.4, // adjust to control fuzziness (lower: stricter, higher: more fuzzy)
  })

  // Reactive query input
  const query = ref('')

  // Computed results based on the query
  const results = computed(() => {
    if (!query.value.trim()) {
      return data
    }
    // Run Fuse search and return matching items
    return fuse.search(query.value).map((result) => result.item)
  })

  return { query, results }
}
