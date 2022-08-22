const { toast } = require("react-toastify")

// CONSTANTS
const requestOptions = {
    get: {
        method: "GET",
    },
}

const ALCHEMY_API_KEY = process.env.alchemy.apiKey
const ALCHEMY_BASE_URL = process.env.alchemy.baseUrl

const baseUrl = `${ALCHEMY_BASE_URL}/${ALCHEMY_API_KEY}`

// COMMON VARIABLES
let reqUrl, fetchUrl

let fetchObject = {
    fetchUrl: "",
    fetchOptions: requestOptions.get,
}

module.exports = {
    getNftsByCollection: (walletAddress, collectionAddress, startToken) => {
        reqUrl = `${baseUrl}/getNFTsForCollection/`
        fetchUrl = `${reqUrl}?contractAddress=${collectionAddress}&withMetadata=${"true"}`

        if (startToken.length > 0) {
            fetchUrl = `${fetchUrl}&startToken=${startToken}`
        }

        fetchObject.fetchUrl = fetchUrl
        return fetchObject
    },
    getNftsByWalletCollection: (walletAddress, collectionAddress) => {
        reqUrl = `${baseUrl}/getNFTs/`

        if (!collectionAddress.length) {
            fetchUrl = `${reqUrl}?owner=${walletAddress}`
        } else {
            fetchUrl = `${reqUrl}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`
        }

        fetchObject.fetchUrl = fetchUrl
        return fetchObject
    },
    getCollectionFloorPrice: (collectionAddress) => {
        reqUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/getFloorPrice/`
        fetchUrl = `${reqUrl}?contractAddress=${collectionAddress}`

        fetchObject.fetchUrl = fetchUrl
        return fetchObject
    },
}
