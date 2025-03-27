<template>
  <div>
    <div style="display: flex; gap: 50px">
      <div style="width: 50dvw; height: 50dvh; background-color: black"></div>
      <div
        style="width: 50dvw; height: 50dvh; background-color: seashell"
      ></div>
    </div>
    <div>
      <Personality v-model="personality" />
      {{ personality }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Personality from '~/components/common/personality/index.vue'
import type { PersonalityInput } from '~/types/personalities.types'

import { ref } from 'vue'
const personality = ref<PersonalityInput>({
  alignmentCode: 'ng',
  mbtiCode: '',
  enneagramCode: '',
})
</script>
