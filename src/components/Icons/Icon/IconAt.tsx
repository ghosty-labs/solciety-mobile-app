import React from 'react'
import { Svg, Path } from 'react-native-svg'

interface IconAtProps {
  size: number
  color: string
}

const IconAt = ({ size, color }: IconAtProps) => {
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
        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
      />
    </Svg>
  )
}

export default IconAt