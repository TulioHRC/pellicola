import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage';
import LibraryPage from './Components/LibraryPage';


function App() {
    //const [message, setMessage] = useState('');

    return (
        <div className="App">
            <h1>Hello World!</h1>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="/library" element={ <LibraryPage />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;