const Accounts = require('web3-eth-accounts');

const toAddress = (sk /*: string */) => {
  const accounts = new Accounts();
  const account = accounts.privateKeyToAccount(sk);
  return account.address;
}

const generate = (entropy) => /*: -> { address, privateKey } */ {
  const accounts = new Accounts(entropy);
  return accounts.create();
}

module.exports = {
    generate: generate,
    toAddress: toAddress,
};
