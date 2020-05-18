const TT20UsdtAddress = '0x4f3C8E20942461e2c3Bdd8311AC57B0c222f2b82';
const Web3 = require('web3');

const abi = require('../abis/ERC677BridgeToken.abi.json');
const rpcUrl = 'https://mainnet-rpc.thundercore.com';

(async () => {
const web3 = new Web3(rpcUrl);
const ttUsdt = new web3.eth.Contract(abi, TT20UsdtAddress);

console.log('TT20 address:', TT20UsdtAddress);
console.log('Name:', await ttUsdt.methods.name().call());
console.log('Decimals:', await ttUsdt.methods.decimals().call());
})();
