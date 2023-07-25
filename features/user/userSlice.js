import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
  },
  reducers: {
    saveUser: (state) => {
      return [...state, action.payload];
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveUser } = counterSlice.actions

export default userSlice.reducer