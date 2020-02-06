const Eth = require('web3-eth');
const Web3 = require('web3');

const { BatchRequest } = require('./batch');

const web3Provider = () => {
  return Eth.giveProvider || 'https://mainnet-rpc.thundercore.com';
  //return Eth.giveProvider || 'http://localhost:9545';
}

const balance = async (address) => {
  const eth = new Eth(web3Provider());
  return Web3.utils.fromWei(await eth.getBalance(address));
}

const balanceBatch = async (addresses) => {
  const eth = new Eth(web3Provider());
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
