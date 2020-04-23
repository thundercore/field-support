# Thunder Core Field Support Template

## Private Keys for Control of Accounts
Either:
1. Write your 12-word mnemonic (seed phrase) to a file named `.mnemonic` OR
2. Export your account private keys, one per line, to a file named `.private-keys`

## One Time Setup
Run this you don't have `node` installed or would rather use `conda` to manage `node` than `nvm`:
```
$ ./scripts/setup-toolchain
$ make conda-env
```

If you already have `node` installed, just run:
```
$ npm install
```

## Start Development Session
```
$ make shell
$ truffle migrate --reset --network thunder-mainet
$ mocha
```

this would put commands like `truffle` etc in your `PATH`.

## Test against a local `truffle develop` chain
```
$ truffle develop --log
```

In another terminal, run
```
$ truffle test
```

## Test against ThunderCore testnet or mainnet
Make sure to have either a `.private-keys` or a `.mnemonics` file with the
accounts you'd like to use for paying gas fees.

You can get Thunder tokens at:
1. https://faucet-testnet.thundercore.com
2. https://faucet.thundercore.com

for testnet and mainnet, respectively.

Deploy the contract and run unit tests:
```
$ truffle test --network thunder-testnet # or --network thunder-mainnet
```

See [package.json](package.json) and [truffle-config.js](truffle-config.js) fore more actions.
