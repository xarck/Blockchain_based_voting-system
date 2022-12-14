import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AddCandidate from "./components/AddCandidate";
import Navbar from "./components/Navbar";
import Result from "./components/Result";

import { DataProvider } from "./context/data";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <Router>
            <DataProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/candidate" element={<AddCandidate />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </DataProvider>
        </Router>
    );
}

export default App;
