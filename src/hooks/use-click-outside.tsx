import { useEffect, useRef } from 'react'

export default function useClickOutside(
  onClick: () => void,
  ignore?: React.RefObject<HTMLElement> | string
) {
  const ref = useRef<HTMLElement | null>(null)

  function handleClick(e: Event) {
    const target = e.target as HTMLElement
    const ignored = ignore
      ? typeof ignore === 'string'
        ? document.querySelector(ignore)
        : ignore.current
      : null

    if (
      target !== ref.current &&
      !ref.current?.contains(target) &&
      (!ignored || !ignored.contains(target))
    ) {
      onClick?.()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return ref
}
