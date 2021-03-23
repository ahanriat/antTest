import React from 'react'
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components'

interface ButtonPrimaryProps extends TouchableOpacityProps {
  label: string
}

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  return (
    <ButtonContainer {...props}>
      <Label>{props.label}</Label>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(TouchableOpacity)`
  border: 1px solid black;
  padding: 12px;
  height: 56px;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border-width: 2px;
`

const Label = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`
