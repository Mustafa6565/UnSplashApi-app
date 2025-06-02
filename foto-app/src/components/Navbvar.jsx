import { Box, AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import { StateContext } from "../Context/StateContext";
import { NavLink } from "react-router-dom";


const links = [
    { title: "Home", to: "/home" },
    { title: "photos", to: "/photos" },



]
export default function Navbar() {
    const { setSıdebarIsOpen, handleOpenSide } = useContext(StateContext)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ borderBottom: "15px solid black" }} color="primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="dark"

                        aria-label="open drawer"
                        sx={{ mr: 2 }}>

                        <MenuIcon onClick={handleOpenSide} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        color="secondary"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: "1" }}>

                        {links.map((link) => (
                            <Button color="secondary" key={link.to} component={NavLink} to={link.to}>{link.title}</Button>
                        ))}

                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    )
}