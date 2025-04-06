export interface ImageRecord {
  id: string
  name: string
  description: string
  tags: string[]
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Images {
  images: ImageRecord[]
}
