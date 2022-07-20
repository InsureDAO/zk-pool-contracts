import { Contract, Provider, utils, Wallet, Web3Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as dotenv from "dotenv";
dotenv.config();

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Greeter contract`);

  // Initialize the wallet.
  const provider = new Provider(hre.config.zkSyncDeploy.zkSyncNetwork);
  const wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`).connect(provider);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);

  ////const artifact = await deployer.loadArtifact("Greeter");
  const USDC = await deployer.loadArtifact("ERC20Mock");
  const Ownership = await deployer.loadArtifact("Ownership");
  const PoolTemplate = await deployer.loadArtifact("PoolTemplate");
  const IndexTemplate = await deployer.loadArtifact("IndexTemplate");
  const CDSTemplate = await deployer.loadArtifact("CDSTemplate");
  const Factory = await deployer.loadArtifact("Factory");
  const Vault = await deployer.loadArtifact("Vault");
  const Registry = await deployer.loadArtifact("Registry");
  const FlatPremiumV2 = await deployer.loadArtifact("FlatPremiumV2");
  const ParametersV2 = await deployer.loadArtifact("ParametersV2");

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const GOV_TOKENS = ["0x1000000000000000000000000000000000000000", "0x2000000000000000000000000000000000000000"];
  const ALLOCATION_POINT = "1000000";
  const DAY = 86400;
  const GovFeeRatio = 100000; //10%
  const GracePeriod = DAY * 14;
  const LockUpPeriod = DAY * 14;
  const MaxDate = DAY * 30;
  const MinDate = DAY * 7;
  const WithdrawablePeriod = DAY * 30;
  const defaultRate = 50000; //5%

  console.log("wallet.address:", wallet.address.toString());

  //How to connect deployed contract
  //const USDCAddress = "0x961BB488fd3E57f70aDFbDA21d36C1fd9F0B3356";
  //const abi = require("../artifacts-zk/contracts/mocks/ERC20Mock.sol/ERC20Mock.json").abi;
  //new Contract(USDCAddress, abi, wallet);

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  /** 
  const depositAmount = ethers.utils.parseEther("0.05");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();
  */

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  ////const greeting = "Hi there!";
  ////const greeterContract = await deployer.deploy(artifact, [greeting]);

  /**
  console.log("Deploying USDC...");
  const usdc = await deployer.deploy(USDC, [wallet.address]);
  await usdc.deployed();
  console.log("USDC deployed to:", usdc.address);

  console.log("Deploying Ownership...");
  const ownership = await deployer.deploy(Ownership, []);
  await ownership.deployed();
  console.log("Ownership deployed to:", ownership.address);

  console.log("Deploying Registry...");
  const registry = await deployer.deploy(Registry, [ownership.address]);
  await registry.deployed();
  console.log("Registry deployed to:", registry.address);

  console.log("Deploying Factory...");
  const factory = await deployer.deploy(Factory, [registry.address, ownership.address]);
  await factory.deployed();
  console.log("Factory deployed to:", factory.address);

  console.log("Deploying FlatPremiumV2...");
  const premiumV2 = await deployer.deploy(FlatPremiumV2, [ownership.address, defaultRate]);
  await premiumV2.deployed();
  console.log("FlatPremiumV2 deployed to:", premiumV2.address);

  console.log("Deploying ParametersV2...");
  const parametersV2 = await deployer.deploy(ParametersV2, [ownership.address]);
  await parametersV2.deployed();
  console.log("ParametersV2 deployed to:", parametersV2.address);

  console.log("Deploying Vault...");
  const vault = await deployer.deploy(Vault, [usdc.address, registry.address, ZERO_ADDRESS, ownership.address]);
  await vault.deployed();
  console.log("Vault deployed to:", vault.address);

  console.log("Deploying PoolTemplate...");
  const poolTemplate = await deployer.deploy(PoolTemplate, []);
  await poolTemplate.deployed();
  console.log("poolTemplate deployed to:", poolTemplate.address);

  console.log("Deploying IndexTemplate...");
  const indexTemplate = await deployer.deploy(IndexTemplate, []);
  await indexTemplate.deployed();
  console.log("indexTemplate deployed to:", indexTemplate.address);

  console.log("Deploying CDSTemplate...");
  const cdsTemplate = await deployer.deploy(CDSTemplate, []);
  await cdsTemplate.deployed();
  console.log("cdsTemplate deployed to:", cdsTemplate.address);
   */

  const USDCAddress = "0xc9D8Cc4fF5b3434d8FBcf466045dA7AB6b656a4C";
  const OwnershipAddress = "0x9e6642b1fed535439f3aDC25d1696fDa3f980541";
  const PoolTemplateAddress = "0x5983a16E355bFbDC722d3287E0CCC8934473b475";
  const IndexTemplateAddress = "0x4F1f39b7E9f07a8580BCB7a5901942Fa5aA21504";
  const CDSTemplateAddress = "0x74cadBD58Ad5c254AB555d7F6E99b1705C4C5764";
  const FactoryAddress = "0x4906D284b542431a71A3dDE8689bd5F485aa301f";
  const VaultAddress = "0xd173759e6B3C3899Abd51aD104F311Eff25C0499";
  const RegistryAddress = "0xA044cAD2b803252981d27c048670BaBdE12DcC78";
  const FlatPremiumV2Address = "0xFd7b7a4064a487cc93f6A7BfDB6E8A9C37cB71cB";
  const ParametersV2Address = "0x56D8B9E51b6b693C9089e792De35A867C4Dde05f";

  /**
  //Attache contracts
  //let tx;
  const usdc = new Contract(USDCAddress, USDC.abi, wallet);
  const ownership = new Contract(OwnershipAddress, Ownership.abi, wallet);
  const poolTemplate = new Contract(PoolTemplateAddress, PoolTemplate.abi, wallet);
  const indexTemplate = new Contract(IndexTemplateAddress, IndexTemplate.abi, wallet);
  const cdsTemplate = new Contract(CDSTemplateAddress, CDSTemplate.abi, wallet);
  const vault = new Contract(VaultAddress, Vault.abi, wallet);
  const factory = new Contract(FactoryAddress, Factory.abi, wallet);

  const registry = new Contract(RegistryAddress, Registry.abi, wallet);
  const premiumV2 = new Contract(FlatPremiumV2Address, FlatPremiumV2.abi, wallet);

  const parametersV2 = new Contract(ParametersV2Address, ParametersV2.abi, wallet);

  //----- SETUP -----//
  let tx = await registry.setFactory(factory.address);
  await tx.wait();

  tx = await factory.approveTemplate(poolTemplate.address, true, false, false); //creation not public
  await tx.wait();
  tx = await factory.approveTemplate(indexTemplate.address, true, false, false); //creation not public
  await tx.wait();
  tx = await factory.approveTemplate(cdsTemplate.address, true, false, false); //creation not public
  await tx.wait();

  //pool setup
  console.log("Pool setup");
  tx = await factory.approveReference(poolTemplate.address, 0, ZERO_ADDRESS, true);
  await tx.wait();
  tx = await factory.approveReference(poolTemplate.address, 1, usdc.address, true);
  await tx.wait();
  tx = await factory.approveReference(poolTemplate.address, 2, registry.address, true);
  await tx.wait();
  tx = await factory.approveReference(poolTemplate.address, 3, parametersV2.address, true);
  await tx.wait();

  //index setup
  console.log("index setup");
  tx = await factory.approveReference(indexTemplate.address, 0, usdc.address, true);
  await tx.wait();
  tx = await factory.approveReference(indexTemplate.address, 1, registry.address, true);
  await tx.wait();
  tx = await factory.approveReference(indexTemplate.address, 2, parametersV2.address, true);
  await tx.wait();

  //cds setup
  console.log("cds setup");
  tx = await factory.approveReference(cdsTemplate.address, 0, usdc.address, true);
  await tx.wait();
  tx = await factory.approveReference(cdsTemplate.address, 1, registry.address, true);
  await tx.wait();
  tx = await factory.approveReference(cdsTemplate.address, 2, parametersV2.address, true);
  await tx.wait();

  //set parametersV2
  console.log("parameterV2 setup");
  tx = await parametersV2.setFeeRate(ZERO_ADDRESS, GovFeeRatio);
  await tx.wait();

  tx = await parametersV2.setGrace(ZERO_ADDRESS, GracePeriod);
  await tx.wait();

  tx = await parametersV2.setLockup(ZERO_ADDRESS, LockUpPeriod);
  await tx.wait();

  tx = await parametersV2.setMaxDate(ZERO_ADDRESS, MaxDate);
  await tx.wait();

  tx = await parametersV2.setMinDate(ZERO_ADDRESS, MinDate);
  await tx.wait();

  tx = await parametersV2.setWithdrawable(ZERO_ADDRESS, WithdrawablePeriod);
  await tx.wait();

  tx = await parametersV2.setVault(usdc.address, vault.address);
  await tx.wait();

  tx = await parametersV2.setPremiumModel(ZERO_ADDRESS, premiumV2.address);
  await tx.wait();

  /**
  //Addresses
  
  //sanity check
   */

  //PoolTemplate
  /**
  for (const addr of GOV_TOKENS) {
    console.log("creating pool for: ", addr);
    tx = await factory.createMarket(
      poolTemplate.address,
      "0x",
      [0, 0], //initial deposit 0
      [addr, usdc.address, registry.address, parametersV2.address]
    );
    await tx.wait();
  }
  let markets = await registry.getAllMarkets();

  let market1 = new Contract(markets[0], PoolTemplate.abi, wallet);
  let market2 = new Contract(markets[1], PoolTemplate.abi, wallet);
  console.log("market1 deployed to: ", market1.address);
  console.log("market2 deployed to: ", market2.address);
   */

  /**
  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  // Call the deployed contract.
  const greetingFromContract = await greeterContract.greet();
  if (greetingFromContract == greeting) {
    console.log(`Contract greets us with ${greeting}!`);
  } else {
    console.error(`Contract said something unexpected: ${greetingFromContract}`);
  }

  // Edit the greeting of the contract
  const newGreeting = "Hey guys";
  const setNewGreetingHandle = await greeterContract.setGreeting(newGreeting);
  await setNewGreetingHandle.wait();

  const newGreetingFromContract = await greeterContract.greet();
  if (newGreetingFromContract == newGreeting) {
    console.log(`Contract greets us with ${newGreeting}!`);
  } else {
    console.error(`Contract said something unexpected: ${newGreetingFromContract}`);
  }

  */
}
