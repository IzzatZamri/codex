export interface Tag {
  id: string // uuid v4
  slug: string
  name: string

  createdAt: string
  updatedAt: string
}

export interface Tags {
  tags: Tag[]
}
