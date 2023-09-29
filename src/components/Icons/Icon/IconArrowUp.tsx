import React from 'react'
import { Svg, Path } from 'react-native-svg'

interface IconArrowUpProps {
  size: number
  color: string
}

const IconArrowUp = ({ size, color }: IconArrowUpProps) => {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      color={color}
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </Svg>
  )
}

export default IconArrowUp
