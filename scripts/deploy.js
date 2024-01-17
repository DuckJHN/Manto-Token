async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("balance:", balance);

  const manToCoin = await ethers.getContractFactory("Manto");
  console.log("Deploy smart contract");

  const mantoContract = await manToCoin.deploy(deployer.address);
  await mantoContract.deployed();

  console.log("Deploy contract to: ", mantoContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
