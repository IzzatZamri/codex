// ~/plugins/componentTags.ts
import { defineNuxtPlugin } from '#app'
import Tags from '~/components/common/tags/index.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Tags', Tags)
})
