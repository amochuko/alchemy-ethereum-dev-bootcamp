type EscrowT = {
  address: any;
  arbiter: any;
  beneficiary: any;
  value: any;
  handleApprove: any;
};

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
}: EscrowT) {
  return (
    <div className='existing-contract'>
      <ul className='fields'>
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} </div>
        </li>
        <div
          className='button'
          id={address}
          onClick={(e) => {
            e.preventDefault();

            handleApprove();
          }}
        >
          Approve
        </div>
      </ul>
    </div>
  );
}
