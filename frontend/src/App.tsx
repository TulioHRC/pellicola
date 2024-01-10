import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import MainPage from './Components/MainPage';
import LibraryPage from './Components/LibraryPage';


function App() {
    const handleRedirect = () => {
        window.location.href = "/";
    }

    return (
        <div className="App">
            <Router>
                <AppBar position="static" sx={{ backgroundColor: 'gray' }}>
                    <Toolbar>
                        <img src="./logo.png" alt="Logo" style={{ marginRight: '10px', width: '30px', height: '30px' }} onClick={handleRedirect}/>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleRedirect}>
                        pellicola
                        </Typography>
                        <Button color="inherit" component={Link} to="/">Main Page</Button>
                        <Button color="inherit" component={Link} to="/library">Library</Button>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/library" element={<LibraryPage />} />
                </Routes>
            </Router>
            </div>
    );
}

export default App;