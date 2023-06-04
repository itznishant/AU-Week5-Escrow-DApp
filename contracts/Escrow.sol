// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
	address public arbiter;
	address public beneficiary;
	address public depositor;

	bool public isApproved;

	modifier onlyArbiter() {
    	require(msg.sender == arbiter, "Address not arbiter");
        _;
    }
	
	event Approved(uint);

	constructor(address _arbiter, address _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	function approve() external onlyArbiter {
		uint balance = address(this).balance;
		(bool success, ) = payable(beneficiary).call{value: balance}("");
 		require(success, "Failed to send Ether");
		emit Approved(balance);
		
		isApproved = true;
	}
}
