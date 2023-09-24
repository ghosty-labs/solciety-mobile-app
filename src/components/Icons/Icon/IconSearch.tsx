import React from 'react'
import { Svg, Path } from 'react-native-svg'

interface IconSearchProps {
  size: number
  color: string
}

const IconSearch = ({ size, color }: IconSearchProps) => {
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
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </Svg>
  )
}

export default IconSearch
