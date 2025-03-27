<template>
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
      :x1="segment.dotA.x"
      :y1="segment.dotA.y"
      :x2="segment.dotB.x"
      :y2="segment.dotB.y"
      stroke="lightgray"
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
          dot.type === selectedTypeNumComputed ? selectedDotRadius : dotRadius
        "
        :fill="dot.type === selectedTypeNumComputed ? 'black' : 'gray'"
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

    <!-- 3x3 square at the center -->
    <rect
      :x="center.x - 1.5"
      :y="center.y - 1.5"
      width="3"
      height="3"
      fill="black"
    />
  </svg>
  <div class="selected-type-label">Selected Type: {{ selectedType }}</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{ selectedType: string }>()

// Compute selectedType as a number so that updates are reactive.
const selectedTypeNumComputed = computed(() => parseInt(props.selectedType, 10))

// --- Dimensions ---
const size = 280
const center = { x: size / 2, y: size / 2 } // { x: 140, y: 140 }
const outerRadius = 100 // Radius for inner circle (dots)
const dotRadius = 5 // Default dot radius
const selectedDotRadius = 8 // Highlighted dot radius
const selectedDotHighlightRadius = 14 // Outer highlight for selected dot

// --- Outer Sections (Arc Segments) ---
const outerSections = [
  { label: 'gut', color: '#ff8c00' },
  { label: 'head', color: '#1e90ff' },
  { label: 'heart', color: '#32cd32' },
]
const outerSectionRadius = 125
const middleSectionRadius = 115

// Compute arc segments for outer layer (3 segments)
const arcSegments = computed(() => {
  const segments = []
  const segmentsData = [
    { start: -150, end: -30, color: outerSections[0].color },
    { start: -30, end: 90, color: outerSections[1].color },
    { start: 90, end: 210, color: outerSections[2].color },
  ]
  segmentsData.forEach((seg, i) => {
    const startAngle = (seg.start * Math.PI) / 180
    const endAngle = (seg.end * Math.PI) / 180
    const x1 = center.x + outerSectionRadius * Math.cos(startAngle)
    const y1 = center.y + outerSectionRadius * Math.sin(startAngle)
    const x2 = center.x + outerSectionRadius * Math.cos(endAngle)
    const y2 = center.y + outerSectionRadius * Math.sin(endAngle)
    const largeArcFlag = 0 // each segment spans less than 180°
    const path = `M ${x1} ${y1} A ${outerSectionRadius} ${outerSectionRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${center.x} ${center.y} Z`
    const id = `arc-${i}`
    segments.push({ id, path, color: seg.color })
  })
  return segments
})

// Compute arc segments for inner outer layer (middle ring divided into 9)
const arcSegmentsInner = computed(() => {
  const segments = []
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
    const id = `arc-${i}`
    segments.push({ id, path, color: seg.color })
  })
  return segments
})

// --- Dots ---
const dots = computed(() => {
  const count = 9
  const result = []
  for (let i = 0; i < count; i++) {
    const type = i === 0 ? 9 : i
    const angle = (2 * Math.PI * i) / count - Math.PI / 2
    const x = center.x + outerRadius * Math.cos(angle)
    const y = center.y + outerRadius * Math.sin(angle)
    result.push({ type, x, y })
  }
  return result
})

// --- Line Segments ---
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
const lineSegments = computed(() => {
  return lines
    .map((pair) => {
      const dotA = dots.value.find((dot) => dot.type === pair[0])
      const dotB = dots.value.find((dot) => dot.type === pair[1])
      return { dotA, dotB }
    })
    .filter((segment) => segment.dotA && segment.dotB)
})

// --- Selected Dot ---
const selectedDot = computed(() => {
  return dots.value.find((dot) => dot.type === selectedTypeNumComputed.value)
})
</script>

<style lang="scss" scoped>
.selected-type-label {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
