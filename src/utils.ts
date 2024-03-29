import { utils } from "ethers";
const Buffer = require("buffer/").Buffer;

export function hexBufferToString(hexBuffer: string) {
  return "0x" + Buffer.from(hexBuffer.substring(2), "hex").toString();
}

export function stringToHexBuffer(hexString: string) {
  return "\\x" + Buffer.from(hexString.substring(2), "utf8").toString("hex");
}

export function getAuctionId(address: string, name: string): string {
  return `${address}__${name}`;
}

export function parseAuctionId(auctionId: string) {
  const address = auctionId.substring(0, 42);
  const name = auctionId.substring(44);
  return { name, address };
}

export function displayEth(amount: string) {
  return "Ξ" + utils.formatEther(amount);
}

export function createEtherscanUrl(
  id: string,
  chainId: 1 | 5,
  type: "address" | "tx"
) {
  if (chainId === 1) {
    return `https://etherscan.io/${type}/${id}`;
  }
  return `https://goerli.etherscan.io/${type}/${id}`;
}
