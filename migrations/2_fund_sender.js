const FundSender = artifacts.require("FundSender");

module.exports = function(deployer) {
  deployer.deploy(FundSender);
};
