import type { Story } from '~/types/stories.types'
import { StoryManager } from '~/models/Stories/StoryManager'

export class StoriesManager {
  // Array of StoryManager instances
  data: StoryManager[] = []

  constructor(initialData: Story[] = []) {
    // Initialize the manager's data with StoryManager instances if any initial data is provided.
    this.data = initialData.map((raw) => new StoryManager(raw))
  }

  /**
   * Fetch all stories with optional filters.
   * Supports simple pagination and search.
   *
   * @param filters - An object with optional keys: page, pageSize, search.
   * @returns A promise that resolves with an array of StoryManager instances.
   */
  async fetchAll(
    filters: { page?: number; pageSize?: number; search?: string } = {}
  ): Promise<StoryManager[]> {
    // Build the query string from filters.
    const query = new URLSearchParams()
    if (filters.page) query.append('page', filters.page.toString())
    if (filters.pageSize) query.append('pageSize', filters.pageSize.toString())
    if (filters.search) query.append('search', filters.search)

    // Compose the URL with query parameters if any.
    const url =
      '/api/stories' + (query.toString() ? `?${query.toString()}` : '')

    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) throw new Error('Failed to fetch data')

    // Expecting standardized response: { success: true, data: Story[] }
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Story[]
    }
    if (!success) throw new Error('Failed to fetch data')

    // Wrap each raw Story in a StoryManager instance.
    this.data = data.map((rawData) => new StoryManager(rawData))
    return this.data
  }

  // Future methods for pagination or advanced filtering can be added here.
}
