import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Election from "../Election.json";
import { ElectionAddress } from "../config";
import { useData } from "../context/data";

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
        <div>
            <h1>AddCandidate</h1>
            <input
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                name="description"
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
                name="img"
                placeholder="Image"
                onChange={(e) => setImage(e.target.value)}
            />
            <input
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={addACandidate}>Add</button>
        </div>
    );
}
