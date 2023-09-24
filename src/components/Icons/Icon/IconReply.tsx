import React from 'react'
import { Svg, Path } from 'react-native-svg'

interface IconReplyProps {
  size: number
  color: string
}

const IconReply = ({ size, color }: IconReplyProps) => {
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
        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
      />
    </Svg>
  )
}

export default IconReply
