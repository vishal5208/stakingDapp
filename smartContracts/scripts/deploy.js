const hre = require("hardhat");
const fs = require("fs");

let staking, token;

async function main() {
	// usdcToken
	const Token = await ethers.getContractFactory("Token");
	token = await Token.deploy("99999999999999990000000");
	await token.deployed();

	// staking contract
	const Staking = await ethers.getContractFactory("Staking");
	staking = await Staking.deploy(token.address);
	await staking.deployed();

	console.log("Staking is deployed at : ", staking.address);

	console.log("Token is deployed at : ", token.address);

	// Get contract ABIs
	const tokenAbi = Token.interface.format("json");
	const stakingAbi = Staking.interface.format("json");

	// Write contract addresses and ABIs to file
	const contracts = {
		Token: [tokenAbi, token.address],
		Staking: [stakingAbi, staking.address],
	};
	fs.writeFileSync(
		"../frontend/src/Constants/contracts.json",
		JSON.stringify(contracts, null, 2)
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
