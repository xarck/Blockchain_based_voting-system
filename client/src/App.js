import { ethers } from "ethers";
import Election from "./Election.json";
import React, { useState, useEffect } from "react";
import "./App.css";

const ElectionAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
    const [numberofVoters, setNumberofVoters] = useState();
    const [numberofCandidates, setNumberofCandidate] = useState();
    const [candidateDetails, setCandidateDetails] = useState();
    const [winner, setWinner] = useState();
    const [message, setMessage] = useState();
    const [candidateID, setCandidateID] = useState();

    useEffect(() => {
        getDetails();
    }, []);
    async function connectToMetaMask() {
        if (typeof window.ethereum !== "undefined") {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(account);
        }
    }
    async function getDetails() {
        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const contract = new ethers.Contract(
                    ElectionAddress,
                    Election.abi,
                    provider
                );
                var data = await contract.getNumOfVoters();
                setNumberofVoters(data);

                data = await contract.getNumOfCandidates();
                setNumberofCandidate(data);

                data = await contract.winnerCandidate();
                setWinner(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    async function addACandidate() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            signer
        );
        var data = await contract.addCandidate(
            "Ashish",
            "Trust",
            "https://img.com",
            "ashish@gmail.com"
        );
        console.log(data);
    }

    async function fetchCandidateDetails() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            provider
        );

        var data = await contract.getCandidate(candidateID);
        setCandidateDetails(data);
    }

    async function makeavote() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            provider
        );

        var data = await contract.getCandidate(candidateID, "ashdfs");
        setCandidateDetails(data);
    }
    return (
        <div className="App">
            <div>
                <h1>Block Chain Based Voting</h1>
                <button onClick={connectToMetaMask}>Connect</button>
                {message && ""}
            </div>
            <div>
                <div>No. of Voters</div>
                <div>{numberofVoters && ""}</div>
            </div>
            <div>
                <div>No. of Candidate</div>
                <div>{numberofCandidates && ""}</div>
            </div>
            <div>
                <div>Fetch Candiate Details</div>
                <input
                    placeholder="Enter Candidate ID"
                    onChange={(e) => setCandidateID(e.target.value)}
                />
                <button onClick={fetchCandidateDetails}> Fetch Details</button>
                {candidateDetails ? (
                    <div>{`${candidateDetails[0]} ${candidateDetails[1]} ${candidateDetails[2]} ${candidateDetails[3]} ${candidateDetails[4]}  `}</div>
                ) : (
                    <div></div>
                )}
            </div>
            <div>
                <button onClick={addACandidate}>Add a candidate</button>
            </div>
            <div>
                <button onClick={makeavote}>Vote</button>
            </div>
            <div>
                <div>Winner</div>
                <div>{winner}</div>
                {/* <div>{`${candidateDetails[0]} ${candidateDetails[1]} ${candidateDetails[2]} ${candidateDetails[3]} ${candidateDetails[4]}  `}</div> */}
            </div>
        </div>
    );
}

export default App;
