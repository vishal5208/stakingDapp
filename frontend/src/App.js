import "./App.css";
import { useState } from "react";
import { WalletComponent, StakingDetailsComponent } from "./Components";
import { mintTokens, stake, unstake, claimRewards } from "./BackendConnectors";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [stakeAmount, setStakeAmount] = useState("");
	const [unstakedAmount, setUnstakedAmount] = useState("");

	// handle minting
	const handleMintButton = async () => {
		const obj = await mintTokens(inputValue);
		console.log(obj);
	};

	const handleMintInputChange = (event) => {
		setInputValue(event.target.value);
	};

	// handle staking

	const handleStakeButton = async () => {
		const obj = await stake(stakeAmount);
		console.log(obj);
	};

	const handleStakeAmountChange = (event) => {
		setStakeAmount(event.target.value);
	};

	// handle unstaking

	const handleUnstakeButton = async () => {
		const obj = await unstake(unstakedAmount);
		console.log(obj);
	};

	const handleUnstakeAmountChange = (event) => {
		setUnstakedAmount(event.target.value);
	};

	// handle claim

	const handleClaimButton = async () => {
		const obj = await claimRewards();
		console.log(obj);
	};

	return (
		<div className="App">
			<div className="title-and-connect">
				<h1 className="title">Staking Dapp</h1>
				<WalletComponent />
			</div>

			<div className="main-external">
				<div className="info-container">
					<h3>Info about dapp :</h3>
					<ul>
						<li>Only the owner can mint the tokens</li>
						<li>
							When you click on "Stake Tokens" it will first prompt you to
							approve the amount of tokens you want to stake. Once you approve
							the transaction, MetaMask will automatically open and ask you to
							confirm the stake transaction.
						</li>
					</ul>
				</div>

				<div className="main-buttons-inner">
					{/* tokeminting */}
					<div className="token-minting-div">
						<p>Token Minting </p>
						<div className="input-and-mint-button-div">
							<input
								className="input-text"
								type="text"
								value={inputValue}
								onChange={handleMintInputChange}
							/>
							<button onClick={handleMintButton}>Mint Tokens</button>
						</div>
					</div>

					{/* staking */}
					<div className="token-minting-div">
						<p>Stake </p>
						<div className="input-and-mint-button-div">
							<input
								className="input-text"
								type="text"
								value={stakeAmount}
								onChange={handleStakeAmountChange}
							/>
							<button onClick={handleStakeButton}>Stake Tokens</button>
						</div>
					</div>

					{/* unstaking */}

					<div className="token-minting-div">
						<p>Unstake </p>
						<div className="input-and-mint-button-div">
							<input
								className="input-text"
								type="text"
								value={unstakedAmount}
								onChange={handleUnstakeAmountChange}
							/>
							<button onClick={handleUnstakeButton}>Unstake Tokens</button>
						</div>
					</div>

					{/* Claim reward */}

					<div className="token-minting-div">
						<p>Claim Reward </p>
						<div className="input-and-mint-button-div">
							<button onClick={handleClaimButton}>Claim</button>
						</div>
					</div>
				</div>

				<StakingDetailsComponent />
			</div>
		</div>
	);
}

export default App;
