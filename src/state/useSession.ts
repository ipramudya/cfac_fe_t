import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type SessionState = {
  token: string
  setToken: (token: string) => void
  clearToken: () => void
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      token: '',
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: undefined }),
    }),
    {
      name: 'session-token',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
