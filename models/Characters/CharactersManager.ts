import type { Character } from '~/types/characters.types'
import { CharacterManager } from '~/models/Characters/CharacterManager'

export class CharactersManager {
  // Array of CharacterManager instances
  data: CharacterManager[] = []

  constructor(initialData: Character[] = []) {
    // Initialize the manager's data with CharacterManager instances if any initial data is provided.
    this.data = initialData.map((raw) => new CharacterManager(raw))
  }

  /**
   * Fetch all characters with optional filters.
   * Supports simple pagination and search.
   *
   * @param filters - An object with optional keys: page, pageSize, search.
   * @returns A promise that resolves with an array of CharacterManager instances.
   */
  async fetchAll(
    filters: { page?: number; pageSize?: number; search?: string } = {}
  ): Promise<CharacterManager[]> {
    // Build the query string from filters.
    const query = new URLSearchParams()
    if (filters.page) query.append('page', filters.page.toString())
    if (filters.pageSize) query.append('pageSize', filters.pageSize.toString())
    if (filters.search) query.append('search', filters.search)

    // Compose the URL with query parameters if any.
    const url =
      '/api/characters' + (query.toString() ? `?${query.toString()}` : '')

    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) throw new Error('Failed to fetch data')

    // Expecting standardized response: { success: true, data: Character[] }
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Character[]
    }
    if (!success) throw new Error('Failed to fetch data')

    // Wrap each raw Character in a CharacterManager instance.
    this.data = data.map((rawData) => new CharacterManager(rawData))
    return this.data
  }

  // Future methods for pagination or advanced filtering can be added here.
}
