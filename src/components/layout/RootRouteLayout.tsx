import { Container } from '@/components/shared'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export function RootRouteLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {
    if (pathname.includes('/auth')) return

    navigate('/chat', { replace: true })
  }, [navigate, pathname])

  return (
    <Container>
      <div>
        <p>hello world, root layout</p>
      </div>
      <Outlet />
    </Container>
  )
}
