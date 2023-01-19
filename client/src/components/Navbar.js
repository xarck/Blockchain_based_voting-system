import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { useData } from "../context/data";

export default function NavBarComponent() {
    const [isConnected, setisConnected] = useState(false);
    const { setAccount } = useData();

    useEffect(() => {
        checkIsConnected();
    }, []);

    async function checkIsConnected() {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        if (accounts.length) {
            setisConnected(true);
        } else {
            setisConnected(false);
        }
    }
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
