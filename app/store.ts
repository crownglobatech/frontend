// store.ts
import { configureStore } from '@reduxjs/toolkit'
// import your reducers (slices)
import counterReducer from './features/counter/counterSlice'
import authReducer from './features/auth/authSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer ,
    auth: authReducer
  }    
})

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
