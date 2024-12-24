import { UIProvider } from '@/components/core'
import { Container } from '@/components/shared'
import { useSession } from '@/state'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function RootRouteLayout() {
  const { pathname } = useLocation()
  const session = useSession((state) => state.session)

  if (!session && !pathname.includes('auth')) {
    return <Navigate to="/auth/login" replace />
  }

  if (session && pathname.includes('auth')) {
    return <Navigate to="/chat" replace />
  }

  return (
    <UIProvider>
      <Container>
        <Outlet />
      </Container>
    </UIProvider>
  )
}
