import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createUser, getUser, updateUser } from "../../api/user.api"
import { Role, User } from "../../types"
import { LoadingButton } from "@mui/lab"
import { getRoles } from "../../api/role.api"

export default function UserDetail() {
    const [userData, setUserData] = useState<Partial<User>>({})
    const [roles, setRoles] = useState<Role[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const isAdd = params.id === 'add'

    const userId = params.id as string

    const fetchUserData = async () => {
        const data = await getUser(userId)
        setUserData(data)
    }

    const fetchData = async () => {
        const rolesData = await getRoles()
        setRoles(rolesData)
        if (!isAdd) {
            await fetchUserData()
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (field: string, value: string) => {
        setUserData({
            ...userData,
            [field]: value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (isAdd) {
            await createUser(userData as User)
        } else {
            await updateUser(userId, userData as User)
        }
        setIsSubmitting(false)
    }

    const handleSelectChange = (e: SelectChangeEvent<number>) => {
        setUserData({
            ...userData,
            roleId: Number(e.target.value)
        })
    }

    if(isLoading) {
        return <CircularProgress/>
    }

    return <Box>
        <Typography variant="h5">User</Typography>
        <Box component="form" width={500} my={3}>

            <Box my={3}>
                <TextField label="Name" margin="normal" fullWidth required value={userData.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
            </Box>
            <Box my={3}>
                <TextField label="Email" type="email" fullWidth required value={userData.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
            </Box>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role-select"
                        value={userData.roleId}
                        label="Role"
                        onChange={handleSelectChange}
                    >
                        {roles.map(role => {
                            return <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box my={3}>
                <LoadingButton loading={isSubmitting} variant="contained" onClick={handleSubmit}>{isAdd ? 'Create' : 'Update'}</LoadingButton>
            </Box>
        </Box>
    </Box>
}