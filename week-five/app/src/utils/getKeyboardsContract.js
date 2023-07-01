import { ethers } from 'ethers';

import ABI from '../artifacts/contracts/Keyboards.sol/Keyboards.json';

const CONTRACT_ADDRESS = '0x297d3fbff8d755cd12b322028498af36bf3a7490';

export function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
  } else {
    return undefined;
  }
}
