<template>
  <article>
    <h1>{{ character?.fullName }} Details</h1>
    <table>
      <tbody>
        <tr>
          <td>Full name:</td>
          <td>
            {{ character?.fullName }}
          </td>
        </tr>
        <tr>
          <td>Name / Common Name:</td>
          <td>
            {{ character?.name }}
          </td>
        </tr>
        <tr>
          <td>Nickname :</td>
          <td>
            {{ character?.nickname }}
          </td>
        </tr>
        <tr>
          <td>Title :</td>
          <td>
            {{ character?.title }}
          </td>
        </tr>
        <tr>
          <td>Race :</td>
          <td>
            {{ character?.race }}
          </td>
        </tr>
        <tr>
          <td>Subrace :</td>
          <td>
            {{ character?.subrace }}
          </td>
        </tr>
        <tr>
          <td>Description :</td>
          <td>
            {{ character?.description }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <section>
      <h2>List of Existing Characters</h2>
      <ul>
        <li></li>
      </ul>
    </section> -->
  </article>
</template>

<script setup lang="ts">
import { useData } from '~/composables/useData'
const route = useRoute()
const character = useData('character', route.params.id as string)
</script>
