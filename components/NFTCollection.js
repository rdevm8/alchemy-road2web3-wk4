import { ConstructorFragment } from "ethers/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { GiMagnifyingGlass } from "react-icons/gi"
import { getCollectionFloorPrice } from "../services/alchemyService"
import { PromiseFactory } from "../utils/PromiseFactory"

export default function NFTCollection({ NFTs, collectionAddress }) {
    const initCollectionDetails = {
        name: "",
        symbol: "",
        totalSupply: "",
        contractAddress: "",
    }
    const [collectionDetails, setCollectionDetails] = useState(initCollectionDetails)
    const [floorPrice, setFloorPrice] = useState("")

    const retrieveFloorPrice = async () => {
        PromiseFactory({
            fetchObject: getCollectionFloorPrice(collectionAddress),
            successCallBack: handleSuccess,
        })
    }

    const handleSuccess = (data) => {
        const fp = ""

        if (data) {
            if (data.openSea.floorPrice) {
                fp = data.openSea.floorPrice + " " + data.openSea.priceCurrency + " (Opensea)"
            }

            if (data.looksRare.floorPrice) {
                fp =
                    (fp.length > 0 ? fp + " | " : "") +
                    data.looksRare.floorPrice +
                    " " +
                    data.looksRare.priceCurrency +
                    " (LooksRare)"
            }
        }

        setFloorPrice(fp)
    }

    useEffect(() => {
        if (NFTs.length > 0 && collectionAddress.length > 0) {
            setCollectionDetails({
                ...collectionDetails,
                name: NFTs[0].contractMetadata.name,
                symbol: NFTs[0].contractMetadata.symbol,
                totalSupply: NFTs[0].contractMetadata.totalSupply,
                contractAddress: NFTs[0].contract.address,
            })

            retrieveFloorPrice()
        }
    }, [NFTs, collectionAddress])
    return (
        <>
            {collectionAddress.length > 0 && NFTs.length > 0 && (
                <div className=" p-4">
                    <div className="bg-black rounded-lg p-2 flex-col flex text-white gap-y-2">
                        <div className="border-b py-4">
                            <p className="text-2xl">Collection Details</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-y-2 p-2">
                            <div className="flex flex-row gap-x-2">
                                <span className="font-semibold">Name: </span>
                                {collectionDetails.name}
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <span className="font-semibold">Symbol: </span>
                                {collectionDetails.symbol}
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <span className="font-semibold">Supply: </span>
                                {collectionDetails.totalSupply}
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <span className="font-semibold">Floor Price: </span>
                                {floorPrice}
                            </div>
                            <div className="flex flex-row gap-x-2 items-center">
                                <span className="font-semibold">Collection Address: </span>
                                {collectionDetails.contractAddress}
                                <Link
                                    href={`https://etherscan.io/address/${collectionDetails.contractAddress}`}
                                >
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-item text-white"
                                    >
                                        <GiMagnifyingGlass />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
