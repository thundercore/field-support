pragma solidity >=0.4.25;

contract NewOpcode {
  constructor() payable public {
    assembly { // solium-disable-line security/no-inline-assembly
      sstore(0, shr(0x01, sload(0x87)))
    }
  }
}
