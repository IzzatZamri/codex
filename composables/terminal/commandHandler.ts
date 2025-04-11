// composables/terminal/commandHandler.ts
import TerminalService from 'primevue/terminalservice'
import { usePing } from './usePing'
import { ref } from 'vue'

// A ref to store the terminal input element
export const terminalInputRef = ref<HTMLElement | null>(null)

// Create our ping instance from the usePing composable.
const { isPinging, startPing, stopPing, handleConfirmation } = usePing(() => {
  return terminalInputRef.value?.querySelector(
    'input'
  ) as HTMLInputElement | null
})

export async function commandHandler(command: string): Promise<void> {
  const trimmed = command.trim()

  // If in confirmation mode, let that handler process first.
  if (!isPinging.value && handleConfirmation(trimmed)) {
    return
  }

  const argsIndex = trimmed.indexOf(' ')
  const baseCommand =
    argsIndex !== -1 ? trimmed.substring(0, argsIndex) : trimmed

  switch (baseCommand) {
    case '/date': {
      TerminalService.emit('response', 'Today is ' + new Date().toDateString())
      break
    }
    case '/ping': {
      if (!isPinging.value) {
        startPing()
      } else {
        stopPing()
      }
      return
    }
    case '/help': {
      TerminalService.emit('response', '/date, /ping, /help')
      return
    }
    default: {
      TerminalService.emit('response', 'Unknown command: ' + baseCommand)
    }
  }
}
