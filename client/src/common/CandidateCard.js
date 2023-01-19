import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
} from "reactstrap";
import { ethers } from "ethers";
import Election from "../Election.json";
import { ElectionAddress } from "../config.js";

export default function CandidateCard({ candidate, type, dim }) {
    async function makeavote(id) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                ElectionAddress,
                Election.abi,
                signer
            );

            let data = await contract.vote(id);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Card className="my-2" key={candidate.candidateID}>
            <CardHeader>{type}</CardHeader>
            <CardBody>
                <img
                    src={candidate.imgHash}
                    className="rounded-circle shadow-4"
                    style={{ width: dim, height: dim }}
                    alt="Avatar"
                />
                <CardTitle tag="h5">{candidate.candidate_name}</CardTitle>
                <CardText>{candidate.candidate_description}</CardText>
                <Button onClick={() => makeavote(candidate.candidateID)}>
                    Vote {candidate.voteCount}
                </Button>
            </CardBody>
        </Card>
    );
}
