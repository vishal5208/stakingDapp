const hre = require("hardhat");
const contracts = require("../../frontend/src/Constants/contracts.json");
const tokenAddress = contracts.Token[1];
const stakingAddress = contracts.Staking[1];

async function verifyContracts(contractInfo) {
	for (const info of contractInfo) {
		await hre.run("verify:verify", {
			address: info.address,
			constructorArguments: info.args || [],
		});
	}

	console.log(contracts.Token[1]);
}

const contractsToVerify = [
	{
		address: tokenAddress,
		args: ["99999999999999990000000"],
	},

	{
		address: stakingAddress,
		args: [contracts.Token[1]],
	},
];

verifyContracts(contractsToVerify);
