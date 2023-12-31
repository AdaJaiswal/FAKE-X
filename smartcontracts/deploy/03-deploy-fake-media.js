const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify")
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("--------------------------------")
    const args = []
    const fakeMedia = await deploy("FakeMedia", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying..........")
        await verify(fakeMedia.address, args)
    }
    log("---------------------------------")
}
module.exports.tags = ["all", "fakeMedia", "main"]
