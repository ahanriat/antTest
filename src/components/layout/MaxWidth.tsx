import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import RowView from './RowView'

interface MaxWidthProps {
  maxWidth?: number
  style?: ViewStyleProps
  contentContainerStyle?: ViewStyleProps
  children: React.ReactNode
}

/**
 * Very useful to make layout work on iPad / tablet
 * One could think you could achieve this with only one view with alignSelf: center and a maxWidth
 * However doing this won't let the view grow horizontaly. The combination of a 2 views does the trick.
 */

export default function MaxWidth(props: MaxWidthProps) {
  const { style, children, contentContainerStyle, maxWidth = 450 } = props
  return (
    <Container style={style}>
      <View style={[{ maxWidth, flex: 1 }, contentContainerStyle]}>
        {children}
      </View>
    </Container>
  )
}

const Container = styled(RowView)`
  justify-content: center;
`
