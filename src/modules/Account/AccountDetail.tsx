import { Box, TextField, Typography } from "@mui/material"
import useAuth from "../../hooks/useAuth"
import { FormEvent, useState } from "react"
import { LoadingButton } from "@mui/lab"
import { updatePassword } from "../../api/login.api"

export default function AccountDetail() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { user, logout } = useAuth()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            setError("Password doesn't match")
        } else {
            setIsLoading(true)
            setError('')
            await updatePassword(password)
            setIsLoading(false)
            logout()

        }
    }

    return <Box>
        <Typography variant="h5">Account</Typography>
        <Box my={3}>
            <Typography variant="body1">User Name: {user?.name}</Typography>
            <Typography variant="body1">User Email: {user?.email}</Typography>
        </Box>

        <Typography variant="h5">Update Password</Typography>
        {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
        <Box width={500} component="form">
            <Box my={3}>
                <TextField label="New Password" margin="normal" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Box my={3}>
                <TextField label="Confirm Password" margin="normal" type="password" fullWidth required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Box>
            <Box>
                <LoadingButton loading={isLoading} variant="contained" fullWidth onClick={handleSubmit}>Update</LoadingButton>
            </Box>
        </Box>
    </Box>
}