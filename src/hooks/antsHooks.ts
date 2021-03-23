import { useApolloClient } from '@apollo/client'
import { useEffect } from 'react'
import { createState, useState } from '@hookstate/core'
import { fetchAnts } from '~/api/antsApi'
import { Ant } from '~/models/ant'

type AntListStatus =
  | 'fetching_ants'
  | 'ready'
  | 'computing_likelihood_of_winning'

const antsListStore = createState<Ant[]>([])

export function useAnts() {
  const apolloClient = useApolloClient()
  const antsList = useState(antsListStore)
  const hasAnts = antsList.get().length > 0
  const loadingState = useState(!hasAnts)

  useEffect(() => {
    // Don't refetch the list if it's already there
    if (hasAnts) {
      return
    }
    fetchAnts(apolloClient).then((result) => {
      antsList.set(
        result.data.ants.map((ant) => ({
          ...ant,
          likelihoodOfAntWinning: {
            status: 'idle',
            value: 0,
            compute: generateAntWinLikelihoodCalculator(),
          },
        })),
      )
      loadingState.set(false)
    })
  }, [])

  return {
    ants: sortByMostLikelyToWin(antsList.get()),
    loading: loadingState.get(),
    computeAllLikelyHoodOfWinning,
  }
}

function computeAllLikelyHoodOfWinning() {
  const antsList = antsListStore.get()
  antsList.forEach(({ name }) => computeAntLikelyHoodOfWinning(name))
}

export function computeAntLikelyHoodOfWinning(antName: string) {
  const antsList = antsListStore.get()
  const updatedAnt = antsList.find((ant) => ant.name === antName)
  if (!updatedAnt || updatedAnt.likelihoodOfAntWinning.status !== 'idle') {
    return
  }
  setStatusToComputing(updatedAnt.name)
  updatedAnt.likelihoodOfAntWinning.compute(async (value) => {
    setLikelihoodOfWinning(updatedAnt.name, value)
  })
}

function generateAntWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000
  const likelihoodOfAntWinning = Math.random()

  return (callback: (likelihoodOfAntWinning: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning)
    }, delay)
  }
}

function setStatusToComputing(antName: string) {
  antsListStore.set((prevList) =>
    prevList.map((ant) => {
      if (
        antName === ant.name &&
        ant.likelihoodOfAntWinning.status !== 'computing'
      ) {
        return {
          ...ant,
          likelihoodOfAntWinning: {
            ...ant.likelihoodOfAntWinning,
            status: 'computing',
          },
        }
      }
      return ant
    }),
  )
}

function setLikelihoodOfWinning(antName: string, value: number) {
  antsListStore.set((prevList) =>
    prevList.map((ant) => {
      if (antName === ant.name) {
        return {
          ...ant,
          likelihoodOfAntWinning: {
            ...ant.likelihoodOfAntWinning,
            status: 'success',
            value,
          },
        }
      }
      return ant
    }),
  )
}

function sortByMostLikelyToWin(list: Ant[]): Ant[] {
  return [...list].sort((ant1, ant2) => {
    return ant1.likelihoodOfAntWinning.value > ant2.likelihoodOfAntWinning.value
      ? -1
      : 1
  })
}
