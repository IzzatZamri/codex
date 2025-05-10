<template>
  <div>
    <h1>My Markdown Editor</h1>
    <!-- Bind the editor content via v-model and control editMode from parent -->
    <MarkdownEditor
      v-model="editorContent"
      :editMode="isEditMode"
      @update:editMode="isEditMode = $event"
    />

    <h2>Current Markdown:</h2>
    <pre>{{ editorContent }}</pre>

    <!-- Button to externally toggle editMode -->
    <button @click="isEditMode = !isEditMode">
      Toggle Edit Mode (External)
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MarkdownEditor from '@/components/common/editor/index.vue' // Adjust path as needed

// The markdown content.
const editorContent = ref(
  '# Welcome to the Markdown Editor\n\nTry typing #{random(1,10)} somewhere!'
)

// Control whether the editor is in edit mode.
const isEditMode = ref(true)
</script>
