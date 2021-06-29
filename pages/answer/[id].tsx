import React from "react";
import Head from "next/head";

import { useInternetComputer } from "@/ic/context";
import Post from "@/components/Post"
import Header from "@/components/Header";
import SetUsername from "@/components/SetUsername";
import { useWeb3React } from "@web3-react/core";
import { isConnected } from "@/eth/connectors";;
import MetamaskIcon from "@/svg/metamask.svg";
import DfinityIcon from "@/svg/dfinity.svg";
import { NextApiRequest } from "next";
import { Answer } from "@/ic/generated/wall/wall";
import WallAnswer from "@/components/WallAnswer"
import router, { useRouter } from "next/router";

export default function ask() {
  const { principal } = useInternetComputer();
  const { connector } = useWeb3React();
  const router = useRouter();
  const id =  router.query.id as string;
 
  if (typeof window === "undefined") return null;

  return (
    <div className="bg-white-500">
      <Head>
        <title>AKS HiÐΞ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <br/><div className="h2 text-center text-4xl"> ASK and Answer</div>
        <div className="w-full leading-normal text-black">
          <div className="pt-40 pb-20 bg-right-top bg-no-repeat bg-contain sm:pb-32">
            <div className="text-xl wall-container">
                  <WallAnswer id={id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
