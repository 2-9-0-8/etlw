import { useEffect, useRef } from 'react'

import type { Route } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function Nav({ pathname }: { pathname: string }) {
  const routes: Array<Route> = [
    { name: 'Home', href: '/' },
    { name: 'Episodes', href: '/episodes' },
    { name: 'Music', href: '/music' },
    { name: 'Research', href: '/research' },
    { name: 'About', href: '/about' },
  ]

  const navRefs = useRef<Array<{ href: string; node: HTMLAnchorElement | null }>>([])

  useEffect(() => {
    if (!navRefs.current.length) {
      return
    }

    const { node } = navRefs.current.find(({ href }) => {
      if (pathname === '/' && href === '/') {
        return href
      } else if (pathname.startsWith(href) && href !== '/') {
        return href
      }
    }) as { node: HTMLAnchorElement | null }

    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [pathname])

  return (
    <nav className="w-full py-4">
      <ul className="flex justify-between gap-8 xs:gap-12 md:justify-between md:gap-24">
        {routes.map(({ name, href }, i) => (
          <li key={href}>
            <a
              href={href}
              className={cn(
                'scroll-mx-8 font-sans font-medium lowercase text-off-white aria-current:text-0range sm:text-lg md:scroll-mx-24'
              )}
              aria-current={
                pathname === '/' && href === '/'
                  ? 'page'
                  : pathname.startsWith(href) && href !== '/'
                  ? 'page'
                  : 'false'
              }
              ref={node => (navRefs.current[i] = { href, node })}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
