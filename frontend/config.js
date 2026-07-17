export const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function buyTokens() external payable",
  "function whitelisted(address) view returns (bool)",
  "function addToWhitelist(address) external",
  "function TOKEN_PRICE() view returns (uint256)"
];

export const TOKEN_PRICE_ETH = 0.01;
export const BACKEND_URL = "http://localhost:3001";