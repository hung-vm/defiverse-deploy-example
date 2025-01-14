require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("hardhat-tracer");
require("@openzeppelin/hardhat-upgrades");

const chains = require("./chains");

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: {
    // See https://hardhat.org/hardhat-runner/docs/advanced/multiple-solidity-versions
    compilers: [
      {
        version: "0.4.21",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.21",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          // viaIR: true,
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
    },

    "soneium-dev": chains.soneium.testnet,
    "soneium-prod": chains.soneium.mainnet,
  },
  etherscan: {
    apiKey: {
      "soneium-prod": "no key",
    },
    customChains: [
      {
        network: "soneium-prod",
        chainId: 1868,
        urls: {
          apiURL: "https://soneium.blockscout.com/api",
          browserURL: "https://soneium.blockscout.com",
        },
      },
    ],
  },
  gasReporter: {
    // https://www.npmjs.com/package/hardhat-gas-reporter
    enabled: `${process.env.REPORT_GAS}` == "true" ? true : false,
  },
};

module.exports = config;
