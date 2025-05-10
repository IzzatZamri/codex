// /constants/personality/enneagrams.ts
import { ref } from 'vue'
import type { Enneagram } from '~/types/personalities.types'

export const ENNEAGRAM_TYPES = ref<Enneagram[]>([
  // Type 1 – The Reformer
  { name: 'The Reformer', code: '1', description: '' },
  { name: 'The Advocate', code: '1w2', description: '' },
  { name: 'The Idealist', code: '1w9', description: '' },

  // Type 2 – The Helper
  { name: 'The Helper', code: '2', description: '' },
  { name: 'The Servant', code: '2w1', description: '' },
  { name: 'The Host/Hostess', code: '2w3', description: '' },

  // Type 3 – The Achiever
  { name: 'The Achiever', code: '3', description: '' },
  { name: 'The Charmer', code: '3w2', description: '' },
  { name: 'The Professional', code: '3w4', description: '' },

  // Type 4 – The Individualist
  { name: 'The Individualist', code: '4', description: '' },
  { name: 'The Aristocrat', code: '4w3', description: '' },
  { name: 'The Bohemian', code: '4w5', description: '' },

  // Type 5 – The Investigator
  { name: 'The Investigator', code: '5', description: '' },
  { name: 'The Iconoclast', code: '5w4', description: '' },
  { name: 'The Problem Solver', code: '5w6', description: '' },

  // Type 6 – The Loyalist
  { name: 'The Loyalist', code: '6', description: '' },
  { name: 'The Defender', code: '6w5', description: '' },
  { name: 'The Buddy', code: '6w7', description: '' },

  // Type 7 – The Enthusiast
  { name: 'The Enthusiast', code: '7', description: '' },
  { name: 'The Entertainer', code: '7w6', description: '' },
  { name: 'The Realist', code: '7w8', description: '' },

  // Type 8 – The Challenger
  { name: 'The Challenger', code: '8', description: '' },
  { name: 'The Maverick', code: '8w7', description: '' },
  { name: 'The Bear', code: '8w9', description: '' },

  // Type 9 – The Peacemaker
  { name: 'The Peacemaker', code: '9', description: '' },
  { name: 'The Referee', code: '9w8', description: '' },
  { name: 'The Dreamer', code: '9w1', description: '' },
])
