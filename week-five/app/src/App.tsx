import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Escrow from './Escrow';
import deploy from './deploy';
import { provider } from './utils/provider';

export async function approve(escrowContract: ethers.Contract, signer: any) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState<any>([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();

  useEffect(() => {
    getAccounts();
  }, [account]);

  async function getAccounts() {
    const accounts = await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    setAccount(accounts[0]);
    setSigner(signer);
  }

  async function newContract() {
    const beneficiary = document.getElementById(
      'beneficiary'
    ) as HTMLInputElement;

    const arbiter = document.getElementById('arbiter') as HTMLInputElement;
    const wei = document.getElementById('wei') as HTMLInputElement;
    const value = ethers.BigNumber.from(wei.value);

    console.log('value:', value);
    const escrowContract = await deploy({
      signer,
      arbiter: arbiter.value,
      beneficiary: beneficiary.value,
      value,
    });

    const escrow = {
      address: escrowContract.address,
      arbiter: arbiter.value,
      beneficiary: beneficiary.value,
      value: value.toString(),

      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          (
            document.getElementById(escrowContract.address) as HTMLElement
          ).className = 'complete';
          (
            document.getElementById(escrowContract.address) as HTMLElement
          ).innerText = "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    setEscrows([...escrows, escrow]);
  }

  function deployContract(e: any) {
    e.preventDefault();

    newContract();
  }
  
  return (
    <>
      <div className='contract'>
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type='text' id='arbiter' />
        </label>

        <label>
          Beneficiary Address
          <input type='text' id='beneficiary' />
        </label>

        <label>
          Deposit Amount (in Wei)
          <input type='text' id='wei' />
        </label>

        <div className='button' id='deploy' onClick={(e) => deployContract(e)}>
          Deploy
        </div>
      </div>

      <div className='existing-contracts'>
        <h1> Existing Contracts </h1>

        <div id='container'>
          {escrows.map((escrow: any) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
