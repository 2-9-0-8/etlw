import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

type ReactProps<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<T, React.ComponentPropsWithRef<T>>

export type Props = {
  children: React.ReactNode
  as?: React.ElementType
  variant?: 'primary' | 'secondary' | 'tertiary'
  translateHalf?: 'top' | 'bottom'
  className?: string
}

const defaultElement = 'button'

const Button = forwardRef(
  (
    {
      children,
      as: Cmp = defaultElement,
      variant = 'primary',
      translateHalf,
      className,
      ...rest
    }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    const styleMap: Record<typeof variant, string> = {
      primary: 'text-off-white bg-0range-textured',
      secondary: 'text-0range bg-white',
      tertiary: 'text-0range bg-transparent',
    }

    return (
      <Cmp
        ref={ref}
        className={cn(
          'text-xl mx-auto w-fit rounded-full px-10 py-3 font-display font-extrabold uppercase md:px-12 md:py-4 md:text-2xl',
          translateHalf === 'top'
            ? '-translate-y-1/2'
            : translateHalf === 'bottom'
            ? 'translate-y-1/2'
            : '',
          styleMap[variant],
          className
        )}
        {...rest}>
        {children}
      </Cmp>
    )
  }
) as <T extends React.ElementType = typeof defaultElement>(
  props: { as?: T } & Omit<ReactProps<T>, 'as'> & Props
) => JSX.Element

export default Button
