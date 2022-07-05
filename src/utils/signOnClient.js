import { web3 } from 'contracts';

export async function signOnClient({ userAddress, nftContractAddress }, callback) {
  const msgParams = JSON.stringify({
    domain: {
      chainId: await web3.eth.getChainId(),
      name: 'NFTMinter',
      version: '1',
    },
    message: {
      nft: nftContractAddress,
      minter: userAddress,
      to: userAddress,
    },
    primaryType: 'Mint',
    types: {
      Mint: [
        { name: 'nft', type: 'address' },
        { name: 'minter', type: 'address' },
        { name: 'to', type: 'address' },
      ],
    },
  });

  web3.currentProvider.sendAsync(
    {
      method: 'eth_signTypedData_v4',
      params: [userAddress, msgParams],
      from: userAddress,
    },
    callback,
  );
}
