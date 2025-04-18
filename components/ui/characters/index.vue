<template>
  <section class="character-main">
    <div class="character-left-panel">
      <h1>Character Details</h1>

      <Accordion :value="['0']" multiple>
        <!-- Basic Info -->
        <AccordionPanel value="0">
          <AccordionHeader>Basic Information</AccordionHeader>
          <AccordionContent>
            <div class="flex-row">
              <div class="left-info-block">
                <div class="profile-picture">Profile<br />Picture Here</div>
                <Tags v-model="manager.data.basicInfo.tagIds" />
              </div>
              <div class="right-info-block">
                <!-- <InputGroup>
                  <IftaLabel>
                    <InputText
                      v-model="value"
                      inputId="price"
                      mode="currency"
                      currency="USD"
                      locale="en-US"
                      size="small"
                    />
                    <label for="price">Price</label>
                  </IftaLabel>
                  <IftaLabel>
                    <InputText
                      v-model="value"
                      inputId="price"
                      mode="currency"
                      currency="USD"
                      locale="en-US"
                      size="small"
                    />
                    <label for="price">Price</label>
                  </IftaLabel>
                </InputGroup> -->

                <IftaLabel>
                  <InputText
                    v-model="manager.data.basicInfo.fullName"
                    size="small"
                    inputId="fullname"
                  />
                  <label for="fullname">Full Name</label>
                </IftaLabel>
                <IftaLabel>
                  <InputText
                    v-model="manager.data.basicInfo.name"
                    size="small"
                    inputId="name"
                  />
                  <label for="name">Common Name</label>
                </IftaLabel>
                <IftaLabel>
                  <InputText
                    v-model="manager.data.basicInfo.nickName"
                    size="small"
                    inputId="nickname"
                  />
                  <label for="nickname">Nick Name</label>
                </IftaLabel>
                <IftaLabel>
                  <InputText
                    v-model="manager.data.basicInfo.aliases"
                    size="small"
                    inputId="aliases"
                  />
                  <label for="aliases">Aliases</label>
                </IftaLabel>
              </div>
            </div>

            <hr />

            <IftaLabel>
              <Select
                v-model="manager.data.basicInfo.gender"
                :options="['Male', 'Female']"
                placeholder="Select gender"
                style="width: 100%"
                inputId="gender"
              />
              <label for="gender">Gender</label>
            </IftaLabel>
            <IftaLabel>
              <InputText
                v-model="manager.data.basicInfo.dateOfBirth"
                size="small"
                inputId="dob"
              />
              <label for="dob">Date Of Birth</label>
            </IftaLabel>

            <div>Birth Place: {{ manager.data.basicInfo.birthPlaceId }}</div>
            <div>Race: {{ manager.data.basicInfo.raceId }}</div>
            <div>
              Subrace:
              {{ manager.data.basicInfo.subraceIds?.join(', ') || 'N/A' }}
            </div>
          </AccordionContent>
        </AccordionPanel>

        <!-- Appearance & Personality -->
        <AccordionPanel value="1">
          <AccordionHeader>Appearance & Personality</AccordionHeader>
          <AccordionContent>
            <section class="flex-row">
              <div class="half-width">
                <h2>Appearance</h2>
                <div>
                  Theme Color: {{ manager.data.appearance.themeColor || 'N/A' }}
                </div>
                <h3>Summary</h3>
                <p class="preformatted-text">
                  {{ manager.data.appearance.summary || 'N/A' }}
                </p>
              </div>

              <div class="half-width">
                <h2>Personality</h2>
                <!-- <div v-if="personality">
            <div>{{ personality.alignment.name }}</div>
            <div>{{ personality.mbti.name }}</div>
            <div>
              {{ personality.enneagram.name }} ({{
                personality.enneagram.code
              }})
            </div>
          </div> -->
                <hr />
                <div>
                  General: {{ manager.data.personality.generalPersonality }}
                </div>
                <div>
                  Core Motivation: {{ manager.data.personality.coreMotivation }}
                </div>
                <h3>Preferences</h3>
                <div>
                  Favourite Color: {{ manager.data.preferences.favoriteColor }}
                </div>
                <div>
                  Likes:
                  {{ manager.data.preferences.likes?.join(', ') || 'N/A' }}
                </div>
                <div>
                  Dislikes:
                  {{ manager.data.preferences.dislikes?.join(', ') || 'N/A' }}
                </div>
                <div>
                  Fears:
                  {{ manager.data.preferences.fears?.join(', ') || 'N/A' }}
                </div>
                <h3>Notes</h3>
                <div>{{ manager.data.personality.notes || 'N/A' }}</div>
              </div>
            </section>
          </AccordionContent>
        </AccordionPanel>

        <!-- Social Info -->
        <AccordionPanel value="2">
          <AccordionHeader>Social Information</AccordionHeader>
          <AccordionContent>
            <div>
              Title:
              {{ manager.data.socialInfo?.titles?.join(', ') || 'N/A' }}
            </div>
            <div>
              Occupation:
              {{ manager.data.socialInfo?.occupations?.join(', ') || 'N/A' }}
            </div>
            <div>
              Status:
              {{ manager.data.socialInfo?.status?.join(', ') || 'N/A' }}
            </div>
            <div>
              Affiliations:
              {{ manager.data.socialInfo?.affiliationIds?.join(', ') || 'N/A' }}
            </div>
            <div>
              Factions:
              {{ manager.data.socialInfo?.factionIds?.join(', ') || 'N/A' }}
            </div>

            <div>
              <h3>Domains</h3>
              <div>{{ manager.data.socialInfo?.domainIds?.join(', ') }}</div>
            </div>

            <div>
              <h3>Commandments</h3>
              <div>
                {{ manager.data.socialInfo?.commandments?.join(', ') }}
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>

        <!-- Stats & Skills -->
        <AccordionPanel value="3">
          <AccordionHeader>Stats & Skills</AccordionHeader>
          <AccordionContent>
            <section class="flex-row">
              <div class="half-width">
                <h2>Stats</h2>
                <h3>Variable Stats</h3>
                <div
                  v-for="(stat, key) in manager.data.attributes.stats.variable"
                  :key="key"
                >
                  {{ key }}: {{ stat.value }}
                </div>
                <h3>Invariable Stats</h3>
                <div
                  v-for="(stat, key) in manager.data.attributes.stats
                    .invariable"
                  :key="key"
                >
                  {{ key }}: {{ stat.value }}
                </div>
              </div>

              <div class="half-width">
                <h2>Skills</h2>
                <h3>General Abilities</h3>
                <div
                  v-for="skill in manager.data.attributes.skills.general"
                  :key="skill"
                >
                  {{ skill }}
                </div>
                <h3>Innate Abilities</h3>
                <div
                  v-for="ability in manager.data.attributes.skills.innate"
                  :key="ability"
                >
                  {{ ability }}
                </div>
                <h3 v-if="manager.data.attributes.skills.enlightenment.length">
                  Enlightenment
                </h3>
                <div
                  v-for="enlightenment in manager.data.attributes.skills
                    .enlightenment"
                  :key="enlightenment"
                >
                  {{ enlightenment }}
                </div>
              </div>
            </section>
          </AccordionContent>
        </AccordionPanel>

        <!-- Relationships & History -->
        <AccordionPanel value="4">
          <AccordionHeader>Relationships & History</AccordionHeader>
          <AccordionContent>
            <div class="half-width">
              <h2>Relationships</h2>
              <div
                v-for="relation in manager.data.relationshipIds"
                :key="relation"
              >
                {{ relation }}
              </div>
            </div>
            <div class="half-width">
              <h2>Story/History</h2>
              <div v-for="entry in manager.data.historyIds" :key="entry">
                {{ entry }}
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!-- Right Panel: Description -->
    <div class="character-right-panel">
      <h1>Description</h1>
      <p class="preformatted-text">{{ manager.data.basicInfo.description }}</p>
      <pre>
        {{ manager.data }}
      </pre>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch } from 'vue'
import { CharacterManager } from '~/models/Characters/CharacterManager'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const characterId = defineModel<string | null>()
const editMode = defineModel<boolean>('editmode', { default: false })
const manager = reactive(new CharacterManager())

watch(
  characterId,
  async (newId) => {
    if (!newId) {
      return
    }

    try {
      manager.load(newId as string)
    } catch (err) {
      console.error('Failed to fetch data:', err)
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Fail to retreive data',
        life: 3000,
      })
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (characterId.value) {
    manager.load(characterId.value as string)
  }
})
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
