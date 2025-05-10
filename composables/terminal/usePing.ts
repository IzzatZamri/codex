// composables/terminal/usePing.ts
import { ref, nextTick } from 'vue'
import TerminalService from 'primevue/terminalservice'

export function usePing(terminalInputGetter: () => HTMLInputElement | null) {
  const isPinging = ref(false)
  let intervalId: number | null = null
  let pingCount = 0
  let inputListener: ((e: KeyboardEvent) => void) | null = null
  let awaitingConfirmation = false
  let isInterupted = false

  // Start ping loop and attach interruption listener.
  const startPing = async () => {
    if (isPinging.value) return
    isPinging.value = true

    if (!isInterupted) {
      pingCount = 0
      TerminalService.emit('response', 'Ping process started.')
    } else {
      TerminalService.emit('response', 'Ping process resume.')
    }
    intervalId = window.setInterval(() => {
      pingCount++
      TerminalService.emit('response', `ping: ${pingCount}`)
      if (pingCount >= 10) {
        stopPing()
        TerminalService.emit('response', 'Ping process completed')
      }
    }, 1000)

    // Wait for terminal input to be rendered and attach keydown listener
    await nextTick()
    const inputEl = terminalInputGetter()
    if (inputEl) {
      inputListener = (e: KeyboardEvent) => {
        // If already awaiting confirmation, do nothing.
        if (awaitingConfirmation) return
        // Any key press interrupts ping.
        stopPing()
        isInterupted = true
        awaitingConfirmation = true
        TerminalService.emit(
          'response',
          'Ping interrupted. Stop ping process? (Y/N)'
        )
      }
      inputEl.addEventListener('keydown', inputListener)
    }
  }

  // Stop the ping loop and remove any attached listener.
  const stopPing = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    if (isPinging.value) {
      TerminalService.emit('response', 'Ping process stopped.')
    }
    isPinging.value = false
    awaitingConfirmation = false
    const inputEl = terminalInputGetter()
    if (inputEl && inputListener) {
      inputEl.removeEventListener('keydown', inputListener)
      inputListener = null
    }
  }

  // Handle confirmation command when ping is interrupted.
  // Expects command "Y" or "N" from the user.
  const handleConfirmation = (response: string) => {
    if (!awaitingConfirmation) return false
    if (response.trim().toUpperCase() === 'Y') {
      TerminalService.emit('response', 'Ping remains stopped.')
      awaitingConfirmation = false
      isInterupted = false
    } else if (response.trim().toUpperCase() === 'N') {
      TerminalService.emit('response', 'Resuming ping process.')
      awaitingConfirmation = false
      startPing()
    } else {
      TerminalService.emit('response', 'Please enter Y or N.')
      isInterupted = true
      return true
    }
    return true
  }

  return {
    isPinging,
    startPing,
    stopPing,
    handleConfirmation,
  }
}
