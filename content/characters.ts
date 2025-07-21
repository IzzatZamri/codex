// content/characters.ts

/**
 * Interface representing the structure of a single character object.
 * Defining it here makes it easily importable elsewhere.
 */
export interface Character {
  id: string
  fullName: string
  name: string
  nickname: string
  title: string
  race: string
  subrace: string
  description: string
  // Add any other properties you have for a character
}

/**
 * The array of character data, fully typed.
 * Your editor will now give you errors if an object is missing a property.
 */
export const characters: Character[] = [
  {
    id: 'zigfrid-eternum-dahlia',
    fullName: 'Zigfrid Eternum Dahlia',
    name: 'Zigfrid Eternum',
    nickname: 'Zed',
    title: 'The First Devil',
    race: 'Eternum',
    subrace: 'Eternum',
    description: 'One of the few Survivor of Eternum'
  }
]
