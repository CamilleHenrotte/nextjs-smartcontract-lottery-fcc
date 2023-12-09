import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { waitUntilSymbol } from "next/dist/server/web/spec-compliant/fetch-event"
export default function LotteryEntrance() {
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const dispatch = useNotification()
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee
    })
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })
    async function updateUI() {
        const entranceFeeFromcall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromcall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }
    useEffect(() => {
        if (isWeb3Enabled) {

            updateUI()
        }
    }, [isWeb3Enabled])
    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }
    const handleNewNotification = (tx) => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell"
        })
    }
    return (<div>hi from Lottery Entrance
        {raffleAddress ? (<div>
            <button onClick={async function () {
                await enterRaffle({
                    onSuccess: handleSuccess,
                    onError: (error) => console.log(error),
                })
            }}>Enter Raffle</button>
            <br />
            EntranceFee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
            <br />
            Number Of Players:{numPlayers}
            <br />
            Recent Winner: {recentWinner}</div>)

            :
            (<div>No Raffle Address Detected</div>)}

    </div>)


}