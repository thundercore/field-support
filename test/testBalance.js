const assert = require('assert').strict;

const { balance, balanceBatch } = require('../src/balance.js');

const address = '0xc466c8ff5dAce08A09cFC63760f7Cc63734501C1';

describe('balance', () => {
  it('balance TT', async() => {
    assert.equal('1', await balance(address));
  });
  it('balanceBatch', async() => {
    assert.deepEqual(['1'],  await balanceBatch([
      '0xc466c8ff5dAce08A09cFC63760f7Cc63734501C1',
    ]));
  });
});
