import { ethers } from "./ethers-5.6.esm.min.js";
console.log(ethers);

const connectButton = document.getElementById("connectButton");

connectButton.onclick = connect;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.log(error);
        }
        connectButton.innerHTML = "Connected";
        const accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
    } else {
        connectButton.innerHTML = "Please install MetaMask";
    }
}
