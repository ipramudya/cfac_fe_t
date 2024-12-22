import { useIsomorphicEffect } from '@/hooks/useIsomorphicEffect'
import React from 'react'

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === 'undefined' || !initializeWithValue) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  })

  useIsomorphicEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const handleChange = () => {
      setMatches(mediaQueryList.matches)
    }

    mediaQueryList.addEventListener('change', handleChange)

    setMatches(mediaQueryList.matches)

    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
