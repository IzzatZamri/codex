export interface Personalities {
  personalities: Personality[]
}

export interface PersonalityInput {
  alignmentCode: string
  mbtiCode: string
  enneagramCode: string
}

export interface Personality {
  code: string
  alignment: Alignment
  mbti: Mbti
  enneagram: Enneagram
}

export interface Alignment {
  name: string
  code: string
  order: string // 'Lawful' | 'Neutral' | 'Chaotic'
  morality: string // 'Good' | 'Neutral' | 'Evil'
}

export interface Mbti {
  name: string
  code: string
  energy: string // 'Extraversion' | 'Introversion'
  energyValue?: number // -100 to 100
  perception: string // 'Sensing' | 'Intuition'
  perceptionValue?: number // -100 to 100
  decision: string // 'Thinking' | 'Feeling'
  decisionValue?: number // -100 to 100
  structure: string // 'Judging' | 'Perceiving'
  structureValue?: number // -100 to 100
  identity: string // 'Assertive' | 'Turbulent'
  identityValue?: number // -100 to 100
}

export interface Enneagram {
  name: string
  code: string
  main?: string
  wing?: string
  variant?: string
  description?: string
}

export interface EnneagramType {
  name: string
  code: string
}
