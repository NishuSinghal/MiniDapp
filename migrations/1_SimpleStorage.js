let SimpleStorage=artifacts.require('./SimpleStorage.sol');

module.exports=async function(deployer){
    deployer.deploy(SimpleStorage);
}