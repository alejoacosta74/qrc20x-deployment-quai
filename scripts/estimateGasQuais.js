const quais = require("quais");
const hre = require("hardhat");

async function main() {
  console.log(`using network ${hre.network.name}, endpoint ${hre.network.config.url}`);
  const ethersContract = await hre.ethers.getContractFactory("QRC20");
  const quaisProvider = new quais.providers.JsonRpcProvider(
    hre.network.config.url
  );

  const walletWithProvider = new quais.Wallet(
    hre.network.config.accounts[0],
    quaisProvider
  );
  await quaisProvider.ready;

  const QuaisContract = new quais.ContractFactory(
    ethersContract.interface.fragments,
    ethersContract.bytecode,
    walletWithProvider
  );
  try {
	console.log("Deploying contract from:", walletWithProvider.address);
    const address = await walletWithProvider.getAddress();
    console.log("Deploying contract from:", address);

    // get initial balance
	console.log("Getting balance...")
    const balance = await walletWithProvider.getBalance();
    console.log("Balance:", balance.toString());	

    const gas = await quaisProvider.estimateGas(
      QuaisContract.getDeployTransaction({ gasLimit: 4000000 }), 
    );
    console.log("Gas estimate:", gas.toString());



    // const quaisContract = await QuaisContract.deploy({ gasLimit: 4999999 });

    // await quaisContract.deployed();
    // console.log('Deployed at:', quaisContract.address);
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment error: ", error);
    process.exit(1);
  });