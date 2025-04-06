<template>
  <div class="markdown-editor">
    <!-- Toolbar: Toggle between Edit and Preview -->
    <div class="toolbar" v-if="showToolbar">
      <button @click="toggleMode">
        {{ editMode ? 'Preview' : 'Edit' }}
      </button>
    </div>

    <!-- Edit Mode: Show a textarea with markdown text -->
    <div v-if="editMode" class="editor">
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
import conversationPlugin from './plugins/conversation'

// Initialize MarkdownIt with settings and use the custom plugin
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

md.use(randomNumberPlugin)
md.use(conversationPlugin) // Use the conversation plugin

// Define props and emit functions
const props = defineProps<{
  modelValue: string
  editMode: boolean
  placeholder?: string
  showToolbar?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:editMode', value: boolean): void
}>()

// Local state for the markdown content
const content = ref(props.modelValue)

// Sync content changes to parent component
watch(content, (newVal) => {
  emit('update:modelValue', newVal)
})

// Ensure content updates from the parent component
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== content.value) content.value = newVal
  }
)

// Toggle between edit and preview mode
const toggleMode = () => {
  emit('update:editMode', !props.editMode)
}

// Computed property for rendered markdown output
const renderedMarkdown = computed(() => md.render(content.value))

// Computed editMode for simplicity
const editMode = computed(() => props.editMode)
</script>

<style lang="scss">
.markdown-editor {
  .toolbar {
    text-align: right;

    button {
      padding: 5px 10px;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }

  .editor {
    textarea {
      width: 100%;
      padding: 0px;
      font-size: 1em;
      font-family: monospace;
      border: none;
      border-radius: 0;
      box-sizing: border-box;
      outline: none;
      resize: vertical;
      background: transparent;

      &:focus {
        outline: none;
      }
    }
  }
  .preview {
    padding: 0px;
    font-size: 1em;
    font-family: monospace;

    p {
      margin: 0px !important;
    }
  }
}
</style>
