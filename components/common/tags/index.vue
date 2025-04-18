<template>
  <IftaLabel>
    <MultiSelect
      v-model="internalSelectedTags"
      inputId="tags"
      :options="options"
      optionLabel="name"
      filter
      :maxSelectedLabels="3"
      style="width: 100%"
    >
      <template #option="slotProps">
        <div>{{ slotProps.option.name }}</div>
      </template>
      <template #header>
        <div class="tag-title">Select Tags</div>
      </template>
      <template #footer>
        <div class="tag-btn-wrapper">
          <Button
            @click="openDialog"
            label="Add New"
            severity="secondary"
            text
            size="small"
            icon="pi pi-plus"
          />
          <Button
            @click="clearSelection"
            label="Remove All"
            severity="danger"
            text
            size="small"
            icon="pi pi-times"
          />
        </div>
      </template>
    </MultiSelect>
    <label for="tags">Tags</label>
  </IftaLabel>

  <!-- Dialog for adding a new tag -->
  <Dialog
    header="Add New Tag"
    v-model:visible="dialogVisible"
    :modal="true"
    :closable="false"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
  >
    <div class="p-fluid">
      <div class="p-field">
        <label for="newTagName">Tag Name</label>
        <InputText id="newTagName" v-model="newTagName" />
      </div>
      <div class="dialog-footer p-d-flex p-jc-end">
        <Button
          label="Cancel"
          severity="secondary"
          class="p-mr-2"
          @click="cancelDialog"
        />
        <Button label="Submit" @click="submitNewTag" />
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { TagsManager } from '~/models/Tags/TagsManager'
import { TagManager } from '~/models/Tags/TagManager'
import { useToast } from 'primevue/usetoast'

// Define the v-model prop and emit
const props = defineProps<{ modelValue: string[] }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>()

// TODO: add view mode and edit mode
const editMode = defineModel<boolean>('editmode', { default: false })

const toast = useToast()
const managers = reactive(new TagsManager())
const isLoading = ref(false)

// internalSelectedTags holds full tag objects selected from the MultiSelect
const internalSelectedTags = ref<any[]>([])

// Computed property: options returns full tag data objects
const options = computed(() => {
  return managers.data.map((tagManager) => tagManager.data)
})

// Watch parent's modelValue and options to update the internal selection
watch(
  [() => props.modelValue, options],
  ([newIDs, opts]) => {
    if (opts && newIDs) {
      // Derive the new internal selection from parent IDs
      const newSelection = opts.filter((tag: any) => newIDs.includes(tag.id))
      // Only update if they differ from our current internal selection
      const currentIDs = internalSelectedTags.value.map((tag: any) => tag.id)
      if (
        JSON.stringify(newSelection.map((t) => t.id)) !==
        JSON.stringify(currentIDs)
      ) {
        internalSelectedTags.value = newSelection
      }
    }
  },
  { immediate: true, deep: true }
)

// Watch internalSelectedTags and emit the selected IDs if changed
watch(
  internalSelectedTags,
  (newSelection) => {
    const ids = newSelection.map((tag: any) => tag.id)
    // Only emit if the IDs differ from parent's modelValue
    if (JSON.stringify(ids) !== JSON.stringify(props.modelValue)) {
      emit('update:modelValue', ids)
    }
  },
  { deep: true }
)

// Dialog state and local state for new tag creation
const dialogVisible = ref(false)
const newTagName = ref('')

// Opens the dialog
const openDialog = () => {
  newTagName.value = ''
  dialogVisible.value = true
}

// Cancel: simply hide the dialog
const cancelDialog = () => {
  dialogVisible.value = false
}

// Submit: Create a new tag, refresh the tags list, and close the dialog
const submitNewTag = async () => {
  if (!newTagName.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Please enter a tag name',
      life: 3000,
    })
    return
  }
  isLoading.value = true
  const newTag = new TagManager()
  newTag.data.name = newTagName.value.trim()
  try {
    await newTag.create()
    await managers.fetchAll()
    toast.add({
      severity: 'success',
      summary: 'Created',
      detail: 'Tag added successfully!',
      life: 3000,
    })
    dialogVisible.value = false
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to create tag',
      life: 3000,
    })
  } finally {
    isLoading.value = false
  }
}

// Clear selection by emptying the internal array
const clearSelection = () => {
  internalSelectedTags.value = []
}

// On mounted, fetch the tags list
onMounted(async () => {
  isLoading.value = true
  try {
    await managers.fetchAll()
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.tag-title {
  padding: 10px 15px;
}
.tag-btn-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}
.dialog-footer {
  margin-top: 1rem;
}
</style>
