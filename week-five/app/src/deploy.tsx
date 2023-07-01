import { ethers } from 'ethers';
import Escrow from './artifacts/week-five/Escrow.sol/Escrow.json';

type Deploy = {
  signer: any;
  arbiter: any;
  beneficiary: any;
  value: any;
};

export default async function deploy({
  signer,
  arbiter,
  beneficiary,
  value,
}: Deploy) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  
  return factory.deploy(arbiter, beneficiary, { value });
}
