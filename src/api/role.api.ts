import { Role } from "../types"
import client from "./AxiosClient"

export const getRoles = async () => {
    const response = await client.get('/roles')
    return response.data as Role[]
}

export const getRole = async (roleId: string) => {
    const response = await client.get(`/roles/${roleId}`)
    return response.data as Role
}

export const createRole = async (roleData: Role) => {

    const response = await client.post('/roles', {
        ...roleData,
        permissions: roleData.permissions?.map(p => p.id) || []
    })
    return response.data as Role
}

export const updateRole = async (roleId: string, roleData: Role) => {
    const response = await client.put(`/roles/${roleId}`, {
        ...roleData,
        permissions: roleData.permissions?.map(p => p.id) || []
    })
    return response.data as Role
}