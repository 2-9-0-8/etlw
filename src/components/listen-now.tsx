import { forwardRef, useCallback, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import useClickOutside from '@/hooks/use-click-outside'
import useFocusTrap from '@/hooks/use-focus-trap'

import Button from '@/components/button'
import type { Props as $Button } from '@/components/button'

type Props = {
  children: React.ReactNode
  translateHalf: $Button['translateHalf']
  anchor?: 'top' | 'bottom' | 'none'
}

export default function ListenNow({ children, translateHalf, anchor = 'none' }: Props) {
  const [open, setOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null) as React.MutableRefObject<HTMLButtonElement>
  const menuRef = useClickOutside(
    () => setOpen(false),
    buttonRef
  ) as React.MutableRefObject<HTMLDivElement>

  useFocusTrap(wrapperRef, open, () => {
    setOpen(false)
    buttonRef.current?.focus()
  })

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'relative mx-auto w-fit',
        translateHalf === 'top'
          ? '-translate-y-1/2'
          : translateHalf === 'bottom'
          ? 'translate-y-1/2'
          : ''
      )}>
      <Button ref={buttonRef} variant="primary" onClick={() => setOpen(prev => !prev)}>
        Listen now
      </Button>

      <ListenNowMenu ref={menuRef} open={open} anchor={anchor}>
        {children}
      </ListenNowMenu>
    </div>
  )
}

const ListenNowMenu = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    open: boolean
    anchor?: Props['anchor']
  }
>(({ children, open, anchor = 'top' }, ref) => {
  const shouldAnchor = anchor !== 'none'
  const styleMap = {
    top: 'bottom-[calc(100%_+_.5rem)] left-1/2 -translate-x-1/2',
    bottom: 'top-[calc(100%_+_.5rem)] left-1/2 -translate-x-1/2',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 flex pointer-events-none transition-all duration-300 z-10 ease-in-out scale-90 -translate-y-4',
        open && 'opacity-100 pointer-events-auto translate-y-0 scale-100',
        shouldAnchor && styleMap[anchor],
        shouldAnchor && 'absolute'
      )}>
      {children}
    </div>
  )
})

ListenNowMenu.displayName = 'ListenNowMenu'
