// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

// Import your data directly from your TypeScript "database" files
import { characters } from './content/characters'
// import { races } from './content/races'; // Example for another data file

// --- Generate routes dynamically from the imported data ---
const characterRoutes = characters.map(
  (character) => `/characters/${character.id}`
)
// const raceRoutes = races.map(race => `/races/${race.id}`);

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/sitemap'],
  ssr: true,
  // The `site` module is the single source of truth for your URL
  site: {
    url: 'https://izzat-codex.netlify.app',
    trailingSlash: false
  },

  sitemap: {
    exclude: ['/404'],
    // Provide the generated routes to the sitemap
    urls: [
      '/',
      '/timelines',
      ...characterRoutes
      // ...raceRoutes,
    ],
    defaults: {
      changefreq: 'monthly',
      priority: 0.5
    }
  },

  css: ['~/assets/styles/main.scss'],

  // App metadata
  app: {
    head: {
      titleTemplate: 'Eternum | Codex',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Codex: A worldbuilding wiki' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Izzat Zamri' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  runtimeConfig: {
    public: {
      // This makes your site configuration available on the client-side
      siteAuthor: 'Izzat Zamri'
    }
  },

  // Prerender the routes for your static site
  nitro: {
    prerender: {
      routes: [
        '/',
        '/timelines',
        ...characterRoutes
        // ...raceRoutes,
      ]
    }
  },

  compatibilityDate: '2025-07-10'
})
