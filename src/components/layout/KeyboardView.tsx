import React, { ReactNode } from 'react'
import { useHeaderHeight } from '@react-navigation/stack'
import {
  KeyboardAvoidingView,
  Platform,
  KeyboardAvoidingViewProps,
} from 'react-native'
import FlexView from './FlexView'

interface KeyboardViewProps extends KeyboardAvoidingViewProps {
  style?: ViewStyleProps
  children?: ReactNode
}

export default function KeyboardView(props: KeyboardViewProps) {
  const headerHeight = useHeaderHeight()
  if (Platform.OS === 'android') {
    return <FlexView {...props} />
  }

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, props.style]}
      keyboardVerticalOffset={headerHeight}
      behavior="padding"
      {...props}>
      {props.children}
    </KeyboardAvoidingView>
  )
}
