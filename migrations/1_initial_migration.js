const Migrations = artifacts.require("Migrations");
const VerifySignature = artifacts.require("VerifySignature");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(VerifySignature);
};
