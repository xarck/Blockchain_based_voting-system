import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import AddCandidate from "./components/AddCandidate";

import "./App.css";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/candidate">Add A Candidate</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/candidate" element={<AddCandidate />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
