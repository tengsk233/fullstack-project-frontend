import { Permission } from "../types"
import client from "./AxiosClient"

export const getPermissions = async () => {
    const response = await client.get('/permissions')
    return response.data as Permission[]
}