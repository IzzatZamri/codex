import { type Tag } from '~/types/tags.types'

export interface Character {
  id: string // uuid v4
  slug: string

  basicInfo: BasicInfo
  attributes: Attributes
  appearance: Appearance
  preferences: Preferences
  socialInfo?: SocialInfo
  personality: Personality

  relationshipIds: string[]
  historyIds: string[] // Key events in the character's past

  worldId?: string // Reference to world data
  createdAt: string
  updatedAt: string
}

export interface BasicInfo {
  name: string // Common Name
  fullName?: string
  nickName?: string
  aliases?: string[]
  description?: string // stored as markdown
  gender?: string
  dateOfBirth?: string // will use custom date format later
  birthPlaceId: string
  raceId: string
  subraceIds: string[]
  tagIds: string[]
}

export interface Attributes {
  stats: Stats
  skills: Skills
}

export interface Appearance {
  themeColor?: string // Color associated with character
  theme?: string // Overall theme, update as necessary
  summary: string
}

export interface Personality {
  personalityCode?: string // Includes alignment, MBTI, Enneagram codes, etc.
  generalPersonality?: string // Brief personality description
  coreMotivation?: string // Core driving force of the character
  notes?: string // Additional notes about the character
}

export interface Preferences {
  favoriteColor: string
  likes: string[]
  dislikes: string[]
  fears: string[]
}

export interface SocialInfo {
  titles?: string[]
  occupations?: string[]
  status?: string[]
  affiliationIds?: string[] // List of groups or organizations the character is affiliated with
  factionIds?: string[] // Update to specify group affiliations (e.g., factions, guilds)
  domainIds?: string[] // List of areas or specialties the character holds domain over
  commandments?: string[] // Set of rules or laws the character adheres to
}

export interface Stats {
  variable: Record<string, StatValue> // Stats that can change, like strength, agility, etc.
  invariable: Record<string, StatValue> // Descriptive stats that don't change, like personality traits or inherent qualities
}

export interface StatValue {
  value: string // The actual value (string type to accommodate various formats like "15n*9", "/0", "stronger than you!", etc.)
  type?: string // Type of the stat (e.g., "numerical", "descriptive", "symbolic", etc.)
}

export interface Skills {
  general: string[] // List of general skills the character possesses
  innate: string[] // List of innate abilities specific to the character
  enlightenment: string[] // List of abilities or powers granted through enlightenment or other means
}

export interface Characters {
  characters: Character[] // Array of character objects
}
