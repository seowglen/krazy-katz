require("dotenv").config({ path: "../.env" });

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('NFTCollection');
  const nftContract = await nftContractFactory.deploy(
    "Krazy Katz",
    "KRZY",
    process.env.IPFS_BASE_URI,
  );
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  let txn = await nftContract.mint(1)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #1")
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();