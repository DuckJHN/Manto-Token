const { ethers, JsonRpcProvider } = require("ethers");

const providerRPC = {
  manta: {
    name: "Manta",
    rpc: "https://manta-testnet.calderachain.xyz/http",
    chainId: 3441005,
  },
};
async function getTokenInformation(tokenAddress, accountAddress) {
  const provider = new JsonRpcProvider(providerRPC.manta.rpc);
  const abi = [
    "function balanceOf(address) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
  ];
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

  const balance = await tokenContract.balanceOf(accountAddress);
  console.log(`Balance of ${accountAddress}: ${balance.toString()} token`);

  const totalSupply = await tokenContract.totalSupply();
  console.log(`Total supply: ${totalSupply.toString()} token`);
}

const tokenAddress = "0x817E85662d9c344e0C3c50e9182a53a23f3E8320";
const accountAddress = "0xBBcA09216D5Acd45F98f3e15c0556B19Ea83f5da";

getTokenInformation(tokenAddress, accountAddress)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
