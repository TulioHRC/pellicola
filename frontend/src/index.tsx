import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'

//require('dotenv').config(); // API key

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
