import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

export default function Scrollable({
  children,
  fromTo,
  class: className,
  size = 'md',
}: {
  children: React.ReactNode
  fromTo: string
  class?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<ResizeObserver>()

  const [isLeftEdgeVisible, setIsLeftEdgeVisible] = useState(false)
  const [isRightEdgeVisible, setIsRightEdgeVisible] = useState(false)

  function handleScroll(target: HTMLElement | null) {
    if (!target) {
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = target

    setIsLeftEdgeVisible(scrollLeft > 0)
    setIsRightEdgeVisible(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    const wrapper = wrapperRef.current

    if (!wrapper) {
      return
    }

    resizeRef.current = new ResizeObserver(() => handleScroll(wrapper))
    resizeRef.current.observe(wrapper)

    handleScroll(wrapper)

    return () => {
      if (wrapper && resizeRef.current) {
        resizeRef.current.unobserve(wrapper)
      }
    }
  }, [])

  function GradientMask({ visible, flipped }: { visible?: boolean; flipped?: boolean }) {
    const sizeMap = {
      sm: 'w-4',
      md: 'w-6',
      lg: 'w-8',
      xl: 'w-10',
      '2xl': 'w-12',
      '3xl': 'w-14',
      '4xl': 'w-16',
    }

    return (
      <div
        className={cn(
          'pointer-events-none absolute z-10 opacity-0 transition-opacity duration-100',
          fromTo,
          flipped ? 'inset-[0_0_0_auto] bg-gradient-to-l' : 'inset-[0_auto_0_0] bg-gradient-to-r',
          visible && 'opacity-100',
          sizeMap[size]
        )}
        aria-hidden="true"></div>
    )
  }

  return (
    <div className="relative">
      <GradientMask visible={isLeftEdgeVisible} />
      <div
        ref={wrapperRef}
        onScroll={e => handleScroll(e.currentTarget)}
        className={cn('hide-scrollbar flex overflow-auto', className)}>
        {children}
      </div>
      <GradientMask visible={isRightEdgeVisible} flipped />
    </div>
  )
}
