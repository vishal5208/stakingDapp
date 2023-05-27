// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking {
    using SafeMath for uint256;
    address admin;

    ERC20 public token;

    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake) public stakes;
    mapping(address => uint256) public rewards;

    event Staked(address indexed staker, uint256 amount);
    event Unstaked(address indexed staker, uint256 amount);
    event RewardClaimed(address indexed staker, uint256 amount);

    constructor(address _tokenAddress) {
        token = ERC20(_tokenAddress);
        admin = msg.sender;
    }

    // modifier
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function mintTokens(uint256 _amount) external onlyAdmin {
        require(_amount > 0, "Amount must be greater than zero");

        // Mint new tokens
        token.mintFromContract(address(this), _amount);
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient balance");

        if (stakes[msg.sender].amount > 0) {
            // Calculate pending rewards
            uint256 pendingRewards = calculatePendingRewards(msg.sender);
            rewards[msg.sender] = rewards[msg.sender].add(pendingRewards);
        }

        // Transfer tokens to the contract
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );

        stakes[msg.sender] = Stake(
            stakes[msg.sender].amount.add(_amount),
            block.timestamp
        );

        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount) external {
        require(
            stakes[msg.sender].amount >= _amount,
            "Insufficient staked amount"
        );

        // Calculate pending rewards
        uint256 pendingRewards = calculatePendingRewards(msg.sender);
        rewards[msg.sender] = rewards[msg.sender].add(pendingRewards);

        // Reduce the staked amount
        stakes[msg.sender].amount = stakes[msg.sender].amount.sub(_amount);

        // Transfer tokens back to the staker
        require(token.transfer(msg.sender, _amount), "Token transfer failed");

        emit Unstaked(msg.sender, _amount);
    }

    function claimRewards() external {
        uint256 pendingRewards = calculatePendingRewards(msg.sender);
        require(pendingRewards > 0, "No rewards to claim");

        // Add rewards to the staker's balance
        rewards[msg.sender] = rewards[msg.sender].add(pendingRewards);

        // Transfer rewards to the staker
        require(
            token.transfer(msg.sender, pendingRewards),
            "Token transfer failed"
        );

        emit RewardClaimed(msg.sender, pendingRewards);
    }

    function calculatePendingRewards(
        address _staker
    ) public view returns (uint256) {
        uint256 stakedAmount = stakes[_staker].amount;
        uint256 stakingTimestamp = stakes[_staker].timestamp;

        // Calculate the duration for which the staker has held the tokens
        uint256 duration = block.timestamp.sub(stakingTimestamp);

        // Calculate the rewards based on the staked amount and duration
        uint256 pendingRewards = stakedAmount.mul(duration).div(3600); // Assuming 1 hour rieward perod

        return pendingRewards;
    }

    // getters functions
    function getStakeAmount(address _staker) external view returns (uint256) {
        return stakes[_staker].amount;
    }

    function getStakeTimestamp(
        address _staker
    ) external view returns (uint256) {
        return stakes[_staker].timestamp;
    }

    function getRewardBalance(address _staker) external view returns (uint256) {
        return rewards[_staker];
    }

    function getTokenBalance(address _address) external view returns (uint256) {
        return token.balanceOf(_address);
    }
}
