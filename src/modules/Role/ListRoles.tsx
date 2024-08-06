import { useState, useEffect } from "react"
import { Role } from "../../types"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../../api/role.api";

export default function ListRoles() {
    const [isLoading, setIsLoading] = useState(true)
    const [roles, setRoles] = useState<Role[]>([])

    const navigate = useNavigate()

    const fetchData = async () => {
        setIsLoading(true)
        const rolesData = await getRoles()
        setRoles(rolesData)
        setIsLoading(false)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
    ];

    useEffect(() => {
        fetchData()
    }, [])

    if(isLoading) {
        return <CircularProgress/>
    }

    return <div>
        <Box display="flex" justifyContent="space-between" my={3}>
            <Typography variant="h4">Roles</Typography>
            <Button variant="contained" onClick={() => navigate('/roles/add')}>Add Role</Button>
        </Box>
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={roles}
                columns={columns}
                disableRowSelectionOnClick
                onRowClick={data => navigate(`/roles/${data.id}`)}
            />
        </Box>
    </div>
}