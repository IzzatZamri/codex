<template>
  <div class="date-input">
    <div>Year:</div>
    <input
      type="number"
      v-model="customDate.year"
      @input="emitChange"
      placeholder="Year"
    />
    <div>Month:</div>
    <input
      type="number"
      v-model="customDate.month"
      @input="emitChange"
      placeholder="Month"
      min="1"
      step="1"
    />
    <div>Day:</div>
    <input
      type="number"
      v-model="customDate.day"
      @input="emitChange"
      placeholder="Day"
    />
    <!-- Only show time inputs if mode is 'date-time' -->
    <template v-if="mode === 'date-time'">
      <input
        type="number"
        v-model="customDate.hour"
        @input="emitChange"
        placeholder="Hour"
        min="0"
        max="23"
        step="1"
      />
      <input
        type="number"
        v-model="customDate.minute"
        @input="emitChange"
        placeholder="Minute"
        min="0"
        max="59"
        step="1"
      />
      <input
        type="number"
        v-model="customDate.second"
        @input="emitChange"
        placeholder="Second"
        min="0"
        max="59"
        step="1"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue'
import type { CustomDate } from '~/types/customDate.types'

const props = defineProps<{
  modelValue: CustomDate
  mode?: 'date' | 'date-time'
}>()

// Default mode to 'date' if not provided
const mode = props.mode ?? 'date'

// Initialize customDate, defaulting year, month, day to 0 if not provided
const customDate = ref<CustomDate>({
  year: props.modelValue.year ?? 0,
  month: props.modelValue.month ?? 0,
  day: props.modelValue.day ?? 0,
  hour: mode === 'date' ? 0 : props.modelValue.hour ?? 0,
  minute: mode === 'date' ? 0 : props.modelValue.minute ?? 0,
  second: mode === 'date' ? 0 : props.modelValue.second ?? 0,
})

// Keep customDate in sync if modelValue changes
watch(
  () => props.modelValue,
  (newValue) => {
    customDate.value = {
      year: newValue.year ?? 0,
      month: newValue.month ?? 0,
      day: newValue.day ?? 0,
      hour: mode === 'date' ? 0 : newValue.hour ?? 0,
      minute: mode === 'date' ? 0 : newValue.minute ?? 0,
      second: mode === 'date' ? 0 : newValue.second ?? 0,
    }
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: CustomDate): void
}>()

const emitChange = () => {
  emit('update:modelValue', customDate.value)
}
</script>

<style scoped lang="scss">
.date-input {
  display: flex;
  gap: 10px;

  input {
    width: 60px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
