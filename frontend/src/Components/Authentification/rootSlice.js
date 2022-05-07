import { createSlice } from '@reduxjs/toolkit'

// Slice
const rootSlice = createSlice({
  
  name: "root",

  initialState: {
    Step1: 1, // default page stage to show on page load
    Step2: "",
    Step3: ""
  },

  reducers: {
    Step1: (state, action) => { state.Step1 = action.payload },
    Step2: (state, action) => { state.Step2 = action.payload },
    Step3: (state, action) => { state.Step3 = action.payload }
  }

})

// Actions
export const { Step1, Step2, Step3 } = rootSlice.actions
export const reducer = rootSlice.reducer;