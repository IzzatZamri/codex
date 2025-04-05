export interface World {
  id: string
  name: string
  description: string
  tags: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Worlds {
  worlds: World[]
}
