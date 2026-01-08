import { User } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { logger } from '@/lib/logger'



interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  userId: number | null
  pendingEmailVerify: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  userId: null,
  pendingEmailVerify: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Start loading
    setLoading(state) {
      state.loading = true
      state.error = null
    },
    // Set user and token on successful login/register
    setAuthSuccess(
      state,
      action: PayloadAction<{ user: User; token: string, role: string }>
    ) {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      // client side use
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('role', action.payload.role)
      // middleware use
      Cookies.set('token', action.payload.token, { expires: 7, sameSite: 'strict' })
      Cookies.set('role', action.payload.role, { expires: 7, sameSite: 'strict' })
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    setUserId(state, action: PayloadAction<{ userId: number | null }>) {
      state.loading = false
      state.userId = action.payload.userId
      state.isAuthenticated = false
      state.pendingEmailVerify = true
    },
    setPendingEmailVerify(state, action: PayloadAction<{ verify: boolean }>) {
      state.pendingEmailVerify = action.payload.verify
    },
    // Set error on failure
    setAuthError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    // Logout
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      Cookies.remove('token')
      Cookies.remove('role')
    },
    // Load user from storage
    loadUserFromStorage(state) {
  const token = localStorage.getItem('token')
  const userJson = localStorage.getItem('user')

  if (token && userJson) {
    try {
      state.token = token
      state.user = JSON.parse(userJson)
      state.isAuthenticated = true
    } catch (e) {
      logger.error('Failed to parse user from storage')
    }
  }
}
  }
})

export const {
  setLoading,
  setAuthSuccess,
  setAuthError,
  setPendingEmailVerify,
  setUserId,
  logout,
  loadUserFromStorage
} = authSlice.actions
export default authSlice.reducer
