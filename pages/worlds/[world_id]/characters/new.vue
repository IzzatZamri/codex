<template>
  <div>
    <h1>Enneagram Display Example</h1>
    <!-- A dropdown to select an Enneagram type -->
    <label for="enneagram-select">Select Enneagram Type:</label>
    <select id="enneagram-select" v-model="selectedType">
      <option v-for="type in enneagramTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>

    <!-- Use the PersonalityDisplay component and pass the selected type -->
    <PersonalityDisplay :selectedType="selectedType" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PersonalityDisplay from '@/components/ui/personality.vue' // Adjust path as needed

// Create a reactive variable for the selected Enneagram type (as a string)
const selectedType = ref('1')

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
