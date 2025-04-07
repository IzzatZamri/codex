// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@primevue/nuxt-module'],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura, // Use your desired theme preset from @primeuix/themes
        options: {
          // prefix: 'p', // This lets you use <p-button> instead of <Button>
          darkModeSelector: 'system',
          cssLayer: false,
        },
      },
    },
    components: {
      include: ['Button', 'InputText'],
    },
  },
  css: [
    '~/assets/styles/main.scss',
    'primeicons/primeicons.css', // Include icon styles
  ],
  compatibilityDate: '2025-03-09',
  router: {},
})
