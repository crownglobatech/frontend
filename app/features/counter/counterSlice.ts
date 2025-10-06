// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 1. Define the state type
interface CounterState {
  value: number
}

// 2. Initial state
const initialState: CounterState = {
  value: 0,
}

// 3. Create slice
const counterSlice = createSlice({
  name: 'counter', // slice name
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// 4. Export actions + reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
