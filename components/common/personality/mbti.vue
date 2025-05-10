<template>
  <div>
    <div>MBTI:</div>
    <div>
      <label>Energy:</label>
      <select v-model="selectedEnergy">
        <option v-for="option in energyOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <label>Perception:</label>
      <select v-model="selectedPerception">
        <option
          v-for="option in perceptionOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <label>Decision:</label>
      <select v-model="selectedDecision">
        <option v-for="option in decisionOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <label>Structure:</label>
      <select v-model="selectedStructure">
        <option
          v-for="option in structureOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <label>Identity:</label>
      <select v-model="selectedIdentity">
        <option v-for="option in identityOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MBTI_TYPES } from '~/constants/personality/mbtis'
import type { Mbti } from '~/types/personalities.types'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

// Options for each dichotomy:
const energyOptions = ['Extraversion', 'Introversion']
const perceptionOptions = ['Sensing', 'Intuition']
const decisionOptions = ['Thinking', 'Feeling']
const structureOptions = ['Judging', 'Perceiving']
const identityOptions = ['Assertive', 'Turbulent']

// Each computed property gets the current value from the matching MBTI in MBTI_TYPES.
// If none is found, default to the first option.

const selectedEnergy = computed({
  get: () => {
    const current = MBTI_TYPES.value.find((x) => x.code === props.modelValue)
    return current ? current.energy : energyOptions[0]
  },
  set: (newEnergy: string) => {
    updateMbti({ energy: newEnergy })
  },
})

const selectedPerception = computed({
  get: () => {
    const current = MBTI_TYPES.value.find((x) => x.code === props.modelValue)
    return current ? current.perception : perceptionOptions[0]
  },
  set: (newPerception: string) => {
    updateMbti({ perception: newPerception })
  },
})

const selectedDecision = computed({
  get: () => {
    const current = MBTI_TYPES.value.find((x) => x.code === props.modelValue)
    return current ? current.decision : decisionOptions[0]
  },
  set: (newDecision: string) => {
    updateMbti({ decision: newDecision })
  },
})

const selectedStructure = computed({
  get: () => {
    const current = MBTI_TYPES.value.find((x) => x.code === props.modelValue)
    return current ? current.structure : structureOptions[0]
  },
  set: (newStructure: string) => {
    updateMbti({ structure: newStructure })
  },
})

const selectedIdentity = computed({
  get: () => {
    const current = MBTI_TYPES.value.find((x) => x.code === props.modelValue)
    return current ? current.identity : identityOptions[0]
  },
  set: (newIdentity: string) => {
    updateMbti({ identity: newIdentity })
  },
})

/**
 * updateMbti: Combines the current selected values from all dichotomies (with any changed ones)
 * and finds the matching MBTI type from MBTI_TYPES. Then it emits the new modelValue code.
 */
function updateMbti(
  changed: Partial<{
    energy: string
    perception: string
    decision: string
    structure: string
    identity: string
  }>
) {
  // Get current selected values (or defaults) for each dichotomy.
  const newEnergy = changed.energy ?? selectedEnergy.value
  const newPerception = changed.perception ?? selectedPerception.value
  const newDecision = changed.decision ?? selectedDecision.value
  const newStructure = changed.structure ?? selectedStructure.value
  const newIdentity = changed.identity ?? selectedIdentity.value

  // Find the matching MBTI type.
  const match = MBTI_TYPES.value.find(
    (mbti: Mbti) =>
      mbti.energy === newEnergy &&
      mbti.perception === newPerception &&
      mbti.decision === newDecision &&
      mbti.structure === newStructure &&
      mbti.identity === newIdentity
  )
  if (match) {
    emit('update:modelValue', match.code)
  }
}
</script>
