module.exports = {
  soneium: {
    testnet: {
      chainId: 1946,
      url: "https://rpc.minato.soneium.org/",
      accounts: [process.env.DEV_PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1868,
      url: "https://rpc.soneium.org/",
      accounts: [process.env.PROD_PRIVATE_KEY],
    },
  },
};
