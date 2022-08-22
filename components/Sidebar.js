import { useEffect, useState } from "react"
import { DefaultButton } from "../utils/Buttons"
import { DefaultFieldSet, DefaultInputField } from "../utils/Form"
import { DefaultContentHeader } from "../utils/Titles"
import { FaSearch } from "react-icons/fa"
import { MdRefresh } from "react-icons/md"
import { getNftsByCollection, getNftsByWalletCollection } from "../services/alchemyService"
import { ethers } from "ethers"
import { PromiseFactory } from "../utils/PromiseFactory"
import { ToastPromise } from "../utils/Toasts"

export default function Sidebar({
    NFTs,
    setNFTs,
    isLoading,
    setLoading,
    nextToken,
    setNextToken,
    collectionAddress,
    setCollectionAddress,
}) {
    const initialFilter = {
        walletAddress: "",
        collectionAddress: "",
        isFetchCollection: false,
    }

    const initialError = {
        walletAddress: "",
        collectionAddress: "",
    }

    const [filter, setFilter] = useState(initialFilter)
    const [validationError, setValidationError] = useState(initialError)

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name == "isFetchCollection") {
            value = !filter.isFetchCollection
        }
        setFilter({
            ...filter,
            [name]: value,
        })
    }

    const clearForm = () => {
        setFilter(initialFilter)
        setValidationError(initialError)
    }

    const fetchNfts = async () => {
        if (isValid()) {
            const { walletAddress, collectionAddress, isFetchCollection } = filter

            if (isFetchCollection) {
                setCollectionAddress(collectionAddress)

                ToastPromise(
                    PromiseFactory({
                        fetchObject: getNftsByCollection(walletAddress, collectionAddress, ""),
                        successCallBack: handleSuccess,
                        setLoading: setLoading,
                    })
                )
            } else {
                setCollectionAddress("")

                ToastPromise(
                    PromiseFactory({
                        fetchObject: getNftsByWalletCollection(walletAddress, collectionAddress),
                        successCallBack: handleSuccess,
                        setLoading: setLoading,
                    })
                )
            }
        }
    }

    const isValid = () => {
        const { walletAddress, collectionAddress, isFetchCollection } = filter
        let res = true

        if (isFetchCollection) {
            if (collectionAddress.length == 0) {
                setValidationError({
                    ...validationError,
                    collectionAddress: "Collection Address is required!",
                })
                res = false
            } else if (!ethers.utils.isAddress(collectionAddress)) {
                setValidationError({
                    ...validationError,
                    collectionAddress: "Collection Address is not a valid Address!",
                })
                res = false
            }
        } else {
            if (walletAddress.length == 0) {
                setValidationError({
                    ...validationError,
                    walletAddress: "Wallet Address is required!",
                })
                res = false
            } else if (!ethers.utils.isAddress(walletAddress)) {
                setValidationError({
                    ...validationError,
                    collectionAddress: "Wallet Address is not a valid Address!",
                })
                res = false
            }
        }

        return res
    }

    useEffect(() => {
        if (filter.isFetchCollection) {
            setFilter({ ...filter, walletAddress: initialFilter.walletAddress })
        }
    }, [filter.isFetchCollection])

    useEffect(() => {
        setValidationError(initialError)
    }, [filter])

    const handleSuccess = (data) => {
        let nfts

        if (filter.isFetchCollection) {
            nfts = data.nfts
            setNextToken(data.nextToken)
        } else {
            nfts = data.ownedNfts
            setNextToken("")
        }

        if (nfts) {
            setNFTs(nfts)
        }
    }

    return (
        <>
            <aside className="flex flex-col gap-y-2 w-full md:w-[27rem] p-4 border-r-2 border-r-black">
                <DefaultContentHeader>SEARCH FILTERS</DefaultContentHeader>
                <DefaultFieldSet legend={"Wallet Address"}>
                    <DefaultInputField
                        type={"text"}
                        placeholder={"Enter wallet address"}
                        name="walletAddress"
                        value={filter.walletAddress}
                        disabled={filter.isFetchCollection || isLoading}
                        onChange={handleChange}
                        required
                    ></DefaultInputField>
                </DefaultFieldSet>
                {validationError.walletAddress.length > 0 && (
                    <div className="text-center bg-red-500 rounded-lg p-2">
                        <span className="font-semibold">{validationError.walletAddress}</span>
                    </div>
                )}
                <DefaultFieldSet legend={"Collection Address"}>
                    <DefaultInputField
                        type={"text"}
                        placeholder={"Enter collection address"}
                        name="collectionAddress"
                        value={filter.collectionAddress}
                        onChange={handleChange}
                        disabled={isLoading}
                    ></DefaultInputField>
                </DefaultFieldSet>
                {validationError.collectionAddress.length > 0 && (
                    <div className="text-center bg-red-500 rounded-lg p-2">
                        <span className="font-semibold">{validationError.collectionAddress}</span>
                    </div>
                )}
                <div className="flex flex-row gap-x-2 justify-end text-md font-semibold">
                    <DefaultInputField
                        type={"checkbox"}
                        name="isFetchCollection"
                        checked={filter.isFetchCollection}
                        onChange={handleChange}
                        disabled={isLoading}
                    ></DefaultInputField>
                    Fetch for collection
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-md">
                    <DefaultButton onClick={clearForm} disabled={isLoading}>
                        <div className="flex flex-row gap-x-2 items-center justify-center">
                            <MdRefresh></MdRefresh>Clear
                        </div>
                    </DefaultButton>
                    <DefaultButton
                        onClick={() => {
                            fetchNfts()
                        }}
                        disabled={isLoading}
                    >
                        <div className="flex flex-row gap-x-2 items-center justify-center">
                            <FaSearch></FaSearch>Search
                        </div>
                    </DefaultButton>
                </div>
            </aside>
        </>
    )
}
