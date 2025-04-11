export interface StoryFlow {
  id: string // uuid v4
  title: string // Title of the chapter or section of the story
  flow: string[] // Array of story IDs, defining the order in which they occur
  description?: string // Brief description or purpose of this flow (optional)
  createdAt: string
  updatedAt: string
}

export interface StoryFlows {
  storyFlows: StoryFlow[]
}
