import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
} from "reactstrap";
import { useData } from "../context/data";

export default function NavBarComponent() {
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
        // <nav>
        //     <div>
        //         <h3>Vote</h3>
        //     </div>
        //     <div>
        //         <ul>
        //             <li>
        //                 <Link to="/">Home</Link>
        //             </li>
        //             <li>
        //                 <Link to="/candidate">Add A Candidate</Link>
        //             </li>
        //             <li>
        //                 <Link to="/result">Results</Link>
        //             </li>
        //             <li>
        //                 <Button onClick={connectToMetaMask}>
        //                     {isConnected ? "Connected" : "Connect"}
        //                 </Button>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Vote</NavbarBrand>

            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/candidate">Add a Candidate</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/result">Result</NavLink>
                </NavItem>
                <NavItem>
                    <Button onClick={connectToMetaMask}>
                        {isConnected ? "Connected" : "Connect"}{" "}
                    </Button>
                </NavItem>
            </Nav>
        </Navbar>
    );
}
