// @ts-nocheck
import { Alchemy, Network } from 'alchemy-sdk';

 const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(config);
