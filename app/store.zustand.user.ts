import { create } from 'zustand'

interface UserState {
  user: any
  setUser: (userInfo: any) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: 0,
  setUser: (userInfo) => set((state) => ({ user: userInfo })),
}))