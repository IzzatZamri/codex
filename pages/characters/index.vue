<template>
  <article>
    <h1>List of characters in Eternum</h1>
    <p>
      This page will provide list of all existing characters in this world
      building project.
    </p>

    <section>
      <h2>List of Existing Characters</h2>
      <ul>
        <li>
          <NuxtLink v-for="c in characters" :to="`characters/${c.id}`">
            {{ c.fullName }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useAllData } from '~/composables/useAllData'
const characters = useAllData('character')
</script>
