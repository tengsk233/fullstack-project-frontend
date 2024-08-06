import { Box, Toolbar } from '@mui/material'
import NavBar from './Navbar'
import SideNav from './SideNav'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useRedux'
import { selectUser } from '../slices/userSlice'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
export default function Layout() {

    const userData = useAppSelector(selectUser)
    const navigate = useNavigate()
    const { setUserData } = useAuth()

    useEffect(() => {
        const userStr = localStorage.getItem('user')

        if (userStr) {
            if (!userData) {
                const parsedUserData = JSON.parse(userStr)
                setUserData(parsedUserData)
            }
        } else {
            if (!userData) {
                navigate('/login')
            }
        }

    }, [userData])

    return (
        <Box position="relative">
            <Box position="absolute" zIndex={1} width={"100%"}>
                <NavBar />
            </Box>
            <Box position="absolute" zIndex={0} display="flex">
                <SideNav />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Box>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}