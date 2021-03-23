import React, { ReactNode, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
interface BlinkProps {
  style?: ViewStyleProps
  children?: ReactNode
  intervalMS?: Milliseconds
  delayMS?: Milliseconds
}

export function Shimmer({
  style,
  children,
  delayMS = 0,
  intervalMS = 700,
}: BlinkProps) {
  const opacity = useRef(new Animated.Value(0)).current
  const animation = useRef<Animated.CompositeAnimation>()
  useEffect(() => {
    animation.current = Animated.sequence([
      Animated.delay(delayMS),
      Animated.loop(
        Animated.timing(opacity, {
          duration: intervalMS * 2,
          toValue: 2,
          useNativeDriver: true,
          isInteraction: false,
        }),
      ),
    ])
    animation.current.start()
    return () => animation.current?.stop()
  }, [])

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: opacity.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0.2, 1, 0.2],
          }),
        },
      ]}>
      {children}
    </Animated.View>
  )
}
