import React from 'react'
import { AntColor } from '~/__generated__/globalTypes'
import SlideAnimation from '../animations/SlideAnimation'
import RowView from '../layout/RowView'
import AntAvatar from './AntAvatar'

interface AntsRunningAnimationProps {}

export default function AntsRunningAnimation(props: AntsRunningAnimationProps) {
  return (
    <SlideAnimation key="AntsRunningAnimation">
      <RowView style={{ marginVertical: 16, justifyContent: 'space-around' }}>
        <AntAvatar maxWidth={70} lengthMillimeters={10} color={AntColor.RED} />
        <AntAvatar
          maxWidth={70}
          lengthMillimeters={10}
          color={AntColor.SILVER}
        />
        <AntAvatar
          maxWidth={70}
          lengthMillimeters={10}
          color={AntColor.BLACK}
        />
      </RowView>
    </SlideAnimation>
  )
}
