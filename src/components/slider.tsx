import {
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react'

import { cn } from '@/lib/utils'

const SliderContext = createContext<{
  trackWidth: React.MutableRefObject<number>
}>({
  trackWidth: { current: 0 },
})

export default function Slider({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const trackWidth = useRef(0)

  return (
    <SliderContext.Provider value={{ trackWidth }}>
      <div className={cn('flex flex-col', className)}>{children}</div>
    </SliderContext.Provider>
  )
}

export function SliderControls({ className }: { className?: string }) {
  const { trackWidth } = useContext(SliderContext)

  return (
    <div className={cn('flex', className)}>
      <button onClick={() => console.log(trackWidth)}>Previous</button>
      <button>Next</button>
    </div>
  )
}

export function SliderTrack({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { trackWidth } = useContext(SliderContext)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleState() {
      if (trackRef.current) {
        trackWidth.current = trackRef.current.offsetWidth
        trackRef.current.scrollLeft = 0
      }
    }

    handleState()

    let observer: ResizeObserver | null = new ResizeObserver(handleState)

    if (trackRef.current) {
      observer.observe(trackRef.current)
    }

    return () => {
      if (trackRef.current) {
        observer?.unobserve(trackRef.current)
      }

      observer = null
    }
  }, [])

  return (
    <div
      ref={trackRef}
      className={cn('hide-scrollbar flex snap-x snap-mandatory overflow-x-scroll', className)}>
      {children}
    </div>
  )
}
