// ~/models/StoryManager.ts
import { type Story } from '~/types/stories.types'

export class StoryManager {
  // ─────────────────────────────────────────────────────────────
  // STATIC DEFAULTS
  // ─────────────────────────────────────────────────────────────
  static DEFAULT_TITLE = 'My Title'
  static TAG_LIST = ['A', 'B']

  static getRandomTag() {
    const index = Math.floor(Math.random() * StoryManager.TAG_LIST.length)
    return StoryManager.TAG_LIST[index]
  }

  private static getEmptyStory(): Story {
    const now = new Date().toISOString()
    return {
      id: '',
      slug: '',
      title: StoryManager.DEFAULT_TITLE,
      description: '',
      tags: [],
      timeline: { start: '', end: '' },
      content: '',
      locationIds: [],
      worldId: '',
      createdAt: now,
      updatedAt: now,
    }
  }

  // ─────────────────────────────────────────────────────────────
  // INSTANCE DATA
  // ─────────────────────────────────────────────────────────────
  data: Story

  constructor(data: Story | null = null) {
    this.data = data ?? StoryManager.getEmptyStory()
  }

  // ─────────────────────────────────────────────────────────────
  // DATA HANDLING
  // ─────────────────────────────────────────────────────────────
  static async set(id?: string): Promise<StoryManager> {
    const manager = new StoryManager()
    if (id) await manager.load(id)
    return manager
  }

  async load(id: string) {
    const res = await fetch(`/api/stories/${id}`, { method: 'GET' })
    if (!res.ok) throw new Error('Failed to load')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Story
    }
    if (!success) throw new Error('Failed to load story')
    this.data = data
  }

  getPayload() {
    const {
      title,
      content,
      description,
      tags,
      timeline,
      worldId,
      locationIds,
    } = this.data
    return {
      title,
      content,
      description,
      tags,
      timeline,
      worldId,
      locationIds,
    }
  }

  // ─────────────────────────────────────────────────────────────
  // CRUD OPERATIONS
  // ─────────────────────────────────────────────────────────────
  async create() {
    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.getPayload()),
    })
    if (!res.ok) throw new Error('Failed to create')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Story
    }
    if (!success) throw new Error('Failed to create story')
    this.data = data
    return { success, data }
  }

  async update() {
    const res = await fetch(`/api/stories/${this.data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.getPayload()),
    })
    if (!res.ok) throw new Error('Failed to update')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Story
    }
    if (!success) throw new Error('Failed to update story')
    this.data = data
    return { success, data }
  }

  async delete() {
    const res = await fetch(`/api/stories/${this.data.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error('Failed to delete')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: null
    }
    if (!success) throw new Error('Failed to delete story')
    return { success, data }
  }
}
