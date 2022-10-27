import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography } from "@mui/material"
import { useTheme } from "@mui/system";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import ArchiveIcon from '@mui/icons-material/Archive';
import HomeIcon from '@mui/icons-material/Home';

export const Navbar: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const theme = useTheme();
    const drawerWidth = 240;


    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        }));

    function logout() {
        localStorage.removeItem("user-id");

        window.location.href = '/login'
    };

    function goArchived() {
        window.location.href = '/archived';
    };

    function goHome() {
        window.location.href = '/home';

    };

    return (
        <Box>
            <AppBar>
                <Toolbar
                sx={{
                    backgroundColor: "#363636",
                    height: "130px",
                    display: "flex",
                    justifyContent: "start",
                  }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap component="div">
                        Minhas tarefas
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => goHome()}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Home' /> 
                    </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                    <ListItemButton onClick={() => goArchived()}>
                        <ListItemIcon>
                            <ArchiveIcon />
                        </ListItemIcon>
                        <ListItemText primary='Arquivados' /> 
                    </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                    <ListItemButton onClick={() => logout()}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Sair' /> 
                    </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </Box>
    )
}