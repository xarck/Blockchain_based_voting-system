import React, { useState, useEffect } from "react";

import { Label } from "reactstrap";
import CandidateCard from "../common/CandidateCard";
import { ethers } from "ethers";
import Election from "../Election.json";
import { ElectionAddress } from "../config.js";

export default function Count() {
    const [numberofVoters, setNumberofVoters] = useState(0);
    const [numberofCandidates, setNumberofCandidate] = useState(0);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        getDetails();
        checkWinner();
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
        setWinner(data);
    }

    return (
        <div id="results">
            <Label>Total Voters : {numberofVoters}</Label>
            <br />
            <Label>Total Candidate : {numberofCandidates}</Label>
            <br />
            {winner ? (
                <CandidateCard type="Winner" candidate={winner} dim="70px" />
            ) : (
                ""
            )}
        </div>
    );
}
