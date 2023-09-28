import React from 'react'
import { Svg, Path } from 'react-native-svg'

interface IconXPros {
  size: number
  color: string
}

const IconX = ({ size, color }: IconXPros) => {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      color={color}
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </Svg>
  )
}

export default IconX
