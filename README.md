# Thunder Core Field Support Template

## One Time Setup
```
$ ./scripts/setup-toolchain
$ make conda-env
```

## Start Development Session
```
$ make shell
$ truffle migrate --reset --network thunder-mainet
$ mocha
```

See [package.json](package.json) and [truffle-config.js](truffle-config.js) fore more actions.
