async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await deployer.provider.getBalance(deployer.address);

  console.log("balance:", balance);

  const Manto = await ethers.getContractFactory("Manto");
  const token = await Manto.deploy(deployer.address);

  console.log("Contract deployed to:", token.target);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
