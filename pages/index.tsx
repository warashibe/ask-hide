import React from "react";
import Head from "next/head";
import { useInternetComputer } from "@/ic/context";
import Header from "@/components/Header";
import Post from "@/components/Post";
import SetUsername from "@/components/SetUsername";
import Wall from "@/components/Wall";
import { useWeb3React } from "@web3-react/core";
import { isConnected } from "@/eth/connectors";
import MetamaskIcon from "@/svg/metamask.svg";
import DfinityIcon from "@/svg/dfinity.svg";
import GitHub from "@/svg/github.svg";
import AskImage from "@/public/ask.png";

export default function Home() {
  const { principal } = useInternetComputer();
  const { connector } = useWeb3React();

  if (typeof window === "undefined") return null;
 
  return (
    <div className="bg-white-500">
      <Head>
        <title>ASK HiÐΞ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <img src="ask.png"/>
        <div className="text-center">
          ASK Hide for everyone. Find solution or ask a question!
        </div>
        <div className="pt-10 pb-10 bg-right-top bg-no-repeat bg-contain sm:pb-32">
          <div className="text-xl wall-container">            
            <hr/>
            <Wall />
          </div>
        </div>
      </main>
    </div>
  );
}
