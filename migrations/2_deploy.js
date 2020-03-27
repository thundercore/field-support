const SimpleRecord = artifacts.require('SimpleRecord');

module.exports = async (deployer) => {
  deployer.deploy(SimpleRecord)
};
