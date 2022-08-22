import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { getNftsByCollection } from "../services/alchemyService"
import { DefaultButton } from "../utils/Buttons"
import { PromiseFactory } from "../utils/PromiseFactory"
import { ToastPromise } from "../utils/Toasts"
import Empty from "./Empty"
import { NFTCard } from "./NFTCard"

export default function Gallery({
    NFTs,
    setNFTs,
    isLoading,
    nextToken,
    setNextToken,
    collectionAddress,
}) {
    const [hasMore, setHasMore] = useState(true)
    const [galleryNFTs, setGalleryNFTs] = useState([])

    const getMoreNFTs = async () => {
        ToastPromise(
            PromiseFactory({
                fetchObject: getNftsByCollection("", collectionAddress, nextToken),
                successCallBack: handleSuccess,
            })
        )
    }

    const handleSuccess = (data) => {
        setNextToken(data.nextToken)
        setGalleryNFTs(galleryNFTs.concat(data.nfts))
    }

    useEffect(() => {
        setGalleryNFTs(NFTs)
        console.log(galleryNFTs)
    }, [NFTs])

    return (
        <>
            <div className="flex flex-1 flex-col items-center justify-center">
                {galleryNFTs == [] && <Empty></Empty>}
                <div className="grid grid-cols-4 col-1 p-2 items-center justify-center text-center ">
                    {galleryNFTs.length > 0 &&
                        galleryNFTs.map((nft, index) => {
                            return <NFTCard nft={nft} key={index}></NFTCard>
                        })}
                    {galleryNFTs.length > 0 && collectionAddress.length > 0 && (
                        <div className="flex flex-1 col-span-4 pb-2 justify-center items-center">
                            <DefaultButton
                                onClick={() => {
                                    getMoreNFTs()
                                }}
                                disabled={isLoading}
                            >
                                Load more...
                            </DefaultButton>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
