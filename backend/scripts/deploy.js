// imports
const { ethers, run, network } = require("hardhat");
// async main
async function main() {
    const Election = await ethers.getContractFactory("Election");
    const ELECION_CONTRACT = await Election.deploy();
    if (network.config.chainId === 5) {
        await ELECION_CONTRACT.deployTransaction.wait(1);
    } else {
        console.log("Deployed on Localhost");
    }
    console.log("Contract deployed to address:", ELECION_CONTRACT.address);
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
