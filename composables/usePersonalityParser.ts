// composables/usePersonalityParser.ts
import type {
  Personality,
  Alignment,
  Mbti,
  Enneagram,
} from '~/types/personalities.types'
import { ALIGNMENT_TYPES } from '~/constants/personality/alignments'
import { MBTI_TYPES } from '~/constants/personality/mbtis'
import { ENNEAGRAM_TYPES } from '~/constants/personality/enneagrams'

/**
 * Parses a personality string into a Personality object.
 * Example input: 'e:1w2-sp|a:ce|m:entpa_10_-20_0_100_50'
 */
export function parsePersonalityString(str: string): Personality {
  let alignmentCode = ''
  let mbtiCode = ''
  let enneagramCode = ''

  // Split the string by pipe, then by colon.
  const parts = str.split('|')
  parts.forEach((part) => {
    const [key, value] = part.split(':')
    if (!key || !value) return
    switch (key.trim()) {
      case 'a':
        alignmentCode = value.trim()
        break
      case 'm':
        mbtiCode = value.trim()
        break
      case 'e':
        enneagramCode = value.trim()
        break
      default:
        break
    }
  })

  return {
    code: str,
    alignment: parseAlignmentCode(alignmentCode),
    mbti: parseMbtiCode(mbtiCode),
    enneagram: parseEnneagramCode(enneagramCode),
  }
}

/**
 * Converts a Personality object back into its string representation.
 */
export function stringifyPersonality(v: Personality): string {
  const eCode = stringifyEnneagramCode(v.enneagram)
  const aCode = stringifyAlignmentCode(v.alignment)
  const mCode = stringifyMbtiCode(v.mbti)
  return `e:${eCode}|a:${aCode}|m:${mCode}`
}

/* ---------------------
   Alignment Parsing/Stringify (Uses ALIGNMENT_TYPES)
----------------------*/

/**
 * Finds the corresponding Alignment object from the predefined ALIGNMENT_TYPES.
 */
export function parseAlignmentCode(code: string): Alignment {
  return (
    ALIGNMENT_TYPES.value.find((a) => a.code === code) || {
      name: 'Unknown',
      code: '',
      order: 'None',
      morality: 'None',
    }
  )
}

/**
 * Converts an Alignment object back to its code.
 */
export function stringifyAlignmentCode(alignment: Alignment): string {
  return alignment.code
}

/* ---------------------
   MBTI Parsing/Stringify (Uses MBTI_TYPES)
----------------------*/

/**
 * Parses an MBTI code string into an Mbti object.
 * Example input: "entpa_10_20_0_100_50"
 */
export function parseMbtiCode(code: string): Mbti {
  // Return default if code is empty.
  if (code === '') {
    return {
      name: '',
      code: '',
      energy: '',
      energyValue: 0,
      perception: '',
      perceptionValue: 0,
      decision: '',
      decisionValue: 0,
      structure: '',
      structureValue: 0,
      identity: '',
      identityValue: 0,
    }
  }

  // Split the code by underscore.
  const parts = code.split('_')
  const letterPart = parts[0].toLowerCase() // e.g., "entpa"
  const hasValues = parts.length > 1

  // Try to look up the MBTI definition by its letter code.
  const baseMbti = MBTI_TYPES.value.find((item) => item.code === letterPart)

  // Prepare default numeric values. If values are missing, default to 0.
  let [
    energyValue,
    perceptionValue,
    decisionValue,
    structureValue,
    identityValue,
  ] = hasValues ? parts.slice(1).map(Number) : [0, 0, 0, 0, 0]

  // Utility: given a numeric value, return trait based on thresholds.
  const getTrait = (value: number, negative: string, positive: string) => {
    if (value < 0) return negative
    if (value > 0) return positive
    return '' // 0 returns empty string
  }

  let energy: string,
    perception: string,
    decision: string,
    structure: string,
    identity: string
  let name: string

  if (hasValues) {
    // Use the numeric values to determine traits.
    energy = getTrait(energyValue, 'Extraversion', 'Introversion')
    perception = getTrait(perceptionValue, 'Sensing', 'Intuition')
    decision = getTrait(decisionValue, 'Thinking', 'Feeling')
    structure = getTrait(structureValue, 'Perceiving', 'Judging')
    identity = getTrait(identityValue, 'Turbulent', 'Assertive')

    // If a base MBTI exists, use its name. Otherwise fallback to letterPart.
    name = baseMbti ? baseMbti.name : letterPart
  } else {
    // No numeric values provided.
    if (baseMbti) {
      name = baseMbti.name
      energy = baseMbti.energy
      perception = baseMbti.perception
      decision = baseMbti.decision
      structure = baseMbti.structure
      identity = baseMbti.identity
    } else {
      // Fallback if even the base MBTI is not found.
      name = letterPart
      energy = letterPart[0] === 'e' ? 'Extraversion' : 'Introversion'
      perception = letterPart[1] === 'n' ? 'Intuition' : 'Sensing'
      decision = letterPart[2] === 't' ? 'Thinking' : 'Feeling'
      structure = letterPart[3] === 'p' ? 'Perceiving' : 'Judging'
      identity = letterPart[4] === 'a' ? 'Assertive' : 'Turbulent'
    }
  }

  return {
    name,
    code,
    energy,
    energyValue,
    perception,
    perceptionValue,
    decision,
    decisionValue,
    structure,
    structureValue,
    identity,
    identityValue,
  }
}

/**
 * Converts an Mbti object back into its code string.
 */
export function stringifyMbtiCode(mbti: Mbti): string {
  // Helper to derive a letter from a trait.
  const getLetterForTrait = (
    value: number | undefined,
    traitType: string,
    negativeType: string,
    positiveType: string,
    negativeLetter: string,
    positiveLetter: string
  ): string => {
    // Priority 1: Use the numeric value if nonzero.
    if (typeof value === 'number' && value !== 0) {
      return value < 0 ? negativeLetter : positiveLetter
    }
    // Priority 2: Fallback to the trait type if provided.
    if (traitType !== '') {
      if (traitType.toLowerCase() === negativeType.toLowerCase())
        return negativeLetter
      if (traitType.toLowerCase() === positiveType.toLowerCase())
        return positiveLetter
    }
    return ''
  }

  const energyLetter = getLetterForTrait(
    mbti.energyValue,
    mbti.energy,
    'Extraversion',
    'Introversion',
    'e',
    'i'
  )
  const perceptionLetter = getLetterForTrait(
    mbti.perceptionValue,
    mbti.perception,
    'Sensing',
    'Intuition',
    's',
    'n'
  )
  const decisionLetter = getLetterForTrait(
    mbti.decisionValue,
    mbti.decision,
    'Thinking',
    'Feeling',
    't',
    'f'
  )
  const structureLetter = getLetterForTrait(
    mbti.structureValue,
    mbti.structure,
    'Perceiving',
    'Judging',
    'p',
    'j'
  )
  const identityLetter = getLetterForTrait(
    mbti.identityValue,
    mbti.identity,
    'Turbulent',
    'Assertive',
    't',
    'a'
  )

  // Assemble the letter part.
  let letterPart =
    energyLetter +
    perceptionLetter +
    decisionLetter +
    structureLetter +
    identityLetter

  // Priority 3: If any letter is missing, fallback to using the original code.
  if (letterPart.length < 5) {
    letterPart = mbti.code.split('_')[0] || letterPart
  }

  // Build the numeric (value) part.
  const valuePart = [
    mbti.energyValue ?? 0,
    mbti.perceptionValue ?? 0,
    mbti.decisionValue ?? 0,
    mbti.structureValue ?? 0,
    mbti.identityValue ?? 0,
  ].join('_')

  return `${letterPart}_${valuePart}`
}

/* ---------------------
   Enneagram Parsing/Stringify
----------------------*/

/**
 * Parses an enneagram code string into an Enneagram object.
 * Supported formats: "1", "1w2", "1-sx", "1w2-sp"
 */
export function parseEnneagramCode(v: string): Enneagram {
  const regex = /^(\d)(?:w(\d))?(?:-([a-z]+))?$/i
  const match = regex.exec(v)
  if (match) {
    const main = match[1]
    const wing = match[2] ? match[2] : undefined
    const variant = match[3] ? match[3] : undefined
    let nameCheck = main
    if (wing) {
      nameCheck += `w${wing}`
    }
    const x = ENNEAGRAM_TYPES.value.find((e) => e.code === nameCheck)
    return {
      name: x?.name ?? v,
      code: v,
      main,
      wing,
      variant,
    }
  } else {
    return {
      name: v,
      code: v,
    }
  }
}

/**
 * Converts an Enneagram object back to its code string.
 */
export function stringifyEnneagramCode(v: Enneagram): string {
  let eCode = `${v.main ?? ''}`
  if (v.wing) {
    eCode += `w${v.wing}`
  }
  if (v.variant) {
    eCode += `-${v.variant}`
  }
  return eCode
}
