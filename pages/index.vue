<template>
  <article>
    <h1>Welcome to the Codex of Eternum</h1>
    <p>
      A worldbuilding archive of magic, gods, timelines, and immortal legacies.
    </p>

    <section>
      <h2>Explore the World</h2>
      <ul>
        <li><NuxtLink to="/world">World Overview</NuxtLink></li>
        <li><NuxtLink to="/races">Races of Eternum</NuxtLink></li>
        <li><NuxtLink to="/characters">Character List</NuxtLink></li>
        <li><NuxtLink to="/stories">Stories and Timelines</NuxtLink></li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
import { usePageMeta } from '~/composables/usePageMeta'

usePageMeta({
  title: 'Codex of Eternum – World Index',
  description:
    'Explore the magical world of Eternum. Discover its races, timelines, characters, and divine mysteries.',
  keywords: ['eternum', 'codex', 'worldbuilding', 'fantasy', 'magic', 'gods'],
  type: 'lore',
  schemaData: {
    origin: 'Created by Izzat Zamri',
    references: [
      'https://izzat-codex.netlify.app/races',
      'https://izzat-codex.netlify.app/world',
      'https://izzat-codex.netlify.app/characters',
    ],
  },
})
</script>
