import type { Tag } from '~/types/tags.types'
import { TagManager } from '~/models/Tags/TagManager'

export class TagsManager {
  // Array of TagManager instances
  data: TagManager[] = []

  constructor(initialData: Tag[] = []) {
    // Initialize the manager's data with TagManager instances if any initial data is provided.
    this.data = initialData.map((raw) => new TagManager(raw))
  }

  /**
   * Fetch all tags with optional filters.
   * Supports simple pagination and search.
   *
   * @param filters - An object with optional keys: page, pageSize, search.
   * @returns A promise that resolves with an array of TagManager instances.
   */
  async fetchAll(
    filters: { page?: number; pageSize?: number; search?: string } = {}
  ): Promise<TagManager[]> {
    // Build the query string from filters.
    const query = new URLSearchParams()
    if (filters.page) query.append('page', filters.page.toString())
    if (filters.pageSize) query.append('pageSize', filters.pageSize.toString())
    if (filters.search) query.append('search', filters.search)

    // Compose the URL with query parameters if any.
    const url = '/api/tags' + (query.toString() ? `?${query.toString()}` : '')

    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) throw new Error('Failed to fetch data')

    // Expecting standardized response: { success: true, data: Tag[] }
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Tag[]
    }
    if (!success) throw new Error('Failed to fetch data')

    // Wrap each raw Tag in a TagManager instance.
    this.data = data.map((rawData) => new TagManager(rawData))
    return this.data
  }

  // Future methods for pagination or advanced filtering can be added here.
}
