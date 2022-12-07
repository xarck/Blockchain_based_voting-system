export const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                internalType: "string",
                name: "imgHash",
                type: "string",
            },
            {
                internalType: "string",
                name: "email",
                type: "string",
            },
        ],
        name: "addCandidate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        name: "candidates",
        outputs: [
            {
                internalType: "string",
                name: "candidate_name",
                type: "string",
            },
            {
                internalType: "string",
                name: "candidate_description",
                type: "string",
            },
            {
                internalType: "string",
                name: "imgHash",
                type: "string",
            },
            {
                internalType: "uint8",
                name: "voteCount",
                type: "uint8",
            },
            {
                internalType: "string",
                name: "email",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "candidateID",
                type: "uint8",
            },
        ],
        name: "getCandidate",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getNumOfCandidates",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getNumOfVoters",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "candidateID",
                type: "uint8",
            },
            {
                internalType: "string",
                name: "e",
                type: "string",
            },
        ],
        name: "vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "winnerCandidate",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
