import React, { useState } from "react";

import { ethers } from "ethers";
import Election from "../Election.json";
import { ElectionAddress } from "../config.js";

import { Input, Button, Label } from "reactstrap";

export default function Home() {
    const [voterName, setVoterName] = useState("");
    const [candidateVotingID, setCandidateVotingID] = useState(0);

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
    }
    return (
        <div id="home">
            <Label>Voter Name</Label>
            <Input
                name="voter"
                onChange={(e) => setVoterName(e.target.value)}
            />
            <Label>Candidate ID</Label>
            <Input
                type="Number"
                name="candId"
                onChange={(e) => setCandidateVotingID(e.target.value)}
            />
            <Button onClick={makeavote}>Vote</Button>
        </div>
    );
}
