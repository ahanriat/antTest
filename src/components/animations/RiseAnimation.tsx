import { range } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { useDelay } from '../../utils/toolbox'

interface RiseAnimationProps {
  staggerDelay?: number
  duration?: number
  initialDelay?: number
  lazyRender?: boolean // default false. Will not rendre the children before the initialDelay is over
  translateYDistance?: number // default 10;
  style?: ViewStyleProps
  children: React.ReactNode
}
export default function RiseAnimation({
  staggerDelay = 150,
  duration,
  initialDelay,
  translateYDistance = 10,
  style,
  children,
}: RiseAnimationProps) {
  const childrenCount = React.Children.count(children)
  const previousChildrenCount = useRef(childrenCount)
  const animatedValues = useRef(
    range(childrenCount).map(() => new Animated.Value(0)),
  )

  const startAnimation = () => {
    Animated.stagger(
      staggerDelay,
      animatedValues.current.map((animatedValue) =>
        Animated.timing(animatedValue, {
          duration,
          toValue: 1,
          useNativeDriver: true,
        }),
      ),
    ).start()
  }

  useDelay(() => {
    startAnimation()
  }, initialDelay)

  useEffect(() => {
    if (previousChildrenCount.current !== childrenCount) {
      startAnimation()
    }
    previousChildrenCount.current = childrenCount
    animatedValues.current = animatedValues.current.slice(0, childrenCount)
  }, [childrenCount])

  return (
    <>
      {React.Children.map(children, (child, index) => {
        let animatedValue = animatedValues.current[index]
        if (!animatedValue) {
          animatedValue = new Animated.Value(0)
          animatedValues.current[index] = animatedValue
        }
        const riseStyle = {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [translateYDistance, 0],
              }),
            },
          ],
        }

        return (
          <Animated.View key={index} style={[riseStyle, style]}>
            {child}
          </Animated.View>
        )
      })}
    </>
  )
}
