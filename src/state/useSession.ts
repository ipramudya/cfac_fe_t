import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Session = {
  token: string
  user: {
    id: string
    username: string
    createdAt: Date
  }
}

type SessionState = {
  session: Session | null
  setSession: (token: Session) => void
  clearToken: () => void
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (data: Session) => set({ session: data }),
      clearToken: () => set({ session: null }),
    }),
    {
      name: 'session-token',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
