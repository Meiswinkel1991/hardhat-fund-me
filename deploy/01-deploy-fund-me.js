const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //networkConfig[chainId]["ethUsdPriceFeed"]
    // if the contract doesn't exist, we deploy

    // when going for localhost or hardhat network we want to use mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //put price feed address
        log: true,
    })
    log("Contract FundMe deployed!")
    log("-------------------------------------------------------------------")
}

module.exports.tags = ["all", "FundMe"]
