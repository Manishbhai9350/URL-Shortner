import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './slices/auth.slice'
import { UrlReducer } from './slices/url.slice'

const AuthStore =  configureStore({
  reducer: {
    auth:AuthReducer,
    urls:UrlReducer
  }
})

export default AuthStore