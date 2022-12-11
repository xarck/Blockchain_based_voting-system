import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <h1>Blockchain based voting system</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/candidate">Add A Candidate</Link>
                </li>
            </ul>
        </nav>
    );
}
