// In-Reply-to Ivan, https://youtu.be/BAX2j609mZk?t=708
// Solidity 0.5.8+ now works on ThunderCore if you go to
// http://remix-alpha.ethereum.org
// Click "Solidity" -> Click the "Solidity compiler" button on the left
// and set the `EVM Version` field to "byzantium".
//
// We're in the process of updating ThunderCore to support
// the new EVM opcodes and pre-compiles added in 'Petersburg' but
// we know you'd like to use the newer compilers today
// thus ThunderCore developers contributed the patch for
// setting `EVM Version` to Remix-IDE
// https://github.com/ethereum/remix-ide/pull/1998

pragma solidity ^0.5;

contract SimpleStorage {
  uint storedData;

  event Closed(uint);

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function close() external {
    emit Closed(now); // solium-disable-line security/no-block-members
    selfdestruct(address(0));
  }
}
