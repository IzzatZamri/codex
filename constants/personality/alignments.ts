import type { Alignment } from '~/types/personalities.types'

export const ALIGNMENT_TYPES = ref<Alignment[]>([
  { code: 'lg', name: 'Lawful Good (LG)', order: 'Lawful', morality: 'Good' },
  { code: 'ng', name: 'Neutral Good (NG)', order: 'Neutral', morality: 'Good' },
  { code: 'cg', name: 'Chaotic Good (CG)', order: 'Chaotic', morality: 'Good' },
  {
    code: 'ln',
    name: 'Lawful Neutral (LN)',
    order: 'Lawful',
    morality: 'Neutral',
  },
  {
    code: 'tn',
    name: 'True Neutral (TN)',
    order: 'Neutral',
    morality: 'Neutral',
  },
  {
    code: 'cn',
    name: 'Chaotic Neutral (CN)',
    order: 'Chaotic',
    morality: 'Neutral',
  },
  { code: 'le', name: 'Lawful Evil (LE)', order: 'Lawful', morality: 'Evil' },
  { code: 'ne', name: 'Neutral Evil (NE)', order: 'Neutral', morality: 'Evil' },
  { code: 'ce', name: 'Chaotic Evil (CE)', order: 'Chaotic', morality: 'Evil' },
  { code: 'ua', name: 'Unaligned (UA)', order: 'None', morality: 'None' },
])
