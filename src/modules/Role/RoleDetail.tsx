import { Box, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Typography } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Permission, Role } from "../../types"
import { LoadingButton } from "@mui/lab"
import { createRole, getRole, updateRole } from "../../api/role.api"
import { getPermissions } from "../../api/permission.api"

export default function RoleDetail() {
    const [roleData, setRoleData] = useState<Partial<Role>>({})
    const [permissions, setPermission] = useState<Permission[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const isAdd = params.id === 'add'

    const roleId = params.id as string

    const fetchRoleData = async () => {
        const data = await getRole(roleId)
        setRoleData(data)
    }

    const fetchData = async () => {
        const permissionsData = await getPermissions()
        setPermission(permissionsData)
        if (!isAdd) {
            await fetchRoleData()
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (field: string, value: string) => {
        setRoleData({
            ...roleData,
            [field]: value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (isAdd) {
            await createRole(roleData as Role)
        } else {
            await updateRole(roleId, roleData as Role)
        }
        setIsSubmitting(false)
    }

    const handleCheckboxToggle = (permission: Permission) => {
        const hasPermission = roleData.permissions?.find((p) => p.id === permission.id)
        if(hasPermission) {
            setRoleData({
                ...roleData, // spread operator
                permissions: roleData.permissions?.filter(p => p.id !== permission.id)
            })
        } else {
            setRoleData({
                ...roleData, // spread operate
                permissions: [...(roleData.permissions || []), permission] // spread operate
            })
        }
        
    }

    if (isLoading) {
        return <CircularProgress />
    }

    return <Box>
        <Typography variant="h5">Role</Typography>
        <Box component="form" width={500} my={3}>

            <Box my={3}>
                <TextField label="Name" margin="normal" fullWidth required value={roleData.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
            </Box>
            <Box>
                <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend">Permissions</FormLabel>
                    <FormGroup>
                        {permissions.map(permission => {

                            const targetPermission = roleData.permissions?.find((dp) => dp.id === permission.id)

                            return <FormControlLabel
                                control={
                                    <Checkbox checked={Boolean(targetPermission)}
                                        onChange={() => handleCheckboxToggle(permission)}
                                        name="permission" />
                                }
                                key={permission.id}
                                label={permission.name}
                            />
                        })}
                    </FormGroup>
                </FormControl>

            </Box>
            <Box my={3}>
                <LoadingButton loading={isSubmitting} variant="contained" onClick={handleSubmit}>{isAdd ? 'Create' : 'Update'}</LoadingButton>
            </Box>
        </Box>
    </Box>
}