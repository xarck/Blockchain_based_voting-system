import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Election from "../Election.json";
import { ElectionAddress } from "../config.js";
import { useData } from "../context/data";

export default function Home() {
    const [numberofVoters, setNumberofVoters] = useState(0);
    const [numberofCandidates, setNumberofCandidate] = useState(0);
    const [candidateDetails, setCandidateDetails] = useState();
    const [winner, setWinner] = useState(0);
    const [candidateID, setCandidateID] = useState(0);
    const [voterName, setVoterName] = useState("");
    const [candidateVotingID, setCandidateVotingID] = useState(0);
    const [isConnected, setisConnected] = useState(false);
    const { setAccount } = useData();

    useEffect(() => {
        connectToMetaMask();
        getDetails();
    }, []);

    async function connectToMetaMask() {
        if (typeof window.ethereum !== "undefined") {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(account[0]);
            setisConnected(true);
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
                let data = await contract.getNumOfVoters();
                setNumberofVoters(data);

                data = await contract.getNumOfCandidates();
                setNumberofCandidate(data);

                data = await contract.winnerCandidate();
                setWinner(data);

                console.log(numberofCandidates);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    async function fetchCandidateDetails() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            provider
        );

        let data = await contract.getCandidate(candidateID);
        setCandidateDetails(data);
    }

    async function makeavote() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            signer
        );

        let data = await contract.vote(candidateVotingID, voterName);
        console.log(data);
        setCandidateDetails(data);
    }
    return (
        <div>
            <div>
                <button onClick={connectToMetaMask}>
                    {isConnected ? "Connected" : "Connect"}
                </button>
            </div>
            <div>
                <div>No. of Voters</div>
                <div>{numberofVoters}</div>
            </div>
            <div>
                <div>No. of Candidate</div>
                <div>{numberofCandidates}</div>
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
                <input
                    name="voter"
                    onChange={(e) => setVoterName(e.target.value)}
                />
                <input
                    type="Number"
                    name="candId"
                    onChange={(e) => setCandidateVotingID(e.target.value)}
                />
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
