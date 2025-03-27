<template>
  <div class="markdown-editor">
    <!-- Toolbar: Toggle between Edit and Preview -->
    <div class="toolbar">
      <button @click="toggleMode">
        {{ editMode ? 'Switch to Preview' : 'Switch to Edit' }}
      </button>
    </div>

    <!-- Edit Mode: Show a textarea with markdown text -->
    <div v-if="editMode">
      <textarea
        v-model="content"
        placeholder="Type your markdown here..."
      ></textarea>
    </div>

    <!-- Preview Mode: Render the markdown as HTML -->
    <div v-else class="preview" v-html="renderedMarkdown"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import MarkdownIt from 'markdown-it'
// Import our custom plugin
import randomNumberPlugin from './plugins/randomNumber'

// --- Markdown-it Setup ---
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
// Use the custom random number plugin.
md.use(randomNumberPlugin)

// --- v-model & editMode Setup ---
const props = defineProps<{ modelValue: string; editMode: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:editMode', value: boolean): void
}>()

// Local state for the markdown content
const content = ref(props.modelValue)
watch(content, (newVal) => {
  emit('update:modelValue', newVal)
})
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== content.value) {
      content.value = newVal
    }
  }
)

// Toggle mode: emit new editMode value so parent can update it.
const toggleMode = () => {
  emit('update:editMode', !props.editMode)
}
const editMode = computed(() => props.editMode)

// Compute rendered markdown output.
const renderedMarkdown = computed(() => md.render(content.value))
</script>

<style scoped>
.markdown-editor {
  max-width: 800px;
  margin: auto;
  padding: 10px;
  font-family: sans-serif;
}
.toolbar {
  margin-bottom: 10px;
  text-align: right;
}
button {
  padding: 5px 10px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background: #0056b3;
}
textarea {
  width: 100%;
  height: 300px;
  padding: 10px;
  font-size: 1em;
  font-family: monospace;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.preview {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 300px;
  background: #fff;
}
</style>
