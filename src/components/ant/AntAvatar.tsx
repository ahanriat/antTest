import React from 'react'
import { Animated } from 'react-native'
import { AntColor } from '~/__generated__/globalTypes'

interface AntAvatarProps {
  style?: ViewStyleProps
  maxWidth: number
  lengthMillimeters: number
  color: AntColor
}

export default function AntAvatar(props: AntAvatarProps) {
  const width = Math.min(40 + 3 * props.lengthMillimeters, props.maxWidth)
  const height = width * 0.5
  return (
    <Animated.Image
      style={[
        props.style,
        {
          tintColor: ColorMap[props.color],
          height,
          width,
        },
      ]}
      source={require('./assets/ant.png')}
      resizeMode={'contain'}
    />
  )
}

const ColorMap: { [key in AntColor]: string } = {
  SILVER: 'silver',
  BLACK: 'black',
  RED: 'red',
}
