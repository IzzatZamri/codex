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
              <label for="dob">Place Of Birth</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.basicInfo.birthPlaceId"
                size="small"
                inputId="dob"
              />
              <label for="dob">Date Of Birth</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.basicInfo.raceId"
                size="small"
                inputId="dob"
              />
              <label for="dob">Race</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.basicInfo.subraceIds"
                size="small"
                inputId="dob"
              />
              <label for="dob">Subrace</label>
            </IftaLabel>
          </AccordionContent>
        </AccordionPanel>

        <!-- Appearance & Personality -->
        <AccordionPanel value="1">
          <AccordionHeader>Appearance & Personality</AccordionHeader>
          <AccordionContent>
            <section class="flex-row">
              <div class="half-width">
                <h2>Appearance</h2>

                <IftaLabel>
                  <InputText
                    v-model="manager.data.appearance.themeColor"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">Theme Color</label>
                </IftaLabel>

                <h3>Summary</h3>
                <IftaLabel>
                  <TextArea
                    v-model="manager.data.appearance.summary"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">Summary</label>
                </IftaLabel>
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

                <IftaLabel>
                  <InputText
                    v-model="manager.data.personality.generalPersonality"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">General</label>
                </IftaLabel>

                <IftaLabel>
                  <InputText
                    v-model="manager.data.personality.coreMotivation"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">Core Motivation</label>
                </IftaLabel>

                <h3>Preferences</h3>

                <IftaLabel>
                  <InputText
                    v-model="manager.data.preferences.favoriteColor"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">Favourite Color</label>
                </IftaLabel>

                <IftaLabel>
                  <InputText
                    v-model="manager.data.preferences.likes"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">Likes</label>
                </IftaLabel>

                <IftaLabel>
                  <InputText
                    v-model="manager.data.preferences.dislikes"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">Dislikes</label>
                </IftaLabel>

                <IftaLabel>
                  <InputText
                    v-model="manager.data.preferences.fears"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">Fears</label>
                </IftaLabel>

                <IftaLabel>
                  <TextArea
                    v-model="manager.data.personality.notes"
                    size="small"
                    inputId="dob"
                  />
                  <label for="dob">Notes</label>
                </IftaLabel>
              </div>
            </section>
          </AccordionContent>
        </AccordionPanel>

        <!-- Social Info -->
        <AccordionPanel value="2">
          <AccordionHeader>Social Information</AccordionHeader>
          <AccordionContent>
            <IftaLabel>
              <InputText
                v-model="manager.data.socialInfo.titles"
                size="small"
                inputId="dob"
              />
              <label for="dob">Titles</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.socialInfo.occupations"
                size="small"
                inputId="dob"
              />
              <label for="dob">Occupation</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.socialInfo.status"
                size="small"
                inputId="dob"
              />
              <label for="dob">Status</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.socialInfo.affiliationIds"
                size="small"
                inputId="dob"
              />
              <label for="dob">Affiliations</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.socialInfo.factionIds"
                size="small"
                inputId="dob"
              />
              <label for="dob">Factions</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.socialInfo.domainIds"
                size="small"
                inputId="dob"
              />
              <label for="dob">Domains</label>
            </IftaLabel>

            <IftaLabel>
              <InputText
                v-model="manager.data.socialInfo.commandments"
                size="small"
                inputId="dob"
              />
              <label for="dob">Commandments</label>
            </IftaLabel>
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

              <IftaLabel>
                <InputText
                  v-model="manager.data.relationshipIds"
                  size="small"
                  inputId="dob"
                />
                <label for="dob">Relationships</label>
              </IftaLabel>
            </div>
            <div class="half-width">
              <h2>Story/History</h2>

              <IftaLabel>
                <InputText
                  v-model="manager.data.historyIds"
                  size="small"
                  inputId="dob"
                />
                <label for="dob">Story/History</label>
              </IftaLabel>
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
