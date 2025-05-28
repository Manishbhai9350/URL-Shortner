import { login } from "../store/slices/auth.slice"
import AxiosInstance from "../utils/axios.util"
import {redirect} from '@tanstack/react-router'


export const GetUser = async () => {
    const User = await AxiosInstance.get('/auth/me')
    return User
}


export const CheckAuthenticated = async ({context}) => {
    try {
        const {queryClient,AuthStore} = context 

        const User = await queryClient.ensureQueryData({
        queryKey:['current-user'],
        queryFn:GetUser
    })

    if(User.data.success) {
        AuthStore.dispatch(login(User.data.user))
    }

    return true
    } catch (error) {
        return false
    }
}



export const IsAuthenticated = async ({context}) => {
    try {
        const {queryClient,AuthStore} = context 

    const User = await queryClient.ensureQueryData({
        queryKey:['current-user'],
        queryFn:GetUser
    })

    if(User.data.success){
        AuthStore.dispatch(login(User.data.user))
    } else {
        return redirect({to:'/auth'})
    } 
    } catch (error) {
        console.log(error)
        return redirect({to:'/auth'})
    }

}