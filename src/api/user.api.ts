import { User } from "../types"
import client from "./AxiosClient"

export const getUsers = async () => {
    const response = await client.get('/users')
    return response.data as User[]
}

export const getUser = async (id: string) => {
    const response = await client.get(`/users/${id}`)
    return response.data as User
}

export const createUser = async (userData: User) => {
    const response = await client.post('/users', userData)
    return response.data as User
}

export const updateUser = async (userId: string, userData: User) => {
    const response = await client.put(`/users/${userId}`, userData)
    return response.data as User
}