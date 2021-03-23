import React from 'react'
import { TextInput, TextInputProps } from 'react-native'

interface EmailInputProps extends TextInputProps {}

export default function EmailInput(props: EmailInputProps) {
  return (
    <TextInput
      {...props}
      style={[{ fontSize: 18 }, props.style]}
      textContentType="emailAddress"
      returnKeyType={props.returnKeyType || 'next'}
      autoCorrect={false}
      autoCapitalize="none"
      autoCompleteType="email"
      keyboardType="email-address"
      placeholder="john@gmail.com"
    />
  )
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function isEmailValid(email: string) {
  return EMAIL_REGEX.test(email)
}
