<template>
  <div>
    <Splitter style="height: 100dvh" :gutterSize="1">
      <SplitterPanel ref="panel1" :size="15" :minSize="5">
        Left Side Section: status/ analytics
      </SplitterPanel>
      <SplitterPanel ref="panel2" :size="85">
        <Splitter layout="vertical" :gutterSize="1">
          <SplitterPanel ref="mainPanel" :size="90" :minSize="5">
            <Menubar :model="items" />
            <main>
              <NuxtPage />
            </main>
          </SplitterPanel>
          <SplitterPanel ref="terminalPanel" :size="10">
            <Terminal
              class="despair-terminal"
              :style="{ height: '100%' }"
              ref="despairTerminal"
              welcomeMessage="### despair network terminal ###"
              prompt="### $: "
            />
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Terminal from 'primevue/terminal'
import {
  commandHandler,
  terminalInputRef,
} from '~/composables/terminal/commandHandler'
import { useTerminalCommand } from '~/composables/terminal/useTerminalCommand'

const router = useRouter()
const items = computed(() => {
  return [
    {
      label: 'Home',
      icon: 'pi pi-link',
      command: () => {
        router.push('/')
      },
    },
    {
      label: 'Journal',
      icon: 'pi pi-link',
      command: () => {
        router.push('/journal')
      },
    },
    {
      label: 'World',
      icon: 'pi pi-link',
      command: () => {
        router.push('/worlds')
      },
    },
    {
      label: 'Characters',
      icon: 'pi pi-link',
      command: () => {
        router.push('/characters')
      },
    },
    {
      label: 'Personality',
      icon: 'pi pi-link',
      command: () => {
        router.push('/personalities')
      },
    },
  ]
})

// Refs for Splitter panels and Terminal
const despairTerminal = ref<InstanceType<typeof Terminal> | null>(null)
const terminalPanel = ref<any>(null)
const mainPanel = ref<any>(null)

// Initialize terminal command functionalities (including shortcuts and resizing)
const { initTerminal, destroyTerminal } = useTerminalCommand(
  despairTerminal,
  terminalPanel,
  mainPanel,
  commandHandler
)

onMounted(async () => {
  // Wait a tick to ensure Terminal component renders completely.
  await nextTick()
  // Set the terminalInputRef to the Terminal's container element so our usePing can query its input.
  if (despairTerminal.value) {
    terminalInputRef.value = despairTerminal.value.$el
  }
  initTerminal()
})

onUnmounted(() => {
  destroyTerminal()
})
</script>

<style lang="scss">
main {
  height: 100%;
  overflow-y: scroll;
}
.p-terminal.despair-terminal {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 13px;
  line-height: 1.5;
  background-color: #0f0f23;
  color: #00ff88;
  border: none;
  border-radius: 0;
  padding: 10px;
  overflow-y: auto;

  .p-terminal-response {
    white-space: pre-wrap;
  }

  .p-terminal-prompt-label {
    font-weight: 500;
    margin-inline-end: 10px;
  }
}
</style>
