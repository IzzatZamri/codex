<template>
  <div>
    <h1>Create a Character</h1>
    <CharacterForm v-model="characterId" />
    <div class="wrapper">
      <div class="other-detail">
        <h2>Persona</h2>
        <PersonalityDisplay v-model:personalityCode="personalityCode" />
      </div>
    </div>

    <div class="page" style="display: none">
      <h1>Upload an Image</h1>
      <ImageUploader @upload-success="handleUploadSuccess" />
      <div v-if="uploadedImage">
        <h2>Uploaded Image Data</h2>
        <pre>{{ uploadedImage }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ImageUploader from '~/components/common/fileUploader.vue'
import { parsePersonalityString } from '~/composables/usePersonalityParser'
import CharacterForm from '~/components/ui/characters/index.vue'
const uploadedImage = ref(null)
const handleUploadSuccess = (imageData: any) => {
  uploadedImage.value = imageData
  console.log('Image uploaded:', imageData)
}

import PersonalityDisplay from '~/components/ui/personality.vue' // Adjust path as needed

// Create a reactive variable for the selected Enneagram type (as a string)
const characterId = ref('')
const personalityCode = ref('')
const personality = computed(() => {
  return parsePersonalityString(personalityCode.value)
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  gap: 30px;
}
label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
select {
  margin-bottom: 20px;
  padding: 5px;
}
</style>
