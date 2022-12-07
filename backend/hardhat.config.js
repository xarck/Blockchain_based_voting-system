/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {},
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
};
