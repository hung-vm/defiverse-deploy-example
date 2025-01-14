const path = require("path");
const ethers = require("ethers");
const hre = require("hardhat");
const { ContractDeployerWithHardhat } = require("@evmchain/contract-deployer");

async function deployAll() {
  const networkName = hre.network.name;

  console.log(`Deploy ${networkName} ...`);

  const deployConfig = {
    dataFilename: path.resolve("networks", `${networkName}.json`),
    deployData: require(path.resolve("networks", `${networkName}.json`)),
    proxyAdminName: "DProxyAdmin",
    proxyName: "DProxy",
  };

  const contractDeployer = new ContractDeployerWithHardhat();
  contractDeployer.setConfig(deployConfig);

  // Init
  await contractDeployer.init();

  // Deploy contract
  await contractDeployer.deployAllManifests({
    args: {
      DProxyAdmin: {},
      DogToken: {
        initArgs: ["soneium dog", "soneium dog"],
      },
    },
  });

  // Grant roles
  await contractDeployer.grantRoles();
  await mint(contractDeployer);
}

const mint = async (contractDeployer) => {
  console.log("===mint");
  const dogToken = await contractDeployer.loadContract("DogToken");
  const rs = await dogToken.mint(
    "0x0d01d06C41B325CeaA64eA87F4909A5C64aC7182",
    "1000000000000000000000000000"
  );
  console.log("rs:", rs);
};

async function main() {
  await deployAll();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
