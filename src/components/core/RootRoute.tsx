import { RootRouteLayout } from '@/components/layout'
import { ChatPage, LoginPage, RegisterPage } from '@/components/pages'
import { Navigate, RouteObject } from 'react-router-dom'

export function RootRoute() {
  return [
    {
      path: '/',
      element: <RootRouteLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/chat" replace />,
        },
        {
          path: '/auth/login',
          element: <LoginPage />,
        },
        {
          path: '/auth/register',
          element: <RegisterPage />,
        },
        {
          path: '/chat',
          element: <ChatPage />,
        },
      ],
    },
  ] as RouteObject[]
}
