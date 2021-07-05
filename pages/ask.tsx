import React from "react";
import Head from "next/head";

import { useInternetComputer } from "@/ic/context";
import Post from "@/components/Post"
import Header from "@/components/Header";
import SetUsername from "@/components/SetUsername";
import { useWeb3React } from "@web3-react/core";
import { isConnected } from "@/eth/connectors";
import toast, { Toaster } from "react-hot-toast";
import MetamaskIcon from "@/svg/metamask.svg";
import DfinityIcon from "@/svg/dfinity.svg";

export default function ask() {
  const { principal } = useInternetComputer();
  const { connector } = useWeb3React();

  if (typeof window === "undefined") return null;


  return (
    <div className="bg-white-500">
      <Head>
        <title>AKS HiÐΞ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <br/><div className="h2 text-center text-4xl"> AKS QUESTION </div>
        <div className="text-center text-red-500">
        <br/><br/>This is on Difinity!!<br/>
          ベーター運用中。データーが消える可能性があることをご了承ください
        </div>

        <div className="w-full leading-normal text-black">
          <div className="pt-40 pb-20 bg-right-top bg-no-repeat bg-contain sm:pb-32">
            <div className="text-xl wall-container">
              <div className="mb-3 ml-2s text-xl">Input Question</div>
                  <Post />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
