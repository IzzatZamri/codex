<template>
  <div>
    <div>Enneagram:</div>

    <div>
      <label>Main Type:</label>
      <select v-model="selectedMain">
        <option
          v-for="option in mainOptions"
          :key="option.code"
          :value="option.code"
        >
          {{ option.name }} ({{ option.code }})
        </option>
      </select>
    </div>
    <div>
      <label>Wing:</label>
      <select v-model="selectedWing">
        <option value="">None</option>
        <option v-for="wing in wingOptions" :key="wing" :value="wing">
          {{ wing }}
        </option>
      </select>
    </div>
    <div>
      <label>Variant:</label>
      <select v-model="selectedVariant">
        <option value="">None</option>
        <option
          v-for="option in variantOptions"
          :key="option.code"
          :value="option.code"
        >
          {{ option.name }} ({{ option.code }})
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// Props: parent sends a string code like "5w4-sp", "5-sx", or "5w4"
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

// Helper functions for parsing and building the code:
function parseEnneagramCode(code: string) {
  let main = '',
    wing = '',
    variant = ''
  if (!code) return { main, wing, variant }
  const wIndex = code.indexOf('w')
  const dashIndex = code.indexOf('-')
  if (wIndex !== -1) {
    main = code.substring(0, wIndex)
    if (dashIndex !== -1) {
      wing = code.substring(wIndex + 1, dashIndex)
      variant = code.substring(dashIndex + 1)
    } else {
      wing = code.substring(wIndex + 1)
    }
  } else {
    if (dashIndex !== -1) {
      main = code.substring(0, dashIndex)
      variant = code.substring(dashIndex + 1)
    } else {
      main = code
    }
  }
  return { main, wing, variant }
}

function buildEnneagramCode(main: string, wing: string, variant: string) {
  let code = main
  if (wing) {
    code += 'w' + wing
  }
  if (variant) {
    code += '-' + variant
  }
  return code
}

// Constant options:
const mainOptions = [
  { code: '1', name: 'The Reformer' },
  { code: '2', name: 'The Helper' },
  { code: '3', name: 'The Achiever' },
  { code: '4', name: 'The Individualist' },
  { code: '5', name: 'The Investigator' },
  { code: '6', name: 'The Loyalist' },
  { code: '7', name: 'The Enthusiast' },
  { code: '8', name: 'The Challenger' },
  { code: '9', name: 'The Peacemaker' },
]

const variantOptions = [
  { code: 'sp', name: 'Self-Preservation' },
  { code: 'so', name: 'Social' },
  { code: 'sx', name: 'Sexual' },
]

// Computed properties for each part:
const selectedMain = computed({
  get: () => {
    return parseEnneagramCode(props.modelValue).main || mainOptions[0].code
  },
  set: (newMain: string) => {
    const { wing, variant } = parseEnneagramCode(props.modelValue)
    const newCode = buildEnneagramCode(newMain, wing, variant)
    emit('update:modelValue', newCode)
  },
})

const selectedWing = computed({
  get: () => {
    return parseEnneagramCode(props.modelValue).wing || ''
  },
  set: (newWing: string) => {
    const { main, variant } = parseEnneagramCode(props.modelValue)
    const newCode = buildEnneagramCode(main, newWing, variant)
    emit('update:modelValue', newCode)
  },
})

const selectedVariant = computed({
  get: () => {
    return parseEnneagramCode(props.modelValue).variant || ''
  },
  set: (newVariant: string) => {
    const { main, wing } = parseEnneagramCode(props.modelValue)
    const newCode = buildEnneagramCode(main, wing, newVariant)
    emit('update:modelValue', newCode)
  },
})

// Final code for display:
const finalCode = computed(() => props.modelValue)

// Compute wing options based on the selected main type using traditional theory:
const wingOptions = ref<string[]>([])
watch(
  selectedMain,
  (newMain) => {
    let wings: string[] = []
    const mainNum = parseInt(newMain)
    if (!isNaN(mainNum)) {
      if (mainNum === 1) {
        wings = ['9', '2']
      } else if (mainNum === 9) {
        wings = ['8', '1']
      } else {
        wings = [String(mainNum - 1), String(mainNum + 1)]
      }
    }
    wingOptions.value = wings
    const currentWing = parseEnneagramCode(props.modelValue).wing
    if (currentWing && !wings.includes(currentWing)) {
      selectedWing.value = ''
    }
  },
  { immediate: true }
)
</script>
