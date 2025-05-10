// ~/models/CharacterManager.ts
import { type Character } from '~/types/characters.types'

export class CharacterManager {
  // ─────────────────────────────────────────────────────────────
  // STATIC DEFAULTS
  // ─────────────────────────────────────────────────────────────
  static TARGET_API = '/api/characters'
  private static getEmptyData(): Character {
    const now = new Date().toISOString()
    return {
      id: '',
      slug: '',

      basicInfo: {
        name: '',
        fullName: '',
        nickName: '',
        aliases: [],
        gender: '',
        dateOfBirth: '',
        birthPlaceId: '',
        raceId: '',
        subraceIds: [],
        description: '',
        tagIds: [],
      },

      attributes: {
        stats: {
          variable: {
            Strength: {
              value: '0',
              type: 'number',
            },
            Endurance: {
              value: '0',
              type: 'number',
            },
            Agility: {
              value: '2',
              type: 'number',
            },
            Dexterity: {
              value: '0',
              type: 'number',
            },
            Reflex: {
              value: '0',
              type: 'number',
            },
            Perception: {
              value: '0',
              type: 'number',
            },
            Magi: {
              value: '0',
              type: 'number',
            },
            Health: {
              value: '0',
              type: 'number',
            },
          },
          invariable: {
            Intelligence: {
              value: '',
              type: 'descriptive',
            },
            Perseverance: {
              value: '',
              type: 'descriptive',
            },
            Soul: {
              value: '',
              type: 'descriptive',
            },
            Luck: {
              value: '',
              type: 'descriptive',
            },
            Charm: {
              value: '',
              type: 'descriptive',
            },
          },
        },
        skills: {
          general: [],
          innate: [],
          enlightenment: [],
        },
      },

      appearance: {
        themeColor: '',
        theme: '',
        summary: '',
      },

      personality: {
        personalityCode: '',
        generalPersonality: '',
        coreMotivation: '',
        notes: '',
      },

      preferences: {
        favoriteColor: '',
        likes: [],
        dislikes: [],
        fears: [],
      },

      socialInfo: {
        titles: [],
        occupations: [],
        status: [],
        affiliationIds: [],
        factionIds: [],
        domainIds: [],
        commandments: [],
      },

      relationshipIds: [],
      historyIds: [],

      worldId: '',
      createdAt: now,
      updatedAt: now,
    }
  }

  // ─────────────────────────────────────────────────────────────
  // INSTANCE DATA
  // ─────────────────────────────────────────────────────────────
  data: Character

  constructor(data: Character | null = null) {
    this.data = data ?? CharacterManager.getEmptyData()
  }

  // ─────────────────────────────────────────────────────────────
  // DATA HANDLING
  // ─────────────────────────────────────────────────────────────
  static async set(id?: string): Promise<CharacterManager> {
    const manager = new CharacterManager()
    if (id) await manager.load(id)
    return manager
  }

  async load(id: string) {
    const res = await fetch(`${CharacterManager.TARGET_API}/${id}`, {
      method: 'GET',
    })
    if (!res.ok) throw new Error('Failed to load')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Character
    }
    if (!success) throw new Error('Failed to load data')
    this.data = data
  }

  getPayload() {
    const {
      slug,
      basicInfo,
      attributes,
      appearance,
      personality,
      preferences,
      socialInfo,
      relationshipIds,
      historyIds,
      worldId,
    } = this.data
    return {
      slug,
      basicInfo,
      attributes,
      appearance,
      personality,
      preferences,
      socialInfo,
      relationshipIds,
      historyIds,
      worldId,
    }
  }

  // ─────────────────────────────────────────────────────────────
  // CRUD OPERATIONS
  // ─────────────────────────────────────────────────────────────
  async create() {
    const res = await fetch(`${CharacterManager.TARGET_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.getPayload()),
    })
    if (!res.ok) throw new Error('Failed to create')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Character
    }
    if (!success) throw new Error('Failed to create data')
    this.data = data
    return { success, data }
  }

  async update() {
    const res = await fetch(`${CharacterManager.TARGET_API}/${this.data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.getPayload()),
    })
    if (!res.ok) throw new Error('Failed to update')
    const { success, data } = (await res.json()) as {
      success: boolean
      data: Character
    }
    if (!success) throw new Error('Failed to update data')
    this.data = data
    return { success, data }
  }

  async delete() {
    const res = await fetch(`${CharacterManager.TARGET_API}/${this.data.id}`, {
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
