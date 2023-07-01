// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;
    
    bool public isApproved;

    event Approved(uint _balanceSent);

// contract accept deposit along deployment
    constructor(address _arbiter, address _beneficiary) payable {
        depositor = msg.sender;
        beneficiary = _beneficiary;
        arbiter = _arbiter;
    }

    function approve() external {
        require(msg.sender == arbiter, "Not authorised!");

        uint balance = address(this).balance;
        (bool s,) = beneficiary.call{value:balance}("");
        require(s, "Failed to send Ether");

        emit Approved(balance);
        isApproved = true;
    }
}