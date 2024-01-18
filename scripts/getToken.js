const { JsonRpcProvider, Contract, formatUnits } = require("ethers");
const { parseUnits, formatEther } = require("ethers");
const { providerRPC } = require("../utils/RpcNetwork");

async function getTokenInformation(tokenAddress, accountAddress) {
  const provider = new JsonRpcProvider(providerRPC.manta.rpc);
  const abi = [
    //Read-Only Functions
    "function balanceOf(address) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    //Authencated Functions
    "function transfer(address to, uint amount) view returns (bool)",
    //Events
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ];
  const tokenContract = new Contract(tokenAddress, abi, provider);

  const symbol = await tokenContract.symbol();
  console.log(`Symbol token: ${symbol}`);

  const decimals = await tokenContract.decimals();
  console.log(`Decimals: ${decimals}`);

  const balance = await tokenContract.balanceOf(accountAddress);
  console.log(
    `Balance of ${accountAddress}: ${formatUnits(
      balance,
      decimals
    ).toString()} token`
  );

  const totalSupply = await tokenContract.totalSupply();
  console.log(`Total supply: ${formatEther(totalSupply).toString()} token`);
}

const tokenAddress = "0x817E85662d9c344e0C3c50e9182a53a23f3E8320";
const accountAddress = "0xBBcA09216D5Acd45F98f3e15c0556B19Ea83f5da";

getTokenInformation(tokenAddress, accountAddress)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
