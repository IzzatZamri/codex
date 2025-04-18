// ~/models/TagManager.ts
import { type Tag } from '~/types/tags.types'

export class TagManager {
  // ─────────────────────────────────────────────────────────────
  // STATIC DEFAULTS
  // ─────────────────────────────────────────────────────────────
  private static getEmptyData(): Tag {
    const now = new Date().toISOString()
    return {
      id: '',
      slug: '',
      name: '',
      createdAt: now,
      updatedAt: now,
    }
  }

  // ─────────────────────────────────────────────────────────────
  // INSTANCE DATA
  // ─────────────────────────────────────────────────────────────
  data: Tag

  constructor(data: Tag | null = null) {
    this.data = data ?? TagManager.getEmptyData()
  }

  // ─────────────────────────────────────────────────────────────
  // DATA HANDLING
  // ─────────────────────────────────────────────────────────────
  static async set(id?: string): Promise<TagManager> {
    const manager = new TagManager()
    if (id) await manager.load(id)
    return manager
  }

  async load(id: string) {
    const res = await fetch(`/api/tags/${id}`, { method: 'GET' })
    if (!res.ok) throw new Error('Failed to load')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Tag
    }
    if (!success) throw new Error('Failed to load data')
    this.data = data
  }

  getPayload() {
    const { name, slug } = this.data
    return {
      name,
      slug,
    }
  }

  // ─────────────────────────────────────────────────────────────
  // CRUD OPERATIONS
  // ─────────────────────────────────────────────────────────────
  async create() {
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.getPayload()),
    })
    if (!res.ok) throw new Error('Failed to create')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Tag
    }
    if (!success) throw new Error('Failed to create data')
    this.data = data
    return { success, data }
  }

  async update() {
    const res = await fetch(`/api/tags/${this.data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.getPayload()),
    })
    if (!res.ok) throw new Error('Failed to update')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Tag
    }
    if (!success) throw new Error('Failed to update data')
    this.data = data
    return { success, data }
  }

  async delete() {
    const res = await fetch(`/api/tags/${this.data.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error('Failed to delete')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: null
    }
    if (!success) throw new Error('Failed to delete data')
    return { success, data }
  }
}
