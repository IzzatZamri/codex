import type { CustomDate } from './customDate.types'
export interface Character {
  id: string

  name: string
  fullName?: string
  nickName?: string

  birthDate?: CustomDate
  gender?: string
  race?: string
  subrace?: string

  alignmentCode?: string
  mbtiCode?: string
  enneagramCode?: string

  themeColor?: any // Update this
  theme?: any // update this
  factions?: any // update this (groups factions etc)

  description?: string
  createdAt: string
  updatedAt: string
}

export interface Characters {
  characters: Character[]
}
