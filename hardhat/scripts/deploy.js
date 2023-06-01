// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function main() {
  const Lock = await hre.ethers.getContractFactory("NFTLending");
  const lock = await Lock.deploy(
    "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
    "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873"
  );
  await lock.deployed();
  console.log(`Hehe your contract has been deployed : ${lock.address}`);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});