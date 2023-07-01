import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);

type AddContract = {
  id: any;
  contract: any;
  arbiter: any;
  beneficiary: any;
  value: any;
};
export default async function addContract({
  id,
  contract,
  arbiter,
  beneficiary,
  value,
}: AddContract) {
  const buttonId = `approve-${id}`;

  const container = document.getElementById('container') as HTMLElement;
  container.innerHTML += createHTML({buttonId, arbiter, beneficiary, value});

  contract.on('Approved', () => {
    (document.getElementById(buttonId) as HTMLElement).className = 'complete';
    (document.getElementById(buttonId) as HTMLElement).innerText =
      "✓ It's been approved!";
  });

  (document.getElementById(buttonId) as HTMLElement).addEventListener(
    'click',
    async () => {
      const signer = provider.getSigner();
      await contract.connect(signer).approve();
    }
  );
}

type CreateHTML = { buttonId: any } & Partial<AddContract>;

function createHTML({ buttonId, arbiter, beneficiary, value }: CreateHTML) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
