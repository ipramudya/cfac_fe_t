import { NextUIProvider } from '@nextui-org/react'
import { useHref, useNavigate } from 'react-router-dom'

export function UIProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      {children}
    </NextUIProvider>
  )
}
