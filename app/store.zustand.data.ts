import { create } from 'zustand'

interface DataState {
  data: any
  setData: (data: any) => void
  data2020: any
  setData2020: (data: any) => void
}

export const useDataStore = create<DataState>()((set) => ({
  data: '',
  setData: (data) => set((state) => ({ data: data })),
  data2020: '',
  setData2020: (data) => set((state) => ({ data2020: data }))
}))