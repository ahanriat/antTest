import React from 'react'
import { View } from 'react-native'

interface SpaceProps {
  size?: number // default 16
  style?: ViewStyleProps
}

export default function Space(props: SpaceProps) {
  const { size = 16 } = props
  return <View style={[{ height: size, width: size }, props.style]} />
}
