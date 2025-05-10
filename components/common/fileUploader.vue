<template>
  <div class="image-upload">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="file">Select Image:</label>
        <input
          type="file"
          id="file"
          @change="handleFileChange"
          accept="image/*"
        />
      </div>
      <div class="form-group">
        <label for="name">Image Name:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Enter image name"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="description"
          placeholder="Enter image description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="tags">Tags (comma separated):</label>
        <input
          type="text"
          id="tags"
          v-model="tags"
          placeholder="e.g. tag1, tag2, tag3"
        />
      </div>
      <button type="submit">Upload Image</button>
    </form>
    <div v-if="status" class="status">{{ status }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { v4 as uuidv4 } from 'uuid'

const file = ref<File | null>(null)
const name = ref('')
const description = ref('')
const tags = ref('')
const status = ref('')

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    file.value = target.files[0]
  }
}

const emit = defineEmits<{
  (e: 'upload-success', image: any): void
}>()

const handleSubmit = async () => {
  if (!file.value || !name.value) {
    status.value = 'Please select a file and enter a name.'
    return
  }

  const formData = new FormData()
  // Append the file; backend will rename using a generated UUID.
  formData.append('file', file.value, file.value.name)
  formData.append('name', name.value)
  formData.append('description', description.value)

  // Convert comma-separated tags to an array and append as JSON string.
  const tagArray = tags.value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
  formData.append('tags', JSON.stringify(tagArray))

  try {
    const res = await fetch('/api/images', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (res.ok) {
      status.value = 'Upload successful!'
      // Emit event with the uploaded image data.
      emit('upload-success', data.data)
      // Reset fields.
      file.value = null
      name.value = ''
      description.value = ''
      tags.value = ''
    } else {
      status.value = data.message || 'Upload failed.'
    }
  } catch (err) {
    console.error(err)
    status.value = 'Error uploading image.'
  }
}
</script>

<style scoped lang="scss">
.image-upload {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input[type='text'],
    input[type='file'],
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }

  button {
    padding: 10px 15px;
    background-color: #1e90ff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background-color: #1c86ee;
    }
  }

  .status {
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
