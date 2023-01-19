import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import Election from "../Election.json";
import { ElectionAddress } from "../config.js";

import CandidateCard from "../common/CandidateCard";

export default function Home() {
    const [candidates, setCandidates] = useState();
    useEffect(() => {
        fetchCandidates();
    }, []);

    async function fetchCandidates() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            provider
        );
        let data = await contract.getCandidates();
        setCandidates(data);
    }
    return (
        <div id="home">
            {!candidates ? (
                <p>No Candidates are available</p>
            ) : (
                candidates.map((candidate) => {
                    return (
                        <CandidateCard
                            key={candidate.candidateID}
                            type="Candidate"
                            candidate={candidate}
                            dim="70px"
                        />
                    );
                })
            )}
        </div>
    );
}
