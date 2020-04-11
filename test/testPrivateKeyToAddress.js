const assert = require('assert');
const Key = require('../src/key');
console.log('Key:', Key)

describe('key', () => {
  it('privateKeyToAddress works', async() => {
    const sk = '0x685b81d9448f4440bb6e0604ecdddb9334c02afa8588be38caf81a49de58035a'
    const addr = Key.toAddress(sk);
    assert(addr.toLowerCase() === '0x6f0d809e0fa6650460324f26df239bde6c004ecf');
  });
  it('generateKey works', async() => {
    const { address, privateKey } = Key.generate();
    assert(address.toLowerCase() === Key.toAddress(privateKey).toLowerCase());
  });
});
