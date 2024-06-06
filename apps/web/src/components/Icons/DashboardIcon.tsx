import { rem } from '@mantine/core'

interface DashboardIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string
  fill?: string
  stroke?: string
}

export function DashboardIcon({ size = 24, style, fill = 'currentColor', stroke, ...others }: DashboardIconProps) {
  return (
    <svg
      id='icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 140 140'
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path
        id='Layer'
        className='s0'
        fill={fill}
        stroke={stroke}
        d='m16.1 4.6c0.8 1.3 1.3 2.8 1.3 4.4 0.1 1.6-0.3 3.1-1.1 4.5q-0.2 0.4-0.6 0.6-0.4 0.2-0.9 0.2h-11.8q-0.4 0-0.8-0.2-0.4-0.2-0.6-0.6c-1-1.7-1.4-3.6-1.1-5.5 0.3-1.9 1.2-3.6 2.6-4.9 1.4-1.3 3.1-2.1 5-2.3 1.9-0.2 3.8 0.3 5.4 1.3l-1.5 1c-1.3-0.6-2.8-0.8-4.3-0.6-1.4 0.3-2.7 1-3.7 2-1 1.1-1.7 2.5-1.8 3.9-0.2 1.5 0.1 3 0.8 4.2h11.8c0.6-1 0.9-2.1 0.9-3.2 0.1-1.1-0.2-2.2-0.7-3.2l1.1-1.6z'
      />
      <path
        id='Layer'
        className='s0'
        fill={fill}
        stroke={stroke}
        d='m7.3 9.9q-0.1-0.4-0.1-0.7 0-0.3 0.1-0.6 0.2-0.4 0.4-0.6l7.2-4.8-4.8 7.2q-0.2 0.3-0.5 0.4-0.3 0.1-0.7 0.1-0.3 0-0.6-0.1-0.3-0.1-0.6-0.4-0.2-0.2-0.4-0.5z'
      />
    </svg>
  )
}