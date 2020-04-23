const EthereumHDWallet = require('ethereum-hdwallet')

// https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki
// https://github.com/satoshilabs/slips/blob/master/slip-0044.md
const TrustWalletHdPath = "m/44'/1001'/0'/0" // coin_type 1001 is ThunderCore, this is the recommended path
const MetaMaskHdPath = "m/44'/60'/0'/0"      // coin_type 60 is really Ethereum, but MetaMask use it for all EVM compatible chains

class HdWallet {
  constructor(mnemonic) {
    this.mnemonic = this.mnemonic
    this.w = EthereumHDWallet.fromMnemonic(mnemonic)
  }
  deriveUsingTrustWalletPath() {
    return this.w.derive(TrustWalletHdPath)
  }
  deriveUsingMetaMaskPath() {
    return this.w.derive(MetaMaskHdPath)
  }
  metaMaskAddress(index /*: number */) /*: string */ {
    return '0x' + this.deriveUsingMetaMaskPath().derive(index).getAddress().toString('hex')
  }
  trustWalletAddress(index /*: number */) /*: string */ {
    return '0x' + this.deriveUsingTrustWalletPath().derive(index).getAddress().toString('hex')
  }
  metaMaskPrivateKey(index /*: number */) /*: string */ {
    return this.deriveUsingMetaMaskPath().derive(index).getPrivateKey().toString('hex')
  }
  trustWalletPrivateKey(index /*: number */) /*: string */ {
    return this.deriveUsingTrustWalletPath().derive(index).getPrivateKey().toString('hex')
  }
}

const fromMnemonic = (s /*: string or buffer */) => {
  return new HdWallet(s)
}

module.exports = {
  fromMnemonic: fromMnemonic,
}
