# Thunder Core Field Support Template

## One Time Setup
```
$ ./scripts/setup-toolchain
$ make conda-env
```

## Start Development Session
```
$ make shell
```

## Run Tests

Either
1. Start `truffle develop` and run `truffle test` from a second shell

OR

2. Get some [thunder-testnet tokens](https://faucet-testnet.thundercore.com) and create a `.private-keys` file with the private of the account holding the funds and run:

```
truffle test --network thunder-testnet
```

See [package.json](package.json) and [truffle-config.js](truffle-config.js) fore more actions.
