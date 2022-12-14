import React, { useState, useEffect } from "react";

import { Button, Label, Input } from "reactstrap";

import { ethers } from "ethers";
import Election from "../Election.json";
import { ElectionAddress } from "../config.js";

import ShowCandidateDetails from "./ShowCandidateDetails";

export default function Count() {
    const [numberofVoters, setNumberofVoters] = useState(0);
    const [numberofCandidates, setNumberofCandidate] = useState(0);
    const [winner, setWinner] = useState(null);
    const [candidateDetails, setCandidateDetails] = useState();
    const [candidateID, setCandidateID] = useState(0);

    useEffect(() => {
        getDetails();
    }, []);

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
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }
    async function checkWinner() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            provider
        );
        let data = await contract.winnerCandidate();
        data = await contract.getCandidate(data);
        setWinner(data);
    }

    async function fetchCandidateDetails() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            provider
        );

        let data = await contract.getCandidate(candidateID);
        console.log(data);
        setCandidateDetails(data);
    }

    return (
        <div id="results">
            <Label>Total Voters : {numberofVoters}</Label>
            <br />
            <Label>Total Candidate : {numberofCandidates}</Label>
            <br />
            <Label>Candidate ID</Label>
            <Input
                placeholder="Enter Candidate ID"
                onChange={(e) => setCandidateID(e.target.value)}
            />
            <br />
            <Button onClick={fetchCandidateDetails}> Fetch Details</Button>
            {candidateDetails ? (
                ShowCandidateDetails(candidateDetails)
            ) : (
                <div></div>
            )}
            <br />
            <Button onClick={checkWinner}>Show Winner</Button>
            <br />
            {winner ? ShowCandidateDetails(winner) : ""}
        </div>
    );
}
