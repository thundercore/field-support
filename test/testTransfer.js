const fs = require('fs');
const path = require('path');
const ChainHelper = require('../src/transfer.js');

const toAddress = '0x6f0d809e0fa6650460324f26df239bde6c004ecf';

describe('transfer', () => {
  it('transfer TT', async() => {
    const privateKey = ChainHelper.readKeys()[0]
    const c = await ChainHelper.create(privateKey);
    c.submitTx(toAddress, 1, '');
  });
  it('tokenTransfer', async() => {
    const privateKey = ChainHelper.readKeys()[0]
    const c = await ChainHelper.create(privateKey);
    /* Token.issue() */
    const jsonBuf = fs.readFileSync(path.join(__dirname, '..', 'build', 'contracts', 'Token.json'));
    const contractData = JSON.parse(jsonBuf);
    const contractAbi = contractData['abi'];
    const contractAddress = contractData['networks'][c.chainId]['address'];
    const contract = new c.eth.Contract(contractAbi, contractAddress);
    const toAddress = c.fromAddress;
    const tokenAmount = 2;
    let txData = contract.methods.issue(tokenAmount, c.fromAddress).encodeABI();
    let r = await c.submitTx(toAddress, 0, txData);
    console.log('Token.issue receipt:', r);
    /* Token.transfer() */
    r = await c.transferToken(contractAddress, toAddress, tokenAmount)
    console.log('Token.transfer receipt:', r);
  });
});
