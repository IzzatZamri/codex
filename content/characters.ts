// content/characters.ts

/**
 * Interface representing the structure of a single character object.
 * Defining it here makes it easily importable elsewhere.
 */
export interface Character {
  id: string;
  name: string;
  title: string;
  race: string;
  description: string;
  // Add any other properties you have for a character
}

/**
 * The array of character data, fully typed.
 * Your editor will now give you errors if an object is missing a property.
 */
export const characters: Character[] = [
  {
    id: "zigfrid-eternum-dahlia",
    name: "Zigfrid Eternum Dahlia",
    title: "The First Bloom",
    race: "Celestial",
    description:
      "An ancient being of immense power, Zigfrid is one of the original architects of the Eternum cosmos.",
  },
  {
    id: "another-character",
    name: "Another Character",
    title: "The Wanderer",
    race: "Human",
    description: "A mysterious traveler with a forgotten past.",
  },
];
