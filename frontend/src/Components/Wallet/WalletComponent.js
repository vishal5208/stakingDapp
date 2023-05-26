import { useState } from "react";
import { useConnectWallet } from "./useConnectWallet";
import "./WalletComponent.css";

export function WalletComponent() {
	const { account, requestAccount, connectStatus } = useConnectWallet();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleConnectWallet = async () => {
		setIsLoading(true);
		setErrorMsg("");

		const result = await requestAccount();

		setIsLoading(false);

		if (!result.success) {
			setErrorMsg(result.msg);
		}
	};

	return (
		<div className="wallet-component-wrapper">
			{connectStatus === "disconnected" && (
				<div className="connect-wallet-wrapper">
					<span>Connect&nbsp;Wallet</span>
					{isLoading && <span className="loading">Loading...</span>}
					{errorMsg && <span>Error: {errorMsg}</span>}
					{!isLoading && !errorMsg && (
						<button onClick={handleConnectWallet}>Connect</button>
					)}
				</div>
			)}

			{connectStatus === "connecting" && (
				<div className="connecting-wallet-wrapper">
					<span>Connecting...</span>
				</div>
			)}

			{connectStatus === "connected" && (
				<div className="connected-wallet-wrapper-connected">
					<div>
						{account.slice(0, 5)}...{account.slice(-4)}
					</div>
					<div>Connected</div>
				</div>
			)}
		</div>
	);
}
