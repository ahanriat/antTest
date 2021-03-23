import { AntColor } from '~/__generated__/globalTypes'

export interface Ant {
  name: string
  lengthMillimeters: number
  color: AntColor
  likelihoodOfAntWinning: LikelihoodOfAntWinning
}

export interface LikelihoodOfAntWinning {
  status: 'idle' | 'computing' | 'success'
  value: number
  compute(callback: (likelihoodOfAntWinning: number) => void): void
}
