import React, { useState, useEffect } from "react";
import { getStakingDetails } from "../../BackendConnectors/stakingContractConnector";
import "./StakingDetails.css";
export const StakingDetailsComponent = () => {
	const [stakeAmount, setStakeAmount] = useState("");
	const [stakeTimestamp, setStakeTimestamp] = useState("");
	const [rewardBalance, setRewardBalance] = useState("");
	const [tokenBalance, setTokenBalance] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStakingDetails = async () => {
			const result = await getStakingDetails();

			if (result.success) {
				setStakeAmount(result.stakeAmount);
				setStakeTimestamp(result.stakeTimestamp);
				setRewardBalance(result.rewardBalance);
				setTokenBalance(result.tokenBalance);
			}

			setIsLoading(false);
		};

		// Fetch staking details initially
		fetchStakingDetails();

		// Fetch staking details every 10 seconds
		const interval = setInterval(fetchStakingDetails, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const formattedTimestamp = new Date(stakeTimestamp * 1000).toLocaleString();

	return (
		<div className="staking-details-container">
			{isLoading ? (
				<p>Loading staking details...</p>
			) : (
				<>
					<p className="staking-detail">Stake Amount: {stakeAmount}</p>
					<p className="staking-detail">
						Stake Timestamp: {formattedTimestamp}
					</p>
					<p className="staking-detail">Reward Balance: {rewardBalance}</p>
					<p className="staking-detail">Token Balance: {tokenBalance}</p>
				</>
			)}
		</div>
	);
};
