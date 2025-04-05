<template>
  <div class="slider-container">
    <div v-if="minLabel" class="slider-title">{{ minLabel }}</div>
    <input
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      :style="[trackStyle, inputStyle]"
      @input="updateValue"
    />
    <div v-if="maxLabel" class="slider-title">{{ maxLabel }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  trackColor: { type: String, default: '#ddd' },
  progressColor: { type: String, default: '#1e90ff' },
  knobColor: { type: String, default: 'black' },
  minLabel: { type: String, default: null },
  maxLabel: { type: String, default: null },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
})

const emit = defineEmits(['update:modelValue'])

// Compute the percentage of progress
const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

// Inline style for the track using a gradient based on the slider value
const trackStyle = computed(() => ({
  background: `linear-gradient(to right, ${props.progressColor} 0%, ${props.progressColor} ${percentage.value}%, ${props.trackColor} ${percentage.value}%, ${props.trackColor} 100%)`,
}))

// Set a CSS variable for the knob color
const inputStyle = computed(() => ({
  '--knob-color': props.knobColor,
}))

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.valueAsNumber)
}
</script>

<style lang="scss" scoped>
.slider-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  .slider-title {
    text-align: center;
    font-size: 12px;
    min-width: 75px;
  }

  /* Style for the slider track */
  input[type='range'] {
    -webkit-appearance: none;
    width: 200px;
    height: 5px;
    border-radius: 2.5px;
    outline: none;
    background: transparent; // The background is set via inline style
  }

  /* Chrome-specific slider thumb */
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    background: var(--knob-color); // Uses the CSS variable for knob color
    border: 1px solid white;
    border-radius: 50%;
    cursor: pointer;
    // box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
}
</style>
