import client from "../api/AxiosClient"
import * as UserSlice from "../slices/userSlice"
import { useAppDispatch, useAppSelector } from "./useRedux"

const useAuth = () => {
    const user = useAppSelector(UserSlice.selectUser)
    const dispatch = useAppDispatch()

    const setUserData = (user: UserSlice.UserDataState) => {
        dispatch(UserSlice.setUserData(user))
        client.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        localStorage.removeItem('user')
        dispatch(UserSlice.clearUserData())
    }

    return {
        user,
        setUserData,
        logout
    }
    
}

export default useAuth