import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Election from "../Election.json";
import { ElectionAddress } from "../config.js";

export default function Home() {
    const [numberofVoters, setNumberofVoters] = useState();
    const [numberofCandidates, setNumberofCandidate] = useState();
    const [candidateDetails, setCandidateDetails] = useState();
    const [winner, setWinner] = useState();
    const [candidateID, setCandidateID] = useState();
    const [voterName, setVoterName] = useState();
    const [candidateVotingID, setCandidateVotingID] = useState();

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

        var data = await contract.getCandidate(candidateID);
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

        var data = await contract.vote(candidateVotingID, voterName);
        console.log(data);
        setCandidateDetails(data);
    }
    return (
        <div>
            <div>
                <h1>Block Chain Based Voting</h1>
                <button onClick={connectToMetaMask}>Connect</button>
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
