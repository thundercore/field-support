pragma solidity ^0.4.25;

contract VerifySignature {
  address owner = msg.sender;

  mapping(uint256 => bool) usedNonces;

  // The trick to debugging `ecrecover` problems is to log its input:
  event MessageLog(bytes sig, bytes32 ecRecoverInput);
  event RecoverLog(uint8 v, bytes32 r, bytes32 s, address recovered);

  function signatureIsValid(string data, uint256 nonce, bytes sig) public returns (bool) {
    require(!usedNonces[nonce], 'nonce for signed data is reused');
    // In a real implementation, guard against replay attacks by:
    // usedNonces[nonce] = true;

    // This recreates the message that was signed on the client.
    bytes32 message = prefixed(keccak256(abi.encodePacked(data, nonce, this)));
    emit MessageLog(sig, message);
    return (recoverSigner(message, sig) == owner);
  }

  function splitSignature(bytes sig) internal pure returns (uint8, bytes32, bytes32) {
    require(sig.length == 65, 'invalid signature length');
    bytes32 r;
    bytes32 s;
    uint8 v;

    assembly { // solium-disable-line
      // first 32 bytes, after the length prefix
      r := mload(add(sig, 32))
      // second 32 bytes
      s := mload(add(sig, 64))
      // final byte (first byte of the next 32 bytes)
      v := add(byte(0, mload(add(sig, 96))), 27)
    }
    return (v, r, s);
  }

  function recoverSigner(bytes32 message, bytes sig) internal returns (address) {
    uint8 v;
    bytes32 r;
    bytes32 s;

    (v, r, s) = splitSignature(sig);
    address recovered = ecrecover(message, v, r, s);
    emit RecoverLog(v, r, s, recovered);
    return recovered;
  }

  // Builds a prefixed hash to mimic the behavior of eth_sign.
  function prefixed(bytes32 hash) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked('\x19Ethereum Signed Message:\n32', hash));
  }
}
