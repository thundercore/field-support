const fs = require('fs');

const Web3 = require('web3');
const web3 = new Web3('http://localhost:9545');

const contractDataStr = fs.readFileSync('build/contracts/SimpleStorage.json');
const contractData = JSON.parse(contractDataStr);

(async function () {
  const networkId = await web3.eth.net.getId();
  console.log('networkId:', networkId, ' type:', typeof(networkId));
  const contractAddress = contractData['networks'][networkId]['address'];
  console.log('contractData["networks"]:', contractData['networks']);
  console.log(`contractData['networks'][${networkId}]`, contractData['networks'][networkId]);
  let code = await web3.eth.getCode(contractAddress);
  console.log('code:', code);

  contract = new web3.eth.Contract(contractData['abi'], contractAddress);

  const addresses = await web3.eth.getAccounts();
  const address = addresses[0];
  console.log('address:', address);
  await contract.methods.close().send({from: address});

  code = await web3.eth.getCode(address);
  console.log('code:', code);
})();
