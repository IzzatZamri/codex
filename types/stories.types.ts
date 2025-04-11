export interface Story {
  id: string // uuid v4
  slug: string
  title: string
  description?: string // Brief description of the story
  tags?: string[] // Tags related to the story
  timeline?: Timeline

  content: string // The markdown content of the story

  locationIds?: string[]
  worldId?: string // Reference to world data

  createdAt: string
  updatedAt: string
}

export interface Timeline {
  start: string // Start date of the timeline
  end: string // End date of the timeline
}

export interface Stories {
  stories: Story[]
}
