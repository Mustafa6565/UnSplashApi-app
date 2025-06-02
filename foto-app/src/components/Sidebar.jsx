import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { useState } from 'react'
import { StateContext } from '../Context/StateContext'
export default function SideBar() {
    const { sidebarIsOpen } = useContext(StateContext)




    return (
        <AppBar position="absolute" sx={{ width: sidebarIsOpen, left: 0, top: 79, height: "95vh", transition: "width 0.5s ease-in-out", }} color="priamry">
            <Toolbar>

            </Toolbar>
        </AppBar>
    )
}