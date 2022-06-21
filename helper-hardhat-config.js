const networkConfig = {
    4: {
        name: "rinkeby",
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
    31337: {
        name: "hardhat",
    },
}

const developmentChains = ["hardhat", "localhost"]
const INITIAL_SUPPLY = "50000000000000000000"

module.exports = {
    networkConfig,
    developmentChains,
    INITIAL_SUPPLY,
}
