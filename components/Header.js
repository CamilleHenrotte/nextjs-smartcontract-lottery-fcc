import { ConnectButton } from "web3uikit"

export default function Header() {
    return (<div className="border-b-2 p-5 flex flex-row">
        <h1 className="p-4 font-bold text-3xl">Decentralized Lottery</h1>
        <div className="ml-auto p-2"><ConnectButton moralisAuth={false} /></div>
    </div>)
}