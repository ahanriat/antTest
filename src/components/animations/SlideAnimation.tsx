import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'

interface SlideAnimationProps {
  style?: ViewStyleProps
  duration?: number // default 3000
  children: React.ReactNode
}

export default function SlideAnimation(props: SlideAnimationProps) {
  const [width, setWidth] = useState(0)
  const animatedValue = useRef(new Animated.Value(-1))
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue.current, {
        duration: props.duration || 3000,
        useNativeDriver: true,
        toValue: 1,
      }),
    ).start()
  }, [])
  const translateX = animatedValue.current.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-width, 0, width],
  })

  return (
    <Animated.View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={[props.style, { transform: [{ translateX }] }]}>
      {props.children}
    </Animated.View>
  )
}
