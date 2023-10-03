import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';

export const Pages = () =>{
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}