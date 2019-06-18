const chai = require('chai');
const { expect } = chai;
const SimpleStorage = artifacts.require('SimpleStorage');
const BN = require('bn.js');

chai.use(require('chai-bn')(BN));
contract('SimpleStorage', function(_) {
  it('get should read last value set and withdrawEndowment', async () => {
    const c = await SimpleStorage.deployed();
    await c.set(42);
    await c.set(1337);
    expect(await c.get()).to.be.bignumber.that.equals('1337');
  });
});
