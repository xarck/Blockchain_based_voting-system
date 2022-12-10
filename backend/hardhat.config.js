/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "goerli",
    networks: {
        hardhat: {},
        goerli: {
            chainId: 5,
            blockConfirmations: 1,
            url: API_URL,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
};
