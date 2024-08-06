export interface User {
    id?: number;
    name: string;
    email: string;
    roleId: number
}

export interface Permission {
    id: number;
    name: string
}

export interface Role {
    id?: number;
    name: string;
    permissions?: Permission[]
}