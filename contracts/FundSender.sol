pragma solidity ^0.4.26;

contract FundSender {
  function send(address[] memory receivers) public payable {
    for (uint i = 0; i < receivers.length; i++) {
      receivers[i].transfer(1);
    }
  }

  function send8(address r0, address r1, address r2, address r3, address r4, address r5, address r6, address r7) public payable {
    r0.transfer(1);
    r1.transfer(1);
    r2.transfer(1);
    r3.transfer(1);
    r4.transfer(1);
    r5.transfer(1);
    r6.transfer(1);
    r7.transfer(1);
  }

  function () public payable {
  }
}
