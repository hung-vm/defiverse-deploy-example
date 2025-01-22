require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("hardhat-tracer");
require("@openzeppelin/hardhat-upgrades");

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
    "defiverse-testnet": {
      chainId: 17117,
      url: "https://rpc-testnet.defi-verse.org/",
      accounts: [process.env.DEPLOY_PRIVATE_KEY_TESTNET],
      gasPrice: 50000000000,
    },
    "defiverse-mainnet": {
      chainId: 16116,
      url: "https://rpc.defi-verse.org/",
      accounts: [process.env.DEPLOY_PRIVATE_KEY_MAINNET],
      gasPrice: 10000000000000,
    },
  },
  etherscan: {
    apiKey: {
      "defiverse-testnet": "no key",
      "defiverse-mainnet": "no key",
    },
    customChains: [
      {
        network: "defiverse-testnet",
        chainId: 17117,
        urls: {
          apiURL: "https://scan-testnet.defi-verse.org/api",
          browserURL: "https://scan-testnet.defi-verse.org",
        },
      },
      {
        network: "defiverse-mainnet",
        chainId: 16116,
        urls: {
          apiURL: "https://scan.defi-verse.org/api",
          browserURL: "https://scan.defi-verse.org",
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
