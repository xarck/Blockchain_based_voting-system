// imports
const { ethers, run, network } = require("hardhat");
const fs = require("fs");
// async main
async function main() {
    // let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    // let wallet = new ethers.wallet(process.env.PRIVATE_KEY, provider);

    // const abi = fs.readFileSync("./");
    // const ElectionFactory = await ethers.getContractFactory("Election");
    // console.log("Deploying contract...");
    // const electionStorage = await ElectionFactory.deploy();
    // await electionStorage.deployed();

    // console.log(`Deployed contract to: ${electionStorage.address}`);
    // // what happens when we deploy to our hardhat network?
    // if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    //     console.log("Waiting for block confirmations...");
    //     await electionStorage.deployTransaction.wait(6);
    //     await verify(electionStorage.address, []);
    // }

    // const getNumOfCandidates = await electionStorage.getNumOfCandidates();
    // console.log(`Current Value is: ${getNumOfCandidates}`);
    const Election = await ethers.getContractFactory("Election");

    // Start deployment, returning a promise that resolves to a contract object
    const ELECION_CONTRACT = await Election.deploy();
    console.log("Contract deployed to address:", ELECION_CONTRACT.address);
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
};

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
