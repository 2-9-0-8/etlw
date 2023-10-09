import { useEffect } from 'react'

export default function useLockBodyScroll(open: boolean) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    if (open) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [open])
}
