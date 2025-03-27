<template>
  <div>
    <div>Alignment:</div>
    <div>
      <label>Order:</label>
      <select v-model="selectedOrder">
        <option v-for="order in orders" :key="order" :value="order">
          {{ order }}
        </option>
      </select>
    </div>
    <div>
      <label>Morality:</label>
      <select v-model="selectedMorality">
        <option
          v-for="morality in moralities"
          :key="morality"
          :value="morality"
        >
          {{ morality }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ALIGNMENT_TYPES } from '~/constants/personality/alignments'
import type { Alignment } from '~/types/personalities.types'

// We assume that props.modelValue is the alignment code, e.g., "lg"
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

// Available orders and moralities (including 'None')
const orders = ['Lawful', 'Neutral', 'Chaotic', 'None']
const moralities = ['Good', 'Neutral', 'Evil', 'None']

// computed property for the order part
const selectedOrder = computed({
  get() {
    const alignment = ALIGNMENT_TYPES.value.find(
      (a) => a.code === props.modelValue
    )
    return alignment ? alignment.order : 'None'
  },
  set(newOrder: string) {
    // If user selects "None", force both to "None"
    if (newOrder === 'None' || selectedMorality.value === 'None') {
      emit('update:modelValue', 'ua')
      return
    }
    const newAlignment = ALIGNMENT_TYPES.value.find(
      (a) => a.order === newOrder && a.morality === selectedMorality.value
    )
    if (newAlignment) {
      emit('update:modelValue', newAlignment.code)
    } else {
      emit('update:modelValue', 'ua')
    }
  },
})

// computed property for the morality part
const selectedMorality = computed({
  get() {
    const alignment = ALIGNMENT_TYPES.value.find(
      (a) => a.code === props.modelValue
    )
    return alignment ? alignment.morality : 'None'
  },
  set(newMorality: string) {
    // If user selects "None", force both to "None"
    if (newMorality === 'None' || selectedOrder.value === 'None') {
      emit('update:modelValue', 'ua')
      return
    }
    const newAlignment = ALIGNMENT_TYPES.value.find(
      (a) => a.order === selectedOrder.value && a.morality === newMorality
    )
    if (newAlignment) {
      emit('update:modelValue', newAlignment.code)
    } else {
      emit('update:modelValue', 'ua')
    }
  },
})
</script>
