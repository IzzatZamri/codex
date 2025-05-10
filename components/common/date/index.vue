<template>
  <InputMask
    v-model="val"
    size="small"
    placeholder="0-000-00/00:0000"
    mask="9-999-99/99:9999"
    slotChar="0-000-00/00:0000"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const val = computed({
  get() {
    return props.modelValue
  },
  set(val: string) {
    emit('update:modelValue', val)
  },
})
</script>

<style lang="scss" scoped></style>
