<template>
  <div>
    <div style="display: flex; gap: 50px">
      <div style="width: 50dvw; height: 50dvh; background-color: black"></div>
      <div style="width: 50dvw; height: 50dvh; background-color: seashell">
        <div class="chat-wrapper">
          <div class="chat-person">A</div>
          <div class="bubble-wrapper">
            <div class="chat-bubble">Say something</div>
          </div>
        </div>

        <div class="chat-wrapper response">
          <div class="chat-person">B</div>
          <div class="bubble-wrapper">
            <div class="chat-bubble thinking">Think something</div>
            <div class="chat-bubble thinking">Think something 2</div>
          </div>
        </div>
      </div>
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

<style lang="scss" scoped>
.chat-wrapper {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  display: flex;
  gap: 15px;

  &.response {
    flex-direction: row-reverse;
  }

  .chat-person {
    width: 25px;
    height: 25px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: white;
  }

  .bubble-wrapper {
    flex: 1;
  }

  .chat-bubble {
    border: 1px solid black;
    background-color: white;
    padding: 5px 15px;
    border-radius: 5px;
    margin-bottom: 5px;

    &.thinking {
      border: 1px dashed black;
    }
  }
}
</style>
