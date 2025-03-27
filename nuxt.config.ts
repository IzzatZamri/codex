// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2025-03-09',
  router: {},
})
