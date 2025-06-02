import { Button, Container, createTheme, ThemeProvider } from '@mui/material'
import { red, cyan, blue } from '@mui/material/colors';
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbvar';
import SideBar from '../../components/Sidebar';
export default function Main() {


    const theme = createTheme({
        palette: {
            primary: {
                light: '#222',
                main: '#ffff',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#16488F',
                dark: '#ba000d',
                contrastText: '#000',
            },
            success: {
                light: '#fffff',
                main: '#ffff',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });
    const darkTheme = createTheme({
        palette: {
            primary: {
                light: '#222',
                main: '#140005',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#000000',
                dark: '#ba000d',
                contrastText: '#000',
            },
            success: {
                light: '#fffff',
                main: '#ffff',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <SideBar />
            <Container className='container' sx={{ mt: 3, height: "90vh", overflowX: "scroll", paddingTop: 1 }}>

                <Outlet />

            </Container>

        </ThemeProvider>
    )
}