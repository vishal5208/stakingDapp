import { requestAccount } from "./commonConnectors";
const contracts = require("../Constants/contracts.json");
const { ethers } = require("ethers");

const stakingContractAddr = contracts.Staking[1];

const mintTokens = async (amount) => {
	console.log(amount);
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			console.log(signer);
			const stakingContract = new ethers.Contract(
				contracts.Staking[1],
				contracts.Staking[0],
				signer
			);

			const tx = await stakingContract.mintTokens(amount);

			await tx.wait(1);

			alert(`Transfered ${amount} succesfully to Staking contract!!!`);
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const stake = async (amount) => {
	console.log(amount);
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			console.log(signer);
			const stakingContract = new ethers.Contract(
				contracts.Staking[1],
				contracts.Staking[0],
				signer
			);

			const tokenContract = new ethers.Contract(
				contracts.Token[1],
				contracts.Token[0],
				signer
			);

			// approve first
			const approTx = await tokenContract.approve(stakingContractAddr, amount);
			await approTx.wait();

			alert(`Approved ${amount} to the staking contract succesfully!!!`);

			const tx = await stakingContract.stake(amount);
			await tx.wait();

			alert(`Staked ${amount} succesfully!!!`);
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const unstake = async (amount) => {
	console.log(amount);
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			console.log(signer);
			const stakingContract = new ethers.Contract(
				contracts.Staking[1],
				contracts.Staking[0],
				signer
			);

			const tx = await stakingContract.unstake(amount);
			await tx.wait();

			alert(`unstaked ${amount} succesfully!!!`);
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const claimRewards = async (amount) => {
	console.log(amount);
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			console.log(signer);
			const stakingContract = new ethers.Contract(
				contracts.Staking[1],
				contracts.Staking[0],
				signer
			);

			const tx = await stakingContract.claimRewards();
			await tx.wait();

			alert(`Reward claimed succesfully!!!`);
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

const getStakingDetails = async () => {
	try {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const stakingContract = new ethers.Contract(
				contracts.Staking[1],
				contracts.Staking[0],
				signer
			);

			const address = await signer.getAddress();
			const stakeAmount = await stakingContract.getStakeAmount(address);
			const stakeTimestamp = await stakingContract.getStakeTimestamp(address);
			const rewardBalance = await stakingContract.getRewardBalance(address);
			const tokenBalance = await stakingContract.getTokenBalance(address);

			return {
				success: true,
				stakeAmount: stakeAmount.toString(),
				stakeTimestamp: stakeTimestamp.toString(),
				rewardBalance: rewardBalance.toString(),
				tokenBalance: tokenBalance.toString(),
			};
		} else {
			return {
				success: false,
				msg: "Please connect your wallet!",
			};
		}
	} catch (error) {
		return {
			success: false,
			msg: error.message,
		};
	}
};

export { stake, mintTokens, unstake, getStakingDetails, claimRewards };
