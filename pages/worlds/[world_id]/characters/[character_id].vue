<template>
  <div v-if="data && data.id" class="character-container">
    <section class="character-main">
      <div class="character-left-panel">
        <h1>Character Details</h1>

        <!-- Basic Info -->
        <section>
          <h2>Basic Information</h2>
          <div class="flex-row">
            <div class="left-info-block">
              <div class="profile-picture">Profile<br />Picture Here</div>
              <div class="tags">
                <span
                  v-for="tag in data.basicInfo.tags"
                  :key="tag"
                  class="tag"
                  >{{ tag }}</span
                >
              </div>
            </div>
            <div class="right-info-block">
              <div>Full Name: {{ data.basicInfo.fullName }}</div>
              <div>Common Name: {{ data.basicInfo.name }}</div>
              <div>Nick Name: {{ data.basicInfo.nickName || 'N/A' }}</div>
              <div>
                Alias(es): {{ data.basicInfo.aliases?.join(', ') || 'N/A' }}
              </div>
              <hr />
              <div>Gender: {{ data.basicInfo.gender }}</div>
              <div>Date Of Birth: {{ data.basicInfo.dateOfBirth }}</div>
              <div>Birth Place: {{ data.basicInfo.birthPlace }}</div>
              <div>Race: {{ data.basicInfo.race }}</div>
              <div>
                Subrace: {{ data.basicInfo.subrace?.join(', ') || 'N/A' }}
              </div>
            </div>
          </div>
        </section>

        <!-- Appearance & Personality -->
        <section class="flex-row">
          <div class="half-width">
            <h2>Appearance</h2>
            <div>Theme Color: {{ data.appearance.themeColor || 'N/A' }}</div>
            <h3>Summary</h3>
            <p class="preformatted-text">
              {{ data.appearance.summary || 'N/A' }}
            </p>
          </div>

          <div class="half-width">
            <h2>Personality</h2>
            <div v-if="personality">
              <div>{{ personality.alignment.name }}</div>
              <div>{{ personality.mbti.name }}</div>
              <div>
                {{ personality.enneagram.name }} ({{
                  personality.enneagram.code
                }})
              </div>
            </div>
            <hr />
            <div>General: {{ data.personality.generalPersonality }}</div>
            <div>Core Motivation: {{ data.personality.coreMotivation }}</div>
            <h3>Preferences</h3>
            <div>Favourite Color: {{ data.preferences.favoriteColor }}</div>
            <div>Likes: {{ data.preferences.likes?.join(', ') || 'N/A' }}</div>
            <div>
              Dislikes: {{ data.preferences.dislikes?.join(', ') || 'N/A' }}
            </div>
            <div>Fears: {{ data.preferences.fears?.join(', ') || 'N/A' }}</div>
            <h3>Notes</h3>
            <div>{{ data.personality.notes || 'N/A' }}</div>
          </div>
        </section>

        <!-- Social Info -->
        <section>
          <h2>Social Information</h2>
          <div>Title: {{ data.socialInfo?.titles?.join(', ') || 'N/A' }}</div>
          <div>
            Occupation: {{ data.socialInfo?.occupations?.join(', ') || 'N/A' }}
          </div>
          <div>Status: {{ data.socialInfo?.status?.join(', ') || 'N/A' }}</div>
          <div>
            Affiliations:
            {{ data.socialInfo?.affiliations?.join(', ') || 'N/A' }}
          </div>
          <div>
            Factions: {{ data.socialInfo?.factions?.join(', ') || 'N/A' }}
          </div>

          <div v-if="data.socialInfo?.domains?.length">
            <h3>Domains</h3>
            <div>{{ data.socialInfo.domains.join(', ') }}</div>
          </div>

          <div v-if="data.socialInfo?.commandments?.length">
            <h3>Commandments</h3>
            <div>{{ data.socialInfo.commandments.join(', ') }}</div>
          </div>
        </section>

        <!-- Stats & Skills -->
        <section class="flex-row">
          <div class="half-width">
            <h2>Stats</h2>
            <h3>Variable Stats</h3>
            <div
              v-for="(stat, key) in data.attributes.stats.variable"
              :key="key"
            >
              {{ key }}: {{ stat.value }}
            </div>
            <h3>Invariable Stats</h3>
            <div
              v-for="(stat, key) in data.attributes.stats.invariable"
              :key="key"
            >
              {{ key }}: {{ stat.value }}
            </div>
          </div>

          <div class="half-width">
            <h2>Skills</h2>
            <h3>General Abilities</h3>
            <div v-for="skill in data.attributes.skills.general" :key="skill">
              {{ skill }}
            </div>
            <h3>Innate Abilities</h3>
            <div
              v-for="ability in data.attributes.skills.innate"
              :key="ability"
            >
              {{ ability }}
            </div>
            <h3 v-if="data.attributes.skills.enlightenment.length">
              Enlightenment
            </h3>
            <div
              v-for="enlightenment in data.attributes.skills.enlightenment"
              :key="enlightenment"
            >
              {{ enlightenment }}
            </div>
          </div>
        </section>

        <!-- Relationships & History -->
        <section class="flex-row">
          <div class="half-width">
            <h2>Relationships</h2>
            <div v-for="relation in data.relationships" :key="relation">
              {{ relation }}
            </div>
          </div>
          <div class="half-width">
            <h2>Story/History</h2>
            <div v-for="entry in data.history" :key="entry">{{ entry }}</div>
          </div>
        </section>
      </div>

      <!-- Right Panel: Description -->
      <div class="character-right-panel">
        <h1>Description</h1>
        <p class="preformatted-text">{{ data.basicInfo.description }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { parsePersonalityString } from '~/composables/usePersonalityParser'
import type { Character } from '@/types/characters.types'

const route = useRoute()
const characterId = route.params.character_id

const data = ref<Character>()
const personality = computed(() => {
  return data.value
    ? parsePersonalityString(data.value.personality?.personalityCode || '')
    : undefined
})

async function fetchData() {
  const res = await fetch(`/api/characters/${characterId}`)
  const json = await res.json()
  data.value = json.data
}

onMounted(fetchData)
</script>

<style lang="scss" scoped>
.character-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.character-main {
  display: flex;
  gap: 30px;
}

.character-left-panel {
  width: 100%;
}

.character-right-panel {
  width: 100%;
}

.flex-row {
  display: flex;
  gap: 15px;
  margin-bottom: 1rem;
}

.half-width {
  width: 100%;
}

.left-info-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.tags {
  margin-top: 5px;
}

.tag {
  padding: 0 5px;
  font-weight: bold;
}

.preformatted-text {
  white-space: pre-line;
  text-align: justify;
}
</style>
