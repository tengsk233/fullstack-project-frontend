import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface UserDataState {
    id: number,
    email: string,
    name: string,
    token: string,
}

// Define the initial state using that type
const initialState: { user: UserDataState | null } = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUserData: (state, action: PayloadAction<UserDataState>) => {
            state.user = action.payload
        },
        clearUserData: (state) => {
            state.user = null
        }
    },
})

export const { setUserData, clearUserData } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer