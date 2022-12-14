import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { useData } from "../context/data";

export default function Navbar() {
    const [isConnected, setisConnected] = useState(false);
    const { setAccount } = useData();

    async function connectToMetaMask() {
        if (typeof window.ethereum !== "undefined") {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(account[0]);
            setisConnected(true);
        }
    }
    return (
        <nav>
            <div>
                <h3>Vote</h3>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/candidate">Add A Candidate</Link>
                    </li>
                    <li>
                        <Link to="/result">Results</Link>
                    </li>
                    <li>
                        <Button onClick={connectToMetaMask}>
                            {isConnected ? "Connected" : "Connect"}
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
