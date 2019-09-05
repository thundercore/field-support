// Contract verification of `eth_sign` style signatures via `ecrecover`.
// 
// Inspired by https://programtheblockchain.com/posts/2018/02/17/signing-and-verifying-messages-in-ethereum/
// and updated to the web3-1.2 API.
//
// References:
// https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsign
//    Note the "add 27 to `v`" part.
// https://ethereum.stackexchange.com/questions/19582/does-ecrecover-in-solidity-expects-the-x19ethereum-signed-message-n-prefix

const { BN } = require('openzeppelin-test-helpers');
const { expect } = require('chai');
const VerifySignature = artifacts.require('VerifySignature');

function prefixed(s) {
  // This example always use `web3.eth.sign` on `keccak` output so the message
  // length is fixed at 32 bytes
  const p = '\x19Ethereum Signed Message:\n32';
  return web3.utils.soliditySha3(p, s);
}

function ethSignHash(address, ...args) {
  const ethSignInput = web3.utils.soliditySha3.apply(this, args);
  const ecRecoverInput = prefixed(ethSignInput);
  return [web3.eth.sign(ethSignInput, address), ecRecoverInput];
}

contract('VerifySignature', function(accounts) {
  const account = accounts[0];
  it('recover signer address from signature', async function() {
      const data = 'DATA-I-WANT-TO-SIGN';
      const nonce = 0;

      const instance = await VerifySignature.deployed();
      const [sigPromise, ecRecoverInput] = ethSignHash(account,
        {type: 'string', value: data},
        {type: 'uint256', value: nonce},
        {type: 'address', value: instance.address});
      const sig = await sigPromise;
      console.log(`signature: ${sig}`)
      const sigB = sig.slice(2)
      const r = `0x${sigB.slice(0, 64)}`
      const s = `0x${sigB.slice(64, 128)}`
      const v = web3.utils.toDecimal(sigB.slice(128, 130)) + 27
      const result = await instance.signatureIsValid(data, nonce, sig);
      console.log('result:', result);
      const messageLog = result.logs[0];
      const recoveryLog = result.logs[1];
      expect(messageLog.args.sig).equal(sig);
      expect(messageLog.args.ecRecoverInput).equal(ecRecoverInput);
      expect(recoveryLog.args.v).to.be.bignumber.equal(new BN(v));
      expect(recoveryLog.args.r).equal(r);
      expect(recoveryLog.args.s).equal(s);
      expect(recoveryLog.args.recovered).equal(account);
  });
});
