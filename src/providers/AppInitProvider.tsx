import React, { useEffect, useState } from 'react'
import { initAuth } from '~/services/AuthService'

export function AppInitProvider(props: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Here goes the init sequence
    initAuth().then(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return null
  }

  return <>{props.children}</>
}
