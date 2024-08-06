import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { loginApi } from "../api/login.api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LoadingButton } from "@mui/lab";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { setUserData } = useAuth()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setError('')
            setIsLoading(true)
            const userData = await loginApi(email, password)
            setUserData(userData)
            setIsLoading(false)
            navigate('/')
        } catch (e: any) {
            console.log(e.response.data)
            setError(e?.response?.data)
            setIsLoading(false)
        }
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }


    return <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="80vh">
        <Typography variant="h3">Welcome</Typography>
        {error && <Typography variant="body1" sx={{color: 'red'}}>{error}</Typography>}
        <Box component="form" width={400}>
            <Box>
                <TextField value={email} onChange={handleEmailChange} label="email" margin="normal" fullWidth required type="email" />
            </Box>
            <Box>
                <TextField value={password} onChange={e => setPassword(e.target.value)} label="password" margin="normal" fullWidth required type="password" />
            </Box>
            <Box my={3}>
                <LoadingButton loading={isLoading} type="submit" variant="contained" fullWidth onClick={handleSubmit}>Login</LoadingButton>
            </Box>
        </Box>
    </Box>
}