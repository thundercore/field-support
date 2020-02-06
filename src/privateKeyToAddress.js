 const Accounts = require('web3-eth-accounts');

function privateKeyToAddress(sk) {
  const accounts = new Accounts();
  const account = accounts.privateKeyToAccount(sk);
  console.log('account:', account);
  return account.address;
}

module.exports = privateKeyToAddress;
