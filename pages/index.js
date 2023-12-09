import Image from "next/image"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import LotteryEntrance from "../components/LotteryEntrance"
//import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our smart Contract lottery"></meta>
            </Head>
            <Header />
            <LotteryEntrance />

        </div>
    )
}
