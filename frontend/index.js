import { ethers } from "./ethers-5.6.esm.min.js";

import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");

connectButton.onclick = connect;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const a = await ethereum.request({ method: "eth_requestAccounts" });
            connectButton.innerHTML = "Connected";
        } catch (error) {
            console.log(error);
        }
    } else {
        connectButton.innerHTML = "Please install MetaMask";
    }
    getCandidates();
}

async function getCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("adsf");
    const signer = provider.getSigner();
    console.log("sdf");
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);

    var transactionResponse = await contract.getNumOfVoters();
    console.log(transactionResponse);
}
