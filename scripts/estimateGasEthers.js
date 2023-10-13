const hre = require("hardhat");
const quais = require("quais");

async function main() {
  console.log(`Using network ${hre.network.name}, endpoint ${hre.network.config.url}`);

  // Create a Contract Factory for QRC20
  const ContractFactory = await hre.ethers.getContractFactory("QRC20");

  const quaisProvider = new quais.providers.JsonRpcProvider(
	hre.network.config.url
      );

  // Define the signer (wallet) using the first account provided by Hardhat's network configuration
//   const signer = new hre.ethers.Wallet(hre.network.config.accounts[0], hre.ethers.provider);
  const signer = new hre.ethers.Wallet(hre.network.config.accounts[0], quaisProvider);
  
  // Log deployment info
  console.log("Deploying contract from:", signer.address);

  // Get and log the signer's balance
//   const balance = await signer.getBalance();
//   console.log("Balance:", balance.toString());

  // Construct the deployment transaction
  const deployTransaction = ContractFactory.getDeployTransaction(/* constructor args, if any */);

  // Estimate gas for the deployment transaction
  const estimatedGas = await signer.estimateGas(deployTransaction);
  console.log("Gas estimate:", estimatedGas.toString());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment error:", error);
    process.exit(1);
  });
