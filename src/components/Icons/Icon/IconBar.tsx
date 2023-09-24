import React from 'react'
import { Svg, Path } from 'react-native-svg'

interface IconBarProps {
  size: number
  color: string
}

const IconBar = ({ size, color }: IconBarProps) => {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      color={color}
      // xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
      />
    </Svg>
  )
}

export default IconBar
