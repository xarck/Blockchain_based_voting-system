import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AddCandidate from "./components/AddCandidate";
import { DataProvider } from "./context/data";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <DataProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/candidate" element={<AddCandidate />} />
                </Routes>
            </DataProvider>
        </Router>
    );
}

export default App;
