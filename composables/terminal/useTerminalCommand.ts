// composables/terminal/useTerminalCommand.ts
import { ref, nextTick, type Ref } from 'vue'
import TerminalService from 'primevue/terminalservice'

/**
 * useTerminalCommand
 * Encapsulates keyboard shortcuts (Shift+~), splitter resizing,
 * and registers the TerminalService command event.
 *
 * @param terminalRef - ref to the Terminal component
 * @param terminalPanel - ref to the SplitterPanel wrapping the Terminal
 * @param mainPanel - ref to the SplitterPanel containing main content
 * @param commandHandler - function to handle terminal commands
 */
export function useTerminalCommand(
  terminalRef: Ref<any>,
  terminalPanel: Ref<any>,
  mainPanel: Ref<any>,
  commandHandler: (command: string) => void
) {
  // Tracks whether the terminal panel is expanded or collapsed
  let isTerminalExpanded = false

  // Toggle the splitter sizes by directly modifying flexBasis
  const toggleTerminalPanel = async () => {
    const terminalEl = terminalPanel.value?.$el
    const mainEl = mainPanel.value?.$el
    if (terminalEl && mainEl) {
      if (isTerminalExpanded) {
        // Collapse terminal (set size to 0%)
        terminalEl.style.flexBasis = '0%'
        mainEl.style.flexBasis = '100%'
        isTerminalExpanded = false
        // Blur terminal input
        const inputEl = terminalRef.value?.$el?.querySelector('input')
        if (inputEl) inputEl.blur()
      } else {
        // Expand terminal (e.g. 30% for terminal, 70% for main)
        terminalEl.style.flexBasis = '30%'
        mainEl.style.flexBasis = '70%'
        isTerminalExpanded = true
        await nextTick()
        // Focus terminal input
        const inputEl = terminalRef.value?.$el?.querySelector('input')
        if (inputEl) inputEl.focus()
      }
    }
  }

  // Global keyboard event: Shift + ~ toggles the terminal panel
  const focusTerminalOnShortcut = async (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === '~') {
      event.preventDefault()
      await toggleTerminalPanel()
    }
  }

  // Register event listeners and command handler
  const initTerminal = () => {
    window.addEventListener('keydown', focusTerminalOnShortcut)
    TerminalService.on('command', commandHandler)
  }

  const destroyTerminal = () => {
    window.removeEventListener('keydown', focusTerminalOnShortcut)
    TerminalService.off('command', commandHandler)
  }

  return {
    initTerminal,
    destroyTerminal,
    toggleTerminalPanel,
  }
}
