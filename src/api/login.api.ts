import client from "./AxiosClient"

interface LoginResponse {
    id: number,
    email: string,
    name: string,
    token: string,
}

export const loginApi = async (email: string, password: string) => {
    const response = await client.post('/auth/login', {
        email: email,
        password: password
    })
    console.log('response.data', response.data)
    return response.data as LoginResponse
}

export const updatePassword = async (password: string) => {
    const response = await client.post('/auth/update-password', { password: password })
    return response.data
}