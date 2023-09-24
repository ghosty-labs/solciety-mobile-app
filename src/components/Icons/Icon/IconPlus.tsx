import React from 'react'
import { Svg, Path } from 'react-native-svg'

interface IconPlusProps {
  size: number
  color: string
}

const IconPlus = ({ size, color }: IconPlusProps) => {
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
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </Svg>
  )
}

export default IconPlus
