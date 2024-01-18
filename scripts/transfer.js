const {
  Contract,
  Wallet,
  JsonRpcProvider,
  ContractTransactionResponse,
} = require("ethers");
const { formatEther, parseUnits } = require("ethers");
const { providerRPC } = require("../utils/RpcNetwork");

require("dotenv").config({ path: "../.env" });

async function TransferTransaction(tokenAddress, privateKey, addressTo) {
  const provider = new JsonRpcProvider(providerRPC.manta.rpc);
  const abi = [
    // Readonly
    "function balanceOf(address) view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ];

  const signer = new Wallet(privateKey, provider);
  const contract = new Contract(tokenAddress, abi, signer);

  const balance = await contract.balanceOf(signer.address);
  console.log("Before balance: ", formatEther(balance));

  const tx = await contract.transfer(addressTo, parseUnits("20", 18));
  await tx.wait();

  console.log("Transaction hash: ", tx.hash);
  const balanceAfter = await contract.balanceOf(signer.address);
  console.log("After balance: ", formatEther(balanceAfter));
}
const privateKey = process.env.PRIVATE_KEY;

const tokenAddress = "0x817E85662d9c344e0C3c50e9182a53a23f3E8320";
const addressTo = "0xd85c9f508045B816a7dd26c5928eAC125D44682D";
TransferTransaction(tokenAddress, privateKey, addressTo)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
