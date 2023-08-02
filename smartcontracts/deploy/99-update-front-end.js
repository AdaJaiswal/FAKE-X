const { ethers } = require("hardhat")
const frontEndContractsFile = "../frontend-nextjs/my-app/constants/FakeXnetworkMapping.json"
// const frontEndAbiLocation = "../nextjs-nft-marketplace/my-app/constants/"
const frontEndAbiLocation = "../frontend-nextjs/my-app/constants/"
const fs = require("fs")
module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating Frontend .......")
        await updateContractAddresses()
        await updateAbi()
    }
}
async function updateAbi() {
    // const nftMarketplace = await ethers.getContract("NftMarketplace")
    // fs.writeFileSync(
    //     `${frontEndAbiLocation}NftMarketplace.json`,
    //     nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
    // )
    // fs.writeFileSync(
    //     `${frontEndAbiLocation2}NftMarketplace.json`,
    //     nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
    // )

    // const basicNft = await ethers.getContract("BasicNft")
    // fs.writeFileSync(
    //     `${frontEndAbiLocation}BasicNft.json`,
    //     basicNft.interface.format(ethers.utils.FormatTypes.json)
    // )
    const fakeMedia = await ethers.getContract("FakeMedia")
    fs.writeFileSync(
        `${frontEndAbiLocation}FakeMedia.json`,
        fakeMedia.interface.format(ethers.utils.FormatTypes.json)
    )
    console.log(`${frontEndAbiLocation}FakeMedia.json`)
    // fs.writeFileSync(
    //     `${frontEndAbiLocation2}BasicNft.json`,
    //     basicNft.interface.format(ethers.utils.FormatTypes.json)
    // )
}
async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const fakeMedia = await ethers.getContract("FakeMedia")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    // if (chainId in contractAddresses) {
    //     if (!contractAddresses[chainId]["FakeMedia"].includes(fakeMedia.address)) {
    //         contractAddresses[chainId]["FakeMedia"].push(fakeMedia.address)
    //     }
    // } else {
    //     contractAddresses[chainId] = { FakeMedia: [fakeMedia.address] }
    // }
    contractAddresses[chainId] = { FakeMedia: [fakeMedia.address] }

    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    // fs.writeFileSync(frontEndContractsFile2, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
