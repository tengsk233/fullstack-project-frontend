import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

const SIDENAV_LINKS =[
    {label: 'Dashboard', link: '/'},
    {label: 'Users', link: '/users'},
    {label: 'Roles', link: '/roles'},
    {label: 'Products', link: '/products'},
]

export default function SideNav() {
    return (<Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
    >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {SIDENAV_LINKS.map((link) => (
                    <Link key={link.label} to={link.link} style={{textDecoration: 'none'}}>
                        <ListItem  disablePadding>
                            <ListItemButton>
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                ))}
            </List>
        </Box>
    </Drawer>)
}