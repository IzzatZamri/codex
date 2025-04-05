<template>
  <div>
    <h1>Enneagram Display Example</h1>
    <!-- Use the PersonalityDisplay component and pass the selected type -->
    <PersonalityDisplay v-model:personalityCode="personalityCode" />

    <div>
      <div v-if="personality.alignment.name.length > 7">
        {{ personality.alignment.name }}
      </div>
      <div v-if="personality.enneagram.name.length > 7">
        {{ personality.enneagram.name }}
      </div>
      <div v-if="personality.mbti.name.length > 7">
        {{ personality.mbti.name }}
      </div>
    </div>

    <div class="page">
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

const uploadedImage = ref(null)
const handleUploadSuccess = (imageData: any) => {
  uploadedImage.value = imageData
  console.log('Image uploaded:', imageData)
}

import PersonalityDisplay from '@/components/ui/personality.vue' // Adjust path as needed

// Create a reactive variable for the selected Enneagram type (as a string)
const personalityCode = ref('')
const personality = computed(() => {
  return parsePersonalityString(personalityCode.value)
})

// List of possible types (as strings)
const enneagramTypes = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
</script>

<style scoped>
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
