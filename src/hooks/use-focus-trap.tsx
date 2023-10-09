import { useEffect } from 'react'

export const selectors = [
  'a[href]:not([tabindex^="-"])',
  'area[href]:not([tabindex^="-"])',
  'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
  'input[type="radio"]:not([disabled]):not([tabindex^="-"])',
  'select:not([disabled]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([tabindex^="-"])',
  'button:not([disabled]):not([tabindex^="-"])',
  'iframe:not([tabindex^="-"])',
  'audio[controls]:not([tabindex^="-"])',
  'video[controls]:not([tabindex^="-"])',
  '[contenteditable]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])',
  'details:not([tabindex^="-"])',
]

export default function useFocusTrap(
  ref: React.MutableRefObject<HTMLElement | null>,
  active: boolean,
  onEsc?: () => void
) {
  useEffect(() => {
    if (!active) {
      return
    }

    const node = ref.current

    if (!node) {
      return
    }

    const focusableElements = node.querySelectorAll(selectors.join(','))

    if (!focusableElements.length) {
      return
    }

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Tab':
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
            }
          }
          break
        case 'Escape':
          e.preventDefault()
          onEsc ? onEsc() : node?.blur()
          break
      }
    }

    node.addEventListener('keydown', handleKeyDown)

    return () => {
      node.removeEventListener('keydown', handleKeyDown)
    }
  })
}
