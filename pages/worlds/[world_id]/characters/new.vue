<template>
  <div>
    <h1>Create a Character</h1>
    <div class="wrapper">
      <div>
        <h2>Main Detail</h2>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" placeholder="Enter character name" />
        </div>
        <div>
          <label for="name">Full Name:</label>
          <input type="text" id="fullname" placeholder="Enter character name" />
        </div>
        <div>
          <label for="name">Nick Name:</label>
          <input type="text" id="nickname" placeholder="Enter character name" />
        </div>
        <hr />
        <div>
          <label for="name">Birth Date:</label>
          <input type="text" id="nickname" placeholder="Enter character name" />
        </div>

        <div>
          <label for="name">Gender:</label>
          <input type="text" id="nickname" placeholder="Enter character name" />
        </div>

        <div>
          <label for="name">Race:</label>
          <input type="text" id="nickname" placeholder="Enter character name" />
        </div>
        <div>
          <label for="name">SubRace:</label>
          <input type="text" id="nickname" placeholder="Enter character name" />
        </div>
      </div>
      <div class="other-detail">
        <h2>Persona</h2>
        <PersonalityDisplay v-model:personalityCode="personalityCode" />
      </div>
    </div>

    <div>
      <div>ariable stats</div>
      <div>Strength</div>
      <div>Endurance</div>
      <div>Agility</div>
      <div>Dexterity</div>
      <div>Reflex</div>
      <div>Perception</div>
      <div>Magi</div>
      <div>Health</div>
      <hr />
      <div>Invariable stats</div>
      <div>Intelligence</div>
      <div>Perseverance</div>
      <div>Soul</div>
      <div>Luck</div>
      <div>Charm</div>
    </div>

    <div>
      <div>Enlightenment</div>
    </div>

    <div>
      <div>Inate Abilities</div>
      <div>Gift</div>
      <div>Arts</div>
    </div>

    <div>
      <div>Status</div>
      <div>Traits</div>
      <div>Attribute</div>
    </div>

    <div>
      <div>Domain</div>
    </div>

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
