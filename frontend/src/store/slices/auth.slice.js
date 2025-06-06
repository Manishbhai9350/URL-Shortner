import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user:null,
    isAuthenticated:false
}

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login(state,action){
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout(state){
            state.user = null
            state.isAuthenticated = false
            console.log(state)
        }
    }
})


const AuthReducer = AuthSlice.reducer
const {login,logout} = AuthSlice.actions

export {
    AuthReducer,
    login,
    logout
}