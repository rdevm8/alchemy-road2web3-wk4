import Head from "next/head"
import { useState } from "react"
import Gallery from "./Gallery"
import Header from "./Header"
import NFTCollection from "./NFTCollection"
import Sidebar from "./Sidebar"

export default function Layout({ children }) {
    const [NFTs, setNFTs] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [nextToken, setNextToken] = useState("")
    const [collectionAddress, setCollectionAddress] = useState("")

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className=" flex flex-col h-screen ">
                <Header></Header>
                <div className=" flex flex-1 overflow-hidden">
                    <Sidebar
                        NFTs={NFTs}
                        setNFTs={setNFTs}
                        isLoading={isLoading}
                        setLoading={setLoading}
                        nextToken={nextToken}
                        setNextToken={setNextToken}
                        collectionAddress={collectionAddress}
                        setCollectionAddress={setCollectionAddress}
                    ></Sidebar>
                    <div className="flex flex-1 flex-col">
                        <NFTCollection NFTs={NFTs} collectionAddress={collectionAddress} />
                        <main className=" flex-1 overflow-y-auto paragraph px-4">
                            <Gallery
                                NFTs={NFTs}
                                setNFTs={setNFTs}
                                isLoading={isLoading}
                                nextToken={nextToken}
                                setNextToken={setNextToken}
                                collectionAddress={collectionAddress}
                            ></Gallery>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}