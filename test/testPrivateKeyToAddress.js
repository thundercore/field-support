const assert = require('assert');
const privateKeyToAddress = require('../src/privateKeyToAddress');

describe('privateKeyToAddress', () => {
  it('privateKeyToAddress works', async() => {
    const sk = '0x685b81d9448f4440bb6e0604ecdddb9334c02afa8588be38caf81a49de58035a'
    const addr = privateKeyToAddress(sk);
    assert(addr.toLowerCase() === '0x6f0d809e0fa6650460324f26df239bde6c004ecf');
  });
});
