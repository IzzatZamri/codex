<template>
  <div>
    <AlignmentInput v-model="alignmentCode" />
    <MbtiInput v-model="mbtiCode" />
    <EnneagramInput v-model="enneagramCode" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PersonalityInput } from '~/types/personalities.types'
import AlignmentInput from '~/components/common/personality/alignment.vue'
import MbtiInput from '~/components/common/personality/mbti.vue'
import EnneagramInput from '~/components/common/personality/enneagram.vue'

// Define props to receive the current alignment code via v-model
const props = defineProps<{
  modelValue: PersonalityInput
}>()

// Define the emit event for updating the modelValue
const emit = defineEmits<{
  (
    e: 'update:modelValue',
    value: {
      alignmentCode: string
      mbtiCode: string
      enneagramCode: string
    }
  ): void
}>()

const alignmentCode = computed({
  get: () => props.modelValue.alignmentCode,
  set: (value: string) => {
    emit('update:modelValue', { ...props.modelValue, alignmentCode: value })
  },
})
const mbtiCode = computed({
  get: () => props.modelValue.mbtiCode,
  set: (value: string) => {
    emit('update:modelValue', { ...props.modelValue, mbtiCode: value })
  },
})
const enneagramCode = computed({
  get: () => props.modelValue.enneagramCode,
  set: (value: string) => {
    emit('update:modelValue', { ...props.modelValue, enneagramCode: value })
  },
})
</script>
