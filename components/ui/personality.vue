<template>
  <div class="personality-wrapper">
    <pre>
      {{ { localAlignment, localMbti, localEnneagram } }}
    </pre>
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- Define arc paths in <defs> so text can follow the curves -->
      <defs>
        <template v-for="(segment, index) in arcSegments">
          <path :id="segment.id" :d="segment.path" fill="none" />
        </template>
      </defs>

      <!-- Outer segmented arcs -->
      <g>
        <path
          v-for="(segment, index) in arcSegments"
          :key="segment.id"
          :d="segment.path"
          :fill="segment.color"
          stroke="white"
          stroke-width="2"
          opacity="0.5"
        />
      </g>

      <!-- Outer segmented inner arcs -->
      <g>
        <path
          v-for="(segment, index) in arcSegmentsInner"
          :key="segment.id"
          :d="segment.path"
          :fill="segment.color"
          stroke="white"
          stroke-width="2"
          opacity="0.2"
        />
      </g>

      <!-- Outer circle border -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="middleSectionRadius"
        stroke="white"
        stroke-width="2"
        fill="none"
      />

      <!-- Inner circle (base circle for the dots) -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="outerRadius"
        stroke="lightgray"
        stroke-width="2"
        fill="white"
      />

      <!-- Draw lines between dots -->
      <line
        v-for="(segment, index) in lineSegments"
        :key="'line-' + index"
        :x1="segment?.dotA?.x"
        :y1="segment?.dotA?.y"
        :x2="segment?.dotB?.x"
        :y2="segment?.dotB?.y"
        stroke="lightgray"
        stroke-width="2"
      />

      <line
        :x1="lineWings?.dotA?.x"
        :y1="lineWings?.dotA?.y"
        :x2="lineWings?.dotB?.x"
        :y2="lineWings?.dotB?.y"
        stroke="black"
        stroke-width="2"
      />

      <!-- Dots for each Enneagram type -->
      <g>
        <circle
          v-for="dot in dots"
          :key="dot.type"
          :cx="dot.x"
          :cy="dot.y"
          :r="
            dot.type === selectedMainEnneagram ? selectedDotRadius : dotRadius
          "
          :fill="dot.type === selectedMainEnneagram ? 'black' : 'gray'"
          @click="onSelectEnneagram(dot.type)"
        />
        <!-- Text labels for each dot -->
        <text
          v-for="dot in dots"
          :key="'dot-label-' + dot.type"
          :x="dot.x"
          :y="dot.y + 4"
          text-anchor="middle"
          font-size="10"
          fill="white"
          @click="onSelectEnneagram(dot.type)"
        >
          {{ dot.type }}
        </text>
      </g>

      <!-- Outer highlight circle around the selected dot -->
      <circle
        v-if="selectedDot"
        :cx="selectedDot.x"
        :cy="selectedDot.y"
        :r="selectedDotHighlightRadius"
        stroke="black"
        stroke-width="2"
        fill="none"
      />

      <!-- 3x3 grid of squares at the center -->
      <g>
        <rect
          v-for="(square, index) in gridSquares"
          :key="index"
          :x="square.x"
          :y="square.y"
          :width="boxSize"
          :height="boxSize"
          :fill="isAlignmentActive(index) ? 'lightgray' : 'white'"
          :stroke="isAlignmentActive(index) ? 'black' : 'lightgray'"
          @click="setAlignment(index)"
          stroke-width="2"
        ></rect>
      </g>
    </svg>

    <div class="mbti-wrapper" :style="{ width: `${size}px` }">
      <div class="slider-wrapper">
        <CustomSlider
          v-model="localMbti.energyValue"
          :trackColor="energyColor"
          :progressColor="energyColorAlt"
          :min="-100"
          :max="100"
        />
      </div>
      <div class="slider-wrapper">
        <CustomSlider
          v-model="localMbti.perceptionValue"
          :trackColor="perceptionColor"
          :progressColor="perceptionColorAlt"
          :min="-100"
          :max="100"
        />
      </div>
      <div class="slider-wrapper">
        <CustomSlider
          v-model="localMbti.decisionValue"
          :trackColor="decisionColor"
          :progressColor="decisionColorAlt"
          :min="-100"
          :max="100"
        />
      </div>
      <div class="slider-wrapper">
        <CustomSlider
          v-model="localMbti.structureValue"
          :trackColor="structureColor"
          :progressColor="structureColorAlt"
          :min="-100"
          :max="100"
        />
      </div>
      <div class="slider-wrapper">
        <CustomSlider
          v-model="localMbti.identityValue"
          :trackColor="identityColor"
          :progressColor="identityColorAlt"
          :min="-100"
          :max="100"
        />
      </div>
    </div>

    <div class="selected-type-label">Selected Type: {{ selectedType }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  watch,
} from 'vue'
import CustomSlider from '~/components/common/slider.vue'
import {
  parseAlignmentCode,
  parsePersonalityString,
  stringifyPersonality,
} from '~/composables/usePersonalityParser'
import type {
  Personality,
  Alignment,
  Mbti,
  Enneagram,
} from '~/types/personalities.types'

// Props
const props = defineProps<{
  personalityCode: string
  selectedType: string
}>()

// Emit event for updating personality code
const emit = defineEmits<{
  (e: 'update:personalityCode', value: string): void
}>()

/* --- MBTI --- */
// Create a local reactive copy of MBTI parsed from the personalityCode prop.
const localMbti = reactive<Mbti>(
  parsePersonalityString(props.personalityCode).mbti
)

// When the personalityCode prop changes, update the localMbti.
watch(
  () => props.personalityCode,
  (newCode) => {
    const parsedMbti = parsePersonalityString(newCode).mbti
    Object.assign(localMbti, parsedMbti)
  }
)

// Watch localMbti for changes and emit an updated personalityCode.
watch(
  localMbti,
  (newMbti) => {
    const personality: Personality = {
      code: '',
      alignment: localAlignment.value,
      mbti: newMbti,
      enneagram: localEnneagram.value,
    }
    const newCode = stringifyPersonality(personality)
    if (newCode !== props.personalityCode) {
      console.log('Emitting new personality code:', newCode)
      emit('update:personalityCode', newCode)
    }
  },
  { deep: true }
)

/* --- Alignment as computed --- */
const localAlignment = computed<Alignment>({
  get() {
    return parsePersonalityString(props.personalityCode).alignment
  },
  set(newAlignment) {
    const personality: Personality = {
      code: '',
      alignment: newAlignment,
      mbti: localMbti,
      enneagram: localEnneagram.value,
    }
    const newCode = stringifyPersonality(personality)
    if (newCode !== props.personalityCode) {
      emit('update:personalityCode', newCode)
    }
  },
})

/* --- Enneagram as computed --- */
const localEnneagram = computed<Enneagram>({
  get() {
    return parsePersonalityString(props.personalityCode).enneagram
  },
  set(newEnneagram) {
    const personality: Personality = {
      code: '',
      alignment: localAlignment.value,
      mbti: localMbti,
      enneagram: newEnneagram,
    }
    const newCode = stringifyPersonality(personality)
    if (newCode !== props.personalityCode) {
      emit('update:personalityCode', newCode)
    }
  },
})

/* --- Helper Computeds and Functions --- */
// Computed for selected main enneagram (as a number)
const selectedMainEnneagram = computed(() =>
  parseInt(localEnneagram.value.main || '', 10)
)

// Alignment sections and functions
const alignmentIndex = [
  'lg',
  'ng',
  'cg',
  'ln',
  'tn',
  'cn',
  'le',
  'ne',
  'ce',
  'ua',
]
const setAlignment = (index: number) => {
  if (localAlignment.value.code === alignmentIndex[index]) {
    localAlignment.value = parseAlignmentCode('')
  } else {
    localAlignment.value = parseAlignmentCode(alignmentIndex[index])
  }
}
const isAlignmentActive = (index: number) => {
  if (localAlignment.value.code === '') return false
  if (localAlignment.value.code === 'ua') return true
  return alignmentIndex[index] === localAlignment.value.code
}

// Enneagram selection logic
const onSelectEnneagram = (val: number) => {
  const current = localEnneagram.value
  if (current.main === '') {
    localEnneagram.value = { ...current, main: `${val}`, wing: '' }
  } else if (current.main === val.toString()) {
    localEnneagram.value = { ...current, main: '', wing: '' }
  } else {
    const mainNum = parseInt(current.main, 10)
    const prev = mainNum === 1 ? 9 : mainNum - 1
    const next = mainNum === 9 ? 1 : mainNum + 1
    if (val === prev || val === next) {
      localEnneagram.value = {
        ...current,
        wing: current.wing === val.toString() ? '' : `${val}`,
      }
    } else {
      localEnneagram.value = { ...current, main: `${val}`, wing: '' }
    }
  }
}

/* --- Layout and SVG Helpers --- */
const size = 280
const boxSize = 10
const boxGap = 15
const center = { x: size / 2, y: size / 2 }
const outerRadius = 100
const dotRadius = 5
const selectedDotRadius = 8
const selectedDotHighlightRadius = 14

// Outer sections for arcs (colors will be set on mounted)
const outerSections = ref([
  { label: 'gut', color: '' },
  { label: 'head', color: '' },
  { label: 'heart', color: '' },
])
const outerSectionRadius = 125
const middleSectionRadius = 115

// Grid squares for alignment selection
const gridSquares = computed(() => {
  const squares = []
  const totalWidth = 3 * boxSize + 2 * boxGap
  const startX = center.x - totalWidth / 2
  const startY = center.y - totalWidth / 2
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      squares.push({
        x: startX + col * (boxSize + boxGap),
        y: startY + row * (boxSize + boxGap),
      })
    }
  }
  // Additional square for "ua" alignment.
  squares.push({
    x: startX + 1 * (boxSize + boxGap),
    y: startY + 3 * (boxSize + boxGap),
  })
  return squares
})

// Outer segmented arcs
const arcSegments = computed(() => {
  const segments: any[] = []
  const segmentsData = [
    { start: -150, end: -30, color: outerSections.value[0].color },
    { start: -30, end: 90, color: outerSections.value[1].color },
    { start: 90, end: 210, color: outerSections.value[2].color },
  ]
  segmentsData.forEach((seg, i) => {
    const startAngle = (seg.start * Math.PI) / 180
    const endAngle = (seg.end * Math.PI) / 180
    const x1 = center.x + outerSectionRadius * Math.cos(startAngle)
    const y1 = center.y + outerSectionRadius * Math.sin(startAngle)
    const x2 = center.x + outerSectionRadius * Math.cos(endAngle)
    const y2 = center.y + outerSectionRadius * Math.sin(endAngle)
    const largeArcFlag = 0
    const path = `M ${x1} ${y1} A ${outerSectionRadius} ${outerSectionRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${center.x} ${center.y} Z`
    segments.push({ id: `arc-${i}`, path, color: seg.color })
  })
  return segments
})

// Inner segmented arcs (middle ring)
const arcSegmentsInner = computed(() => {
  const segments: any[] = []
  const segmentsData = [
    { start: -150, end: -110, color: 'white' },
    { start: -110, end: -70, color: 'gray' },
    { start: -70, end: -30, color: 'black' },
    { start: -30, end: 10, color: 'white' },
    { start: 10, end: 50, color: 'gray' },
    { start: 50, end: 90, color: 'black' },
    { start: 90, end: 130, color: 'white' },
    { start: 130, end: 170, color: 'gray' },
    { start: 170, end: 210, color: 'black' },
  ]
  segmentsData.forEach((seg, i) => {
    const startAngle = (seg.start * Math.PI) / 180
    const endAngle = (seg.end * Math.PI) / 180
    const x1 = center.x + middleSectionRadius * Math.cos(startAngle)
    const y1 = center.y + middleSectionRadius * Math.sin(startAngle)
    const x2 = center.x + middleSectionRadius * Math.cos(endAngle)
    const y2 = center.y + middleSectionRadius * Math.sin(endAngle)
    const largeArcFlag = 0
    const path = `M ${x1} ${y1} A ${middleSectionRadius} ${middleSectionRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${center.x} ${center.y} Z`
    segments.push({ id: `inner-arc-${i}`, path, color: seg.color })
  })
  return segments
})

// Dots for each Enneagram type
const dots = computed(() => {
  const count = 9
  const result: any[] = []
  for (let i = 0; i < count; i++) {
    const type = i === 0 ? 9 : i
    const angle = (2 * Math.PI * i) / count - Math.PI / 2
    const x = center.x + outerRadius * Math.cos(angle)
    const y = center.y + outerRadius * Math.sin(angle)
    result.push({ type, x, y })
  }
  return result
})

// Line segments connecting dots
const lines = [
  [3, 6],
  [6, 9],
  [9, 3],
  [1, 4],
  [4, 2],
  [2, 8],
  [8, 5],
  [5, 7],
  [7, 1],
]
const lineSegments = computed(() =>
  lines
    .map((pair) => {
      const dotA = dots.value.find((dot) => dot.type === pair[0])
      const dotB = dots.value.find((dot) => dot.type === pair[1])
      return { dotA, dotB }
    })
    .filter((segment) => segment.dotA && segment.dotB)
)

// Line for wings connection (using main and wing)
const lineWings = computed(() => {
  const dotA = dots.value.find(
    (dot) => dot.type === parseInt(localEnneagram.value.main, 10)
  )
  const dotB = dots.value.find(
    (dot) => dot.type === parseInt(localEnneagram.value.wing, 10)
  )
  return dotA && dotB ? { dotA, dotB } : null
})

onMounted(() => {
  const styles = getComputedStyle(document.documentElement)
  // Set color refs for MBTI sliders.
  energyColor.value = styles.getPropertyValue('--color-blue').trim()
  energyColorAlt.value = styles.getPropertyValue('--color-blue-dark').trim()
  perceptionColor.value = styles.getPropertyValue('--color-yellow').trim()
  perceptionColorAlt.value = styles
    .getPropertyValue('--color-yellow-dark')
    .trim()
  decisionColor.value = styles.getPropertyValue('--color-green').trim()
  decisionColorAlt.value = styles.getPropertyValue('--color-green-dark').trim()
  structureColor.value = styles.getPropertyValue('--color-purple').trim()
  structureColorAlt.value = styles
    .getPropertyValue('--color-purple-dark')
    .trim()
  identityColor.value = styles.getPropertyValue('--color-red').trim()
  identityColorAlt.value = styles.getPropertyValue('--color-red-dark').trim()

  // Set outerSections colors from CSS variables.
  outerSections.value[0].color = styles
    .getPropertyValue('--color-purple')
    .trim()
  outerSections.value[1].color = styles
    .getPropertyValue('--color-turquoise')
    .trim()
  outerSections.value[2].color = styles
    .getPropertyValue('--color-orange')
    .trim()
})

// Define color refs for sliders
const energyColor = ref('')
const energyColorAlt = ref('')
const perceptionColor = ref('')
const perceptionColorAlt = ref('')
const decisionColor = ref('')
const decisionColorAlt = ref('')
const structureColor = ref('')
const structureColorAlt = ref('')
const identityColor = ref('')
const identityColorAlt = ref('')
</script>

<style lang="scss" scoped>
.personality-wrapper {
  .selected-type-label {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  .mbti-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .slider-wrapper {
      .title {
        text-align: center;
        text-transform: capitalize;
      }
      .slider-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        .slider-title {
          text-align: center;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
