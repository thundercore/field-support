const Eth = require('web3-eth');
const Web3 = require('web3');

const { BatchRequest } = require('./batch');

const balance = async (web3, address) => {
  const eth = web3.eth;
  return Web3.utils.fromWei(await eth.getBalance(address));
}

const balanceBatch = async (web3, addresses) => {
  const eth = web3.eth;
  const b = new BatchRequest(eth);
  for (a of addresses) {
    b.add(eth.getBalance.request(a));
  }
  const ellaS = await b.execute();
  const ttS = [];
  for (e of ellaS) {
    ttS.push(Web3.utils.fromWei(e));
  }
  return ttS;
}

module.exports = {
  balance: balance,
  balanceBatch: balanceBatch,
};
