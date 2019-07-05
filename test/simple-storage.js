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
  it('getCode should return empty after self-destruct', async () => {
    const c = await SimpleStorage.deployed();
    const web3 = SimpleStorage.web3;
    const code = await web3.eth.getCode(c.address);
    expect(code).not.eq('').and.not.eq('0x');
    await c.close();
    const code1 = await web3.eth.getCode(c.address);
    expect(code1).oneOf(['', '0x']);
  });
});
