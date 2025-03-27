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
  perception: string // 'Sensing' | 'Intuition'
  decision: string // 'Thinking' | 'Feeling'
  structure: string // 'Judging' | 'Perceiving'
  identity: string // 'Assertive' | 'Turbulent'
}

export interface Enneagram {
  name: string
  code: string
  main: string
  wing?: string
  variant?: string
}

export interface EnneagramType {
  name: string
  code: string
}
