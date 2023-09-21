import React, { isValidElement } from 'react'
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'

type TColor = 'sol-green' | 'sol-purple' | 'zinc' | 'white' | 'black'
type TSize = 'sm' | 'lg' | 'xl' | 'full'
type TBorder = 0 | 2 | 4 | 8
type TRadius = 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

interface ButtonProps {
  title?: string
  color?: TColor
  textColor?: TColor
  textSize?: TSize
  border?: TBorder
  borderColor?: TColor
  radius?: TRadius
  iconPrefix?: React.ReactNode
  iconSuffix?: React.ReactNode
  className?: string
  style?: StyleProp<ViewStyle>
  onPress: () => void
  isDisabled?: boolean
  isLoading?: boolean
}

const Button = (props: ButtonProps) => {
  const isIconPrefix = isValidElement(props.iconPrefix)

  const bgColor = () => {
    switch (props.color) {
      case 'sol-green':
        return 'bg-solana-green'
      case 'sol-purple':
        return 'bg-solana-purple'
      case 'black':
        return 'bg-black'
      case 'white':
        return 'bg-white'
      case 'zinc':
        return 'bg-zinc-800'
    }
  }

  const textColor = () => {
    switch (props.textColor) {
      case 'sol-green':
        return 'text-solana-green'
      case 'sol-purple':
        return 'text-solana-purple'
      case 'black':
        return 'text-black'
      case 'white':
        return 'text-white'
      case 'zinc':
        return 'text-zinc-500'
    }
  }

  const textSize = () => {
    switch (props.textSize) {
      case 'sm':
        return 'text-sm'
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      case 'full':
        return 'text-full'
    }
  }

  const border = () => {
    switch (props.border) {
      case 0:
        return 'border'
      case 2:
        return 'border-2'
      case 4:
        return 'border-4'
      case 8:
        return 'border-8'
    }
  }

  const borderColor = () => {
    switch (props.borderColor) {
      case 'sol-green':
        return 'border-solana-green'
      case 'sol-purple':
        return 'border-solana-purple'
      case 'black':
        return 'border-black'
      case 'white':
        return 'border-white'
      case 'zinc':
        return 'border-zinc-700'
    }
  }

  const radius = () => {
    switch (props.radius) {
      case 'xs':
        return 'rounded-xs'
      case 'sm':
        return 'rounded-sm'
      case 'lg':
        return 'rounded-lg'
      case 'xl':
        return 'rounded-xl'
      case '2xl':
        return 'rounded-2xl'
      case '3xl':
        return 'rounded-3xl'
      case 'full':
        return 'rounded-full'
    }
  }

  return (
    <StyledTouchableOpacity
      className={`${
        props.className
      } ${bgColor()} ${border()} ${borderColor()} ${radius()}`}
      activeOpacity={0.8}
      style={[props.style, { opacity: props.isDisabled ? 0.5 : 1 }]}
      onPress={props.onPress}
      disabled={props.isDisabled}
    >
      <StyledView className="flex flex-row justify-between items-center mx-4">
        {props.iconPrefix}
        {props.isLoading ? (
          <StyledView className="absolute inset-x-0">
            <ActivityIndicator size={30} color="white" />
          </StyledView>
        ) : (
          <StyledText
            className={`${
              !isIconPrefix && 'absolute'
            } ${textColor()} ${textSize()}`}
          >
            {props.title}
          </StyledText>
        )}
        <StyledView
          className={`${'flex flex-row justify-end'} ${
            !isIconPrefix && 'w-full'
          }`}
        >
          {props.iconSuffix}
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  )
}

export default Button
