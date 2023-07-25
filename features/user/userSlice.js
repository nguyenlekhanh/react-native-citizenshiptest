import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: '',
  },
  reducers: {
    saveUser: (state, action) => {
      return [...state, action.payload];
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveUser } = userSlice.actions

export default userSlice.reducer