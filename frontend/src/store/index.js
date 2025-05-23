import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './slices/auth.slice'

const AuthStore =  configureStore({
  reducer: {
    auth:AuthReducer
  }
})

export default AuthStore