const assert = require('assert').strict;

const { balance, balanceBatch } = require('../src/balance.js');

const address = '0xc466c8ff5dAce08A09cFC63760f7Cc63734501C1';

describe('balance', () => {
  it('balance TT', async() => {
    assert.equal('1', await balance(web3, address));
  });
  it('balanceBatch', async() => {
    assert.deepEqual(['1'],  await balanceBatch(web3, [
      '0x1f0ed42512520f7915a3661357a9c171d2dd29f4',
      '0xc466c8ff5dAce08A09cFC63760f7Cc63734501C1',
      '0x8918a5327844538598a6e8ab0132ea63c813e56a',
    ]));
  });
});
