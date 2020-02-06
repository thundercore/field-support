const fs = require('fs');
const path = require('path');

const Accounts = require('web3-eth-accounts');
const Eth = require('web3-eth');
const Web3 = require('web3');
const BN = Web3.utils.BN;

const pretty = require('./pretty');
const erc20Abi = require('./ERC20.abi.json');

const web3Provider = () => {
  return Eth.giveProvider || 'https://mainnet-rpc.thundercore.com';
  //return Eth.giveProvider || 'http://localhost:9545';
}

const signTx = async (fromAccount, tx) => {
  const signedTx = await fromAccount.signTransaction(tx)
  return signedTx.rawTransaction // hex string
}

class ChainHelper {
  constructor(eth, chainId, fromAccount) {
    this.eth = eth;
    this.chainId = chainId;
    this.fromAccount = fromAccount;
    this.fromAddress = fromAccount.address;
  }
  async submitTx(toAddress, value, txData) {
    const eth = this.eth;
    const promiseResults = await Promise.all([
      eth.getTransactionCount(this.fromAccount.address),
      eth.getGasPrice(),
    ]);
    const nonce = promiseResults[0];
    const gasPrice = promiseResults[1];
    const fromAddress = this.fromAddress;
    const tx = {
      'gasLimit': 0,
      'chainId': this.chainId,
      'gasPrice': gasPrice,
      'nonce': nonce,
      'from': fromAddress,
      'to': toAddress,
      'value': value,
      'data': txData,
    }
    const gasMultiple = new BN(1.0);
    tx.gasLimit = '0x' + (new BN(await eth.estimateGas(tx))).mul(gasMultiple).toString(16);
    console.log('tx:', pretty.format(tx));
    const rawTxStr = await signTx(this.fromAccount, tx);
    return eth.sendSignedTransaction(rawTxStr);
  }
  async transferToken (contractAddress, toAddress, value) {
    const eth = this.eth;
    const contractAbi = erc20Abi;
    const contract = new eth.Contract(contractAbi, contractAddress);
    const txData = contract.methods.transfer(toAddress, value).encodeABI();
    return this.submitTx(contractAddress, 0, txData);
  }
}

const create = async (privateKey) => {
  const accounts = new Accounts();
  if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }
  const account = accounts.privateKeyToAccount(privateKey);
  const eth = new Eth(web3Provider());
  const networkId = await eth.net.getId();
  return new ChainHelper(eth, networkId, account);
}

const readKeys = () => {
  const privateKeys = fs.readFileSync(path.join(__dirname, '..', '.private-keys'),
  {encoding: 'ascii'}).split('\n').filter(x => x.length > 0);
  return privateKeys;
}

module.exports = {
  create: create,
  readKeys: readKeys,
};
