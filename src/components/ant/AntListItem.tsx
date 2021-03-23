import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { computeAntLikelyHoodOfWinning } from '~/hooks/antsHooks'
import { Ant } from '~/models/ant'
import { Shimmer } from '../animations/Shimmer'
import AntAvatar from './AntAvatar'

interface AntListItemProps {
  ant: Ant
  style?: ViewStyleProps
}

export default function AntListItem({ ant, style }: AntListItemProps) {
  return (
    <TouchableOpacity
      disabled={ant.likelihoodOfAntWinning.status !== 'idle'}
      style={[{ flexDirection: 'row' }, style]}
      onPress={() => computeAntLikelyHoodOfWinning(ant.name)}>
      <View style={{ width: 100 }}>
        <AntAvatar {...ant} maxWidth={100} />
      </View>
      <View style={{ flex: 1, marginHorizontal: 12 }}>
        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: 'bold' }}>
          {ant.name}
        </Text>
        <Text style={{ marginBottom: 4 }}>📏 {ant.lengthMillimeters}mm</Text>
        {ant.likelihoodOfAntWinning.status === 'computing' && (
          <Shimmer>
            <Text>⚙️ Computing odds of winning...</Text>
          </Shimmer>
        )}
        {ant.likelihoodOfAntWinning.status === 'success' && (
          <Text>
            🏆 {(ant.likelihoodOfAntWinning.value * 100).toFixed(2)}% chance of
            winning
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}
