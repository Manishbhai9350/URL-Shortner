import { login, logout } from "../store/slices/auth.slice"
import { setUrlData } from "../store/slices/url.slice"
import AxiosInstance from "../utils/axios.util"
import {redirect} from '@tanstack/react-router'


export const GetUser = async () => {
    const User = await AxiosInstance.get('/auth/me')
    return User
}

const FetchUrls = async () => {
    const Urls = await AxiosInstance.get('/api/url/urls')
    return Urls
}


export const CheckAuthenticated = async ({context}) => {
    const {queryClient,AuthStore} = context 
    try {

        console.log('Authenticating')
        const User = await queryClient.ensureQueryData({
            queryKey:['current-user'],
            queryFn:GetUser
        })
        const Urls = await queryClient.ensureQueryData({
            queryKey:['user-urls'],
            queryFn:FetchUrls
        })
        if(User.data.success) {
            AuthStore.dispatch(setUrlData({userId:User.data.user.id,urls:Urls.data.Urls}))
            console.log("Authorized")
            AuthStore.dispatch(login(User.data.user))
        } else {
            AuthStore.dispatch(setUrlData({userId:null,urls:[]}))
            AuthStore.dispatch(logout())
        }

        return true
    } catch (error) {
        console.log("UnAuthorized")
        AuthStore.dispatch(setUrlData({userId:null,urls:[]}))
        AuthStore.dispatch(logout())
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
        const Urls = await queryClient.ensureQueryData({
            queryKey:['user-urls'],
            queryFn:FetchUrls
        })

        console.log(Urls)

        if(User.data.success){
            AuthStore.dispatch(setUrlData({userId:User.data.user.id,urls:Urls.data.Urls}))
            AuthStore.dispatch(login(User.data.user))
        } else {
            return redirect({to:'/auth'})
        } 
    } catch (error) {
        console.log(error)
        return redirect({to:'/auth'})
    }

}