import { Container } from "@mui/material";
import Navbar from "./Navbar";
import Box from "@mui/material/Box"
import LeftSidebar from "./LeftSidebar";

const Layout = ({ children, mode, toggleTheme }) => {
    return (
        <>
            <Navbar mode={mode} toggleTheme={toggleTheme} />

            <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
                <Box 
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { 
                            xs: "1fr", 
                            md: "200px minmax(0, 1fr)",
                            lg: "240px minmax(0, 1fr)",
                        },
                        gap: { xs: 0, md: 2, lg: 3 },
                        alignItems: "start",
                    }}
                >
                    <Box sx={{ display: {xs: "none", md: "block"}}}>
                        <LeftSidebar />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                        {children}
                    </Box>
                    <Box sx={{ display: {xs: "none", lg: "block"}}}/>

                </Box>
            </Container>
        </>
    );
};

export default Layout;
