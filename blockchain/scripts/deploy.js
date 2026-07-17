const hre = require("hardhat");

async function main() {
  console.log("Deploying RWAToken...");
  const RWAToken = await hre.ethers.getContractFactory("RWAToken");
  const token = await RWAToken.deploy();
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log(`✅ RWAToken deployed to: ${address}`);

  const [deployer] = await hre.ethers.getSigners();
  const tx = await token.addToWhitelist(deployer.address);
  await tx.wait();
  console.log(`✅ Deployer ${deployer.address} added to whitelist`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});