const path = require("path");
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
      TestToken: {
        initArgs: ["TEST", "TEST"],
      },
    },
  });

  // Grant roles
  await contractDeployer.grantRoles();
}

async function main() {
  await deployAll();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
