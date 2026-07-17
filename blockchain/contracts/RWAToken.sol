// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract RWAToken is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant TOKEN_PRICE = 0.01 ether;
    mapping(address => bool) public whitelisted;

    event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount);

    constructor() ERC20("MoHan RWA Token", "MHT") Ownable(msg.sender) {}

    function addToWhitelist(address account) external onlyOwner {
        whitelisted[account] = true;
    }

    function removeFromWhitelist(address account) external onlyOwner {
        whitelisted[account] = false;
    }

    function buyTokens() external payable nonReentrant {
        require(msg.value > 0, "ETH amount must be > 0");
        require(whitelisted[msg.sender], "Buyer not whitelisted");
        uint256 tokenAmount = (msg.value * 10**decimals()) / TOKEN_PRICE;
        require(tokenAmount > 0, "Token amount too small");
        _mint(msg.sender, tokenAmount);
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    function withdrawEth() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(owner()).transfer(balance);
    }

    function _update(address from, address to, uint256 value) internal virtual override {
        if (from != address(0) && to != address(0)) {
            require(whitelisted[to], "Receiver not whitelisted");
        }
        super._update(from, to, value);
    }
}