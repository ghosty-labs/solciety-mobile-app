import React from 'react'
import { Svg, Path } from 'react-native-svg'

interface IconChevronLeftProps {
  size: number
  color: string
}

const IconChevronLeft = ({ size, color }: IconChevronLeftProps) => {
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
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </Svg>
  )
}

export default IconChevronLeft
