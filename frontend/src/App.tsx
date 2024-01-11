import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import MainPage from './Components/MainPage';
import LibraryPage from './Components/LibraryPage';

function App() {
    const handleRedirectHomePage = () => {
        window.location.href = "/";
    }

    const NavBar = () => {
        return (
            <AppBar position="fixed" sx={{ backgroundColor: 'gray', top:"5px" }}>
                <Toolbar>
                    <img src="./logo.png" alt="Logo" style={{ marginRight: '10px', width: '30px', height: '30px' }} onClick={handleRedirectHomePage}/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleRedirectHomePage}>
                    pellicola
                    </Typography>
                    <Button id="mainPageButton" color="inherit"  component={Link} to="/">Main Page</Button>
                    <Button id="libraryPageButton" color="inherit" component={Link} to="/library">Library</Button>
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <div className="App">
            <Router>
                <NavBar />    
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/library" element={<LibraryPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;