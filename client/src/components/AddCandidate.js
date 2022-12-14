import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Election from "../Election.json";
import { ElectionAddress } from "../config";
import { useData } from "../context/data";

import { Button, Input, Label } from "reactstrap";

export default function AddCandidate() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const { account } = useData();

    useEffect(() => {
        console.log(account);
    }, []);

    async function addACandidate() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            ElectionAddress,
            Election.abi,
            signer
        );
        try {
            var data = await contract.addCandidate(
                name,
                description,
                image,
                email
            );
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div id="addCandidate">
            <h1>Add a Candidate</h1>
            <div>
                <Label> Name </Label>
                <Input
                    name="name"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <Label>Description</Label>
                <Input
                    type="textarea"
                    name="description"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <Label>Image</Label>
                <Input
                    name="img"
                    placeholder="Image"
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <div>
                <Label>Email</Label>
                <Input
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <br />
            <Button onClick={addACandidate}>Add</Button>
        </div>
    );
}
