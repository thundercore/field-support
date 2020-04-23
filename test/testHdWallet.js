const assert = require('assert');
const HdWallet = require('../src/hdwallet');

const mnemonic = 'feel pulp crunch segment buzz turn organ broccoli elder ask phone limit';

describe('fromMnemonic', () => {
  it('trustWalletAddress', async() => {
    const w = HdWallet.fromMnemonic(mnemonic);
    console.log('TrustWallet:', w.trustWalletAddress(0));
    assert('0x2323Beb990514446bA4c073C2e1A4BDC0ECf06Af'.toLowerCase() ===
            w.trustWalletAddress(0).toLowerCase());
  });
  it('metaMaskAddress', async() => {
    const w = HdWallet.fromMnemonic(mnemonic);
    console.log('MetaMask:', w.metaMaskAddress(0));
    assert('0x9A7be7ae9a2779167bc5b64d1cC672cc5b2593e4'.toLowerCase() ===
            w.metaMaskAddress(0).toLowerCase());
  });
  it('trustWalletPrivateKey', async() => {
    const w = HdWallet.fromMnemonic(mnemonic);
    console.log('TrustWallet sk:', w.trustWalletPrivateKey(0));
    assert('6d7bf444545ce47d7fda9df58275f5f4dd5eb911494ab66d81f76f1aca2b763e'.toLowerCase() ===
            w.trustWalletPrivateKey(0).toLowerCase());
  });
  it('metaMaskPrivateKey', async() => {
    const w = HdWallet.fromMnemonic(mnemonic);
    console.log('MetaMask sk:', w.metaMaskPrivateKey(0));
    assert('6aad31c479c44230721b470570c12bd3f41e71b79d8f27ca08b913cbaeac25af'.toLowerCase() ===
            w.metaMaskPrivateKey(0).toLowerCase());
  });
})
