// ~/plugins/primevue.plugins.ts
import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import 'primeicons/primeicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Register PrimeVue and ToastService
  nuxtApp.vueApp.use(PrimeVue)
  nuxtApp.vueApp.use(ToastService)

  // Register the Toast component globally
  nuxtApp.vueApp.component('Toast', Toast)
})
